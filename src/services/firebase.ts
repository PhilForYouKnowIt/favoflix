import { useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import { getFunctions, connectFunctionsEmulator } from "firebase/functions";
import {
  getFirestore,
  connectFirestoreEmulator,
  collection,
  query,
  onSnapshot,
  addDoc,
  doc,
  getDoc,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
connectFirestoreEmulator(db, "localhost", 8080);

const functions = getFunctions(app);
connectFunctionsEmulator(functions, "localhost", 5001);

export interface Movie {
  id: string;
  title: string;
  poster: string;
  plot: string;
  actors: string[];
  genres: string[];
  rated: string;
  year: string;
  country: string;
  director: string;
}

export const useMovies = () => {
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const q = query(collection(db, "movies"));
    const unsubscribe = onSnapshot(q, (moviesSnapshot) => {
      setMovies(
        moviesSnapshot.docs.map(
          (doc) =>
            ({
              id: doc.id,
              title: doc.data().title,
              plot: doc.data().plot,
              poster: doc.data().poster,
            } as Movie)
        )
      );
    });
    return () => unsubscribe();
  }, []);
  return movies;
};

/**
 * Load a movie record by id
 * @param id
 */
export const useMovie = (id: string) => {
  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const getMovie = async (id: string) => {
      setLoading(true);
      const docRef = doc(db, "movies", id);
      const docSnap = await getDoc(docRef);
      setLoading(false);
      if (!docSnap.exists()) {
        setMovie(null);
      } else {
        setMovie(docSnap.data() as Movie);
      }
    };
    getMovie(id).then();
  }, [id]);

  return [movie, loading];
};

/**
 * Adds a new suggestion
 * @param name
 */
export const addSuggestion = async (name: string) => {
  return await addDoc(collection(db, "suggestions"), { name });
};
