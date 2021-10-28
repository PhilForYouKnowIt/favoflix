import * as functions from "firebase-functions";
import * as omdb from "open-movie-database-api";
import {admin} from "./config";
import algoliasearch from "algoliasearch";

const algoliaClient = algoliasearch(
    functions.config().algolia.app_id,
    functions.config().algolia.admin_api_key
);

const moviesIndex = algoliaClient.initIndex("movies");

exports.onAddMovie = functions.firestore
    .document("movies/{id}")
    .onCreate((orgSnapshot) => {
      const data = orgSnapshot.data();
      const objectID = orgSnapshot.id;
      const title = data.title;
      const actors = data.actors;
      const genres = data.genres;
      const year = parseInt(data.year);
      const poster = data.poster;
      functions.logger.info("Adding movie ", {data});
      return moviesIndex.saveObject({
        title,
        genres,
        actors,
        year,
        poster,
        objectID,
      });
    });

exports.handleSuggestion = functions.firestore
    .document("suggestions/{id}")
    .onCreate(async (snapshot) => {
      const movie = snapshot.data().name;
      const id = snapshot.id;
      const apiKey = functions.config().omdb.api_key;
      const client = new omdb.OmdbApiClient(apiKey);
      const result = await client.getByTitle(movie, {});
      if (result.Response === "False") return null;
      const now = admin.firestore.Timestamp.now();
      return admin
          .firestore()
          .collection("movies")
          .doc(id)
          .set({
            title: result.Title,
            rated: result.Rated,
            year: result.Year,
            director: result.Director,
            country: result.Country.split(", "),
            plot: result.Plot,
            genres: result.Genre.split(", "),
            poster: result.Poster,
            actors: result.Actors.split(", "),
            imdbRating: result.imdbRating,
            imdbVotes: result.imdbVotes,
            createdAt: now,
          });
    });

exports.generateClip = functions.storage.object().onFinalize(async (object) => {
  const contentType = object.contentType; // File content type.
  return functions.logger.log("File uploaded ", contentType);
});
