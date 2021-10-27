import * as functions from "firebase-functions";
import * as omdb from "open-movie-database-api";
// import * as fluent from "fluent-ffmpeg";
import {admin} from "./config";

exports.handleSuggestion = functions.firestore
    .document("suggestions/{id}")
    .onCreate(async (snapshot) => {
      const movie = snapshot.data().name;
      const id = snapshot.id;
      const apiKey = functions.config().omdb.api_key;
      const client = new omdb.OmdbApiClient(apiKey);
      const result = await client.getByTitle(movie, {});
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
            country: result.Country,
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
