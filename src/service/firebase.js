import firebase from 'firebase/app';
import 'firebase/database';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDinTWH8s3GZDiUFV8yaZR-9AN0-3xAjw4",
  authDomain: "kapitoshka-game.firebaseapp.com",
  databaseURL: "https://kapitoshka-game-default-rtdb.firebaseio.com",
  projectId: "kapitoshka-game",
  storageBucket: "kapitoshka-game.appspot.com",
  messagingSenderId: "307831794065",
  appId: "1:307831794065:web:58673c63be65dfb0241230"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const fire = firebase;
export const database = fire.database();

export default database;