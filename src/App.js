import { Route, Switch, Redirect, useLocation } from 'react-router-dom';
import firebase from 'firebase';
import { useState, useEffect } from 'react';
import MenuHeader from './components/MenuHeader';
import Footer from './components/Footer';
import HomePage from './routes/HomePage';
import GamePage from './routes/GamePage';
import AboutPage from './routes/AboutPage';
import ContactPage from './routes/ContactPage';

import cn from 'classnames';
import s from './styles.module.css';

// Your web app's Firebase configuration
var firebaseConfig = {
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

const database = firebase.database();

const App = () => {
  const location = useLocation();
  const isHomePage = location.pathname === "/" || location.pathname === "/home";
  const [pokemons, setPokemons] = useState({});

  useEffect(() => {
    database.ref('pokemons').once('value', (snapshot) => {
      const values = snapshot.val();
      console.log('####: App useEffect', values);
      setPokemons(values);
    });
  },[]);
  const handleSetPokemons = (id) => {
    console.log('####: App handleSetPokemons id', id);
    
    setPokemons(prevState => {
      const result = Object.entries(prevState).reduce((acc, item) => {
        // const key = item[0];
        const pokemon = {...item[1]};
          if (pokemon.id === id)
              pokemon.active = true;
  
          acc[item[0]] = pokemon;
          return acc;
      }, []);
      console.log('####: App handleSetPokemons result', result);

      // database.ref('pokemons').update('value', pokemons);      
      return result;
    });
  };

  const handleWriteDB = (keyId, active) => {
    database.ref('pokemons/' + keyId).update({active: !active}, (error) => {
      if (error) {
        console.log('####: App error', error);
      } else {
        console.log('####: App handleWriteDB Data saved successfully!');
        setPokemons(prevState => {
          const result = Object.entries(prevState).reduce((acc, item) => {
            const key = item[0];
            const pokemon = {...item[1]};
              if (keyId === key)
                  pokemon.active = !pokemon.active;
      
              acc[item[0]] = pokemon;
              return acc;
          }, []);
          console.log('####: App handleWriteDB result', result);
    
          // database.ref('pokemons').update('value', pokemons);      
          return result;
        });
      }
    });
  };

  function handleAddNewPokemon(pokemon) {
    // A post entry.
    var newPokemon = {
      ...pokemon,
      id: Math.floor(Math.random()*100),
    };
  
    // Get a key for a new Post.
    const newKey = database.ref().child('pokemons').push().key;
  
    // Write the new pokemon's data in the pokemons list.  
    database.ref('pokemons/' + newKey).set(newPokemon, (error) => {
      if (error) {
        console.log('####: App error', error);
      } else {
        console.log('####: App handleAddNewPokemon Data saved successfully!');
        setPokemons(prevState => {
          const result = { ...prevState, [newKey]:newPokemon };
          console.log('####: App handleAddNewPokemon new pokemons', result);
          return result;
        });
      }
    });
  }

  return (
    <Switch>
      <Route path="/404" render={() => <h1>404 Not Found</h1>} />
      <Route>
        <>
          <MenuHeader
            bgActive={!isHomePage}
            onMenuClickButton={() => {console.log('MenuHeader')}}
          />
            <div className={cn(s.wrap, {
              [s.isHomePage]: isHomePage
            })}>
              <Switch>
                <Route exact path="/" component={HomePage} />
                <Route path="/home" component={HomePage} />
                <Route path="/game">
                  <GamePage 
                    pokemons={pokemons}
                    setPokemons={handleSetPokemons}
                    writeDB={handleWriteDB}
                    onAddNewPokemon={handleAddNewPokemon}
                  />
                </Route>
                <Route path="/about" component={AboutPage} />
                <Route path="/contact" component={ContactPage} />
                <Route render={() => <Redirect to="/404" />} />                
              </Switch>
            </div>
          <Footer />
        </>
      </Route>
    </Switch>
  );
};

export default App;