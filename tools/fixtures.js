require("dotenv").config();
const admin = require("firebase-admin");

const serviceAccount = require("./serviceAccount.json");
const movies = require("./data/suggestions.json");
console.log("Firestore emulator: " + process.env.FIRESTORE_EMULATOR_HOST);

const firestoreLocalhost =
  process.env.FIRESTORE_EMULATOR_HOST.indexOf("localhost");

if (firestoreLocalhost !== 0) {
  console.log(
    "Sorry! This script is intended for localhost firestore emulator only."
  );
  process.exit(-1);
}

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.FIRESTORE_EMULATOR_HOST,
});

const db = admin.firestore();
const moviesBatch = db.batch();
const moviesRef = db.collection("suggestions");

movies.map((t) => {
  let newDoc = moviesRef.doc();
  moviesBatch.set(newDoc, { name: t });
  return true;
});

moviesBatch.commit().then(() => {
  process.exit(-1);
  console.log("\x1b[32m", "Added movie suggestions!");
});
