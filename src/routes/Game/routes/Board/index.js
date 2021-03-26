import { PokemonContext } from "../../../../context/pokemonContext";
import { useContext, useEffect, useState } from "react";
import { useHistory } from 'react-router-dom';
import PokemonCard from '../../../../components/PokemonCard';

import s from './styles.module.css';
import PlayerBoard from "./components/PlayerBoard";
import ArrowChoice from './components/ArrowChoice';
import Result from './components/Result';

const counterWin = (board, player1, player2) => {
  let count1 = player1.length, count2 = player2.length;
  console.log("counterWin parameters:",board, player1, player2);
  board.forEach(item => {
    if (item.card?.possession === 'blue') count1++;
    if (item.card?.possession === 'red') count2++;
  });

  return [count1, count2];
}

const randomInteger = (min, max) => {
  const rand = min - 0.5 + Math.random() * (max - min + 1)
  return Math.round(rand)
}
const BoardPage = () => {
  const { player1: pokemons, setPlayer2: setEnemies } = useContext(PokemonContext);
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
    const [turn, setTurn] = useState(0);
    const [stop, setStop] = useState(false);
    const [result, setResult] = useState(null);
    
  useEffect(async () =>{
    const boardResponce = await fetch('https://reactmarathon-api.netlify.app/api/board');
    const boardRequest = await boardResponce.json();
    console.log( "#### Board:",boardRequest.data);
    setBoard(() => boardRequest.data.map(item => ({
      ...item
    })));

    const player2Responce = await fetch('https://reactmarathon-api.netlify.app/api/create-player')
    const player2Request = await player2Responce.json();
    setEnemies(player2Request.data);
    setPlayer2(player2Request.data.map(item => ({
      ...item,
      possession: 'red',
    })));
    console.log('#### BoardPage player2Request', player2Request.data);
    const random = randomInteger(1, 2);
    console.log("turn:", [0,'blue', 'red'][random]);
    setTimeout(() => setTurn(random), 3000); // 1 - 'blue', 2 - 'red'
  },[]);

  const handleClickBoardPlate = async (position) => {
    console.log('#### BoardPage position', position);
    console.log('#### BoardPage choiceCard', choiceCard);
    if (!choiceCard) return;

    setTurn(turn => turn === 1 ? 2 : 1);
    setStop(true);
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
    setStep(step => step + 1);
    setChoiceCard(null);
  };

  useEffect(() => {
    console.log('#### step:', step);
    if (step === 9) {
      const [count1, count2] = counterWin(board, player1, player2)
      let result = 'win';
      if (count1 > count2) result = 'win';
      else if (count1 < count2) result ='loose';
      else result = 'draw';
      setResult(result);
      setTimeout(() => history.push('/game/finish/' + result), 2000);
    }
  }, [step]);

  return (
    <div className={s.root}>
      {result && <Result type={result} />}
      <ArrowChoice side={turn} stop={stop} />
      <div className={s.playerOne}>
        <PlayerBoard
          player={1}
          cards={player1}
          turn={turn}
          onClickCard={card => turn===1 && setChoiceCard(card)}
        />
      </div>
      <div className={s.board}>
        {
          board.map(item => (
            <div
              key={item.position}
              className={s.boardPlate}
              onClick={ () => choiceCard && !item.card && handleClickBoardPlate(item.position)}
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
          turn={turn}
          onClickCard={card => setChoiceCard(card)}
        />
      </div>
    </div>
  );
};

export default BoardPage;
