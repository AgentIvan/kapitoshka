import { PokemonContext } from "../../../../context/pokemonContext";
import { useContext, useEffect, useState } from "react";
import { useHistory } from 'react-router-dom';
import PokemonCard from '../../../../components/PokemonCard';

import s from './styles.module.css';
import PlayerBoard from "./component/PlayerBoard";

const counterWin = (board, player1, player2, count1 = player1.length, count2 = player2.length) => {

  board.forEach(item => {
    if (item.possession === 'red') count1++;
    if (item.possession === 'blue') count2++;
  });

  return [count1, count2];
}
const BoardPage = () => {
  const { pokemons } = useContext(PokemonContext);
  const history = useHistory();
  if (Object.keys(pokemons).length < 1) {
    history.replace('/game');
  }
    const [board, setBoard] = useState([]);
    const [player1, setPlayer1] = useState(
      () => Object.values(pokemons).map(item => ({
        ...item,
        possession: 'blue',
      }))
    );
    const [player2, setPlayer2] = useState([]);
    const [choiceCard, setChoiceCard] = useState(null);
    const [step, setStep] = useState(0);
    
  useEffect(async () =>{
    const boardResponce = await fetch('https://reactmarathon-api.netlify.app/api/board')
    const boardRequest = await boardResponce.json();
    
    setBoard(() => boardRequest.data.map(item => ({
      ...item,
      possession: 'blue',
    })));

    const player2Responce = await fetch('https://reactmarathon-api.netlify.app/api/create-player')
    const player2Request = await player2Responce.json();
    setPlayer2(player2Request.data.map(item => ({
      ...item,
      possession: 'red',
    })));
    console.log('#### BoardPage player2Request', player2Request.data);
  },[]);

  const handleClickBoardPlate = async (position) => {
    console.log('#### BoardPage position', position);
    console.log('#### BoardPage choiceCard', choiceCard);
    if (choiceCard) {
      const params = {
        position,
        card: choiceCard,
        board,
      };
      const res = await fetch('https://reactmarathon-api.netlify.app/api/players-turn', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(params),
      });

      const request = await res.json();
      console.log('#### BoardPage handleClickBoardPlate', request.data);

      if (choiceCard.player === 1) {
        setPlayer1(prevState => prevState.filter(item => item.id !== choiceCard.id));
      }
       if (choiceCard.player === 2) {
        setPlayer2(prevState => prevState.filter(item => item.id !== choiceCard.id));
      }

      setBoard(request.data);
      setStep(step => step + 1)
    }
  };

  useEffect(() => {
    const [count1, count2] = counterWin(board, player1, player2)
    if (step === 9) {
      if (count1 > count2) alert('WIN')
      else if (count1 < count2) alert('LOOSE')
      else alert('DRAW');
    }
    console.log(count1, count2);
  }, [step])

  return (
    <div className={s.root}>
      <div className={s.playerOne}>
        <PlayerBoard
          player={1}
          cards={player1}
          onClickCard={card => setChoiceCard(card)}
        />
      </div>
      <div className={s.board}>
        {
          board.map(item => (
            <div
              key={item.position}
              className={s.boardPlate}
              onClick={ () => !item.click && handleClickBoardPlate(item.position)}
            >
              {item.card && <PokemonCard {...item.card} isActive minimize />}
            </div>
          ))
        }
      </div>
      <div className={s.playerTwo}>
        <PlayerBoard
          player={2}
          cards={player2}
          onClickCard={card => setChoiceCard(card)}
        />
      </div>
    </div>
  );
};

export default BoardPage;
