import { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import PokemonCard from "../../../../components/PokemonCard";
import { PokemonContext } from "../../../../context/pokemonContext";
import { FireBaseContext } from "../../../../context/firebaseContext";
import cn from 'classnames';

import s from './styles.module.css';

const FinishPage = () => {
  const { player1, player2, clearPokemonContext } = useContext(PokemonContext);
  const [isSelected, setSelected] = useState(null);
  const [selectedPokemon, setSelectedPokemon] = useState(null);

  const firebase = useContext(FireBaseContext);
  
  const history = useHistory();

  const handleEndGameClick = () => {
    selectedPokemon && firebase.addPokemon(selectedPokemon);
    clearPokemonContext();
    history.push('/game');
  }

  return (
    <div className={s.root}>
      <div className={s.playerOne}>
        {
          Object.values(player1).map((item) => (
            <PokemonCard
              key={item.id}
              name={item.name}
              img={item.img}
              id={item.id}
              type={item.type}
              values={item.values}
              isActive
            />
          ))
        }
      </div>
      <div className={s.title}>
        <button
          onClick={handleEndGameClick}
        >
          End Game
        </button>
      </div>
      <div className={s.playerOne}>
        {
          Object.values(player2).map((item) => (
            <div
              key={item.id}
              className={cn(s.cardBoard, {
                [s.selected]: isSelected === item.id
              })}
              onClick={() => {
                setSelected(item.id);
                setSelectedPokemon(item);
              }}
            >
            <PokemonCard
              key={item.id}
              name={item.name}
              img={item.img}
              id={item.id}
              type={item.type}
              values={item.values}
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