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
class Firebase {
  constructor() {
    this.fire = firebase;
    this.database = this.fire.database();
  }

  getPokemonsSoket = cb => {
    this.database.ref('pokemons')
    .on('value', snapshot => cb(snapshot.val()));
  }

  offPokemonsSoket = () => {
    this.database.ref('pokemons').off();
  }

  getPokemonsOnce = async () => {
    return await this.database.ref('pokemons').once('value').then(snapshot => snapshot.val());
  }

  postPokemon = (key, pokemon) => {
    this.database.ref(`pokemons/${key}`).set(pokemon);
  }

  addPokemon = (data, cb) => {
    const newKey = this.database.ref().child('pokemons').push().key;
    console.log("addPokemon: ", data,cb);
    this.database.ref('pokemons/'  + newKey).set(data).then(() => cb && cb());
  }
}

export default Firebase;
