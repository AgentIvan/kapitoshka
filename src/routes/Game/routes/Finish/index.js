import { useContext, useState } from "react";
import { useHistory, useRouteMatch } from "react-router-dom";
import PokemonCard from "../../../../components/PokemonCard";
import { PokemonContext } from "../../../../context/pokemonContext";
import { FireBaseContext } from "../../../../context/firebaseContext";
import cn from 'classnames';

import s from './styles.module.css';

const FinishPage = () => {
  const history = useHistory();
  const match = useRouteMatch('/game/finish');
  const win = useRouteMatch('/game/finish/win');
  const loose = useRouteMatch('/game/finish/loose');
  const draw = useRouteMatch('/game/finish/draw');
  const { player1, player2, clearPokemonContext } = useContext(PokemonContext);
  const [selectedPokemon, setSelectedPokemon] = useState(null);

  const handleSelectPokemon = (pokemon) => {
    win && setSelectedPokemon(pokemon);
    pokemon.id === selectedPokemon?.id && setSelectedPokemon(null);
  };

  if (match.isExact || !player1 || !player2?.length) {
    history.replace('/game');
  }

  const firebase = useContext(FireBaseContext);
  

  const handleEndGameClick = () => {
    selectedPokemon && firebase.addPokemon(selectedPokemon);
    clearPokemonContext();
    history.push('/game');
  }

  return (
    <div className={s.root}>
      <div className={s.title}>
        {win && <h1>You win</h1>}
        {loose && <h1>You loose</h1>}
        {draw && <h1>Draw</h1>}
        <h2>Your Cards</h2>
      </div>
      <div className={s.player}>
        {
          Object.values(player1).map((item) => (
            <div
              key={item.id}
              className={s.cardBoard}
            >
            <PokemonCard
              name={item.name}
              img={item.img}
              id={item.id}
              type={item.type}
              values={item.values}
              minimize
              isActive
            />
            </div>
          ))
        }
      </div>
      <div className={s.title}>
        <button
          onClick={handleEndGameClick}
          disabled={win && !selectedPokemon}
        >
          End Game
        </button>
        {win && <div>
          <br />
          <br />
          <span><h2>Choose one Enemy`s card to add to the collection and click END GAME</h2></span>
        </div>}
      </div>
      <div className={s.player}>
        {
          Object.values(player2).map((item) => (
            <div
              key={item.id}
              className={cn(s.cardBoard, {
                [s.selected]: selectedPokemon?.id === item.id
              })}
              onClick={() => {
                handleSelectPokemon(item);
              }}
            >
            <PokemonCard
              key={item.id}
              name={item.name}
              img={item.img}
              id={item.id}
              type={item.type}
              values={item.values}
              minimize
              isActive
            />
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default FinishPage;