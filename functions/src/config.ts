import * as firebaseAdmin from "firebase-admin";

// Since this code will be running in the Cloud Functions environment
// we call initialize Firestore etc without any arguments because it
// detects authentication from the environment.

firebaseAdmin.initializeApp();
firebaseAdmin.firestore();
firebaseAdmin.auth();
firebaseAdmin.storage();

export const admin = firebaseAdmin;
