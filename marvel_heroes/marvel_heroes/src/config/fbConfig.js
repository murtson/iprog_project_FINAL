import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

// Initialize Firebase
var config = {
  apiKey: "AIzaSyBZUwgRY7NAd59I_5PGRHwInR5nZLEIx-U",
  authDomain: "marvel-heroes-9723a.firebaseapp.com",
  databaseURL: "https://marvel-heroes-9723a.firebaseio.com",
  projectId: "marvel-heroes-9723a",
  storageBucket: "marvel-heroes-9723a.appspot.com",
  messagingSenderId: "757644149631"
};
firebase.initializeApp(config);
firebase.firestore();

export default firebase;
