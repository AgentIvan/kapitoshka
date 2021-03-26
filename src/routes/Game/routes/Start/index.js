import { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import PokemonCard from '../../../../components/PokemonCard';
import { FireBaseContext } from "../../../../context/firebaseContext";
import { PokemonContext } from "../../../../context/pokemonContext";

import s from './styles.module.css';

const StartPage = () => {
  const firebase = useContext(FireBaseContext);
  const { player1: selectedPokemons, onSelectedPokemons, clearPokemonContext } = useContext(PokemonContext);
  const [pokemons, setPokemons] = useState({});

  // console.log( pokemons);
  
  useEffect(() => {
    firebase.getPokemonsSoket((pokemons) => {
      console.log('####: <StartPage />', 'getPokemonsSoket');
      setPokemons(pokemons);
      clearPokemonContext();
    });
    return () => firebase.offPokemonsSoket();
  },[]);

  const history = useHistory();
  
  const handleNewPokemon = async () => {
    const boardResponse = await fetch('https://reactmarathon-api.netlify.app/api/create-player');
    const boardRequest = await boardResponse.json();

    const newPokemon = boardRequest.data[Math.floor(Math.random() * 5)];

    firebase.addPokemon(newPokemon, () => {
      firebase.getPokemonsSoket((pokemons) => {
        setPokemons(pokemons);
      });

      return () => firebase.offPokemonsSoket();
    });
  };

  const handleClickGoHome = () => {
    console.log('####: <GamePage />', 'GOTO /');
    history.push('/');
  };
  
  const handleStartGameClick = () => {
    console.log('####: <GamePage />', 'GOTO game/board');
      history.push("/game/board");
  };

  const handleChangeSelected = key => {
    if (Object.keys(selectedPokemons).length < 5 || pokemons[key].selected) {
      const curPokemon = {...pokemons[key]}
      onSelectedPokemons(key, curPokemon)

      setPokemons(prev => ({
        ...prev,
        [key]: {
          ...prev[key],
          selected: !prev[key].selected
        }
      }));
    }
  };

  return (
    <div className={s.root}>
      <div className={s.container}>
        <div className={s.buttons}>
          <button className={s.button} onClick={handleNewPokemon}>Add New</button>
          <button className={s.button} onClick={handleStartGameClick} disabled={Object.keys(selectedPokemons).length < 5}>
            Go to board
          </button>
          <button className={s.button} onClick={handleClickGoHome}>Go Home</button>
        </div>
        <div className={s.flex}>
          {pokemons && Object.entries(pokemons).map(([key, {name, img, id, type, values, selected, minimize}]) => 
            key && <PokemonCard
              key={key}
              id={id}
              name={name}
              img={img}
              type={type}
              values={values}
              isActive
              isSelected={selected}
              onClickCard={() => handleChangeSelected(key)}
              minimize={minimize}
              className={s.card}
            />                    
          )}
        </div>
      </div>
    </div>
  );
};

export default StartPage;
