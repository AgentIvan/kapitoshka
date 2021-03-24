import { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import PokemonCard from '../../../../components/PokemonCard';
import { FireBaseContext } from "../../../../context/firebaseContext";
import { PokemonContext } from "../../../../context/pokemonContext";

import s from './styles.module.css';

const StartPage = () => {
  const firebase = useContext(FireBaseContext);
  const { pokemons: selectedPokemons, onSelectedPokemons } = useContext(PokemonContext);
  const [pokemons, setPokemons] = useState({});

  // console.log( pokemons);
  
  useEffect(() => {
    firebase.getPokemonsSoket((pokemons) => {
      setPokemons(pokemons);
    });
    return () => firebase.offPokemonsSoket();
  },[]);

  const history = useHistory();
    
  const handleClickGoHome = () => {
    console.log('####: <GamePage />', 'GOTO /');
    history.push('/');
  };
  
  const handleClickStartGame = () => {
    console.log('####: <GamePage />', 'GOTO game/board');
      history.push("game/board");
  };

  const onClickCardSelect = (id) => {
    const curPokemon = {...pokemons[id]}

    if (Object.keys(selectedPokemons).length < 5 || pokemons[id].selected) {
      onSelectedPokemons(id, curPokemon)

      setPokemons(prev => ({
        ...prev,
        [id]: {
          ...prev[id],
          selected: !prev[id].selected
        }
      }));
    }
  };

  return (
    <div className={s.root}>
      <div className={s.container}>
        <div className={s.buttons}>
          <button className={s.button} onClick={handleClickStartGame} disabled={Object.keys(selectedPokemons).length < 5}>Go to board</button>
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
              isActive={true}
              isSelected={selected}
              onClick={() => onClickCardSelect(key)}
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
