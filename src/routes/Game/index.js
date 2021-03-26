import { useState } from "react";
import { Route, Switch, useRouteMatch } from "react-router";
import StartPage from "./routes/Start";
import BoardPage from "./routes/Board";
import FinishPage from "./routes/Finish";
import { PokemonContext } from "../../context/pokemonContext";

const GamePage = () => {
  const [player1, setPlayer1] = useState({});
  const [player2, setPlayer2] = useState({});

  const handleSelectedPokemons = (key, pokemon) => {
    setPlayer1(prevState => {
      if(prevState[key]) {
        const copyState = {...prevState};
        delete copyState[key];
        return copyState;
      }
      return {
        ...prevState,
        [key]: pokemon
      };
    });
  };

  const handleResetSelected = () => {
    console.log('####: <GamePage />', 'clearPokemonContext');
    setPlayer1({});
    setPlayer2({});
  };

  const match = useRouteMatch();
  return (
    <PokemonContext.Provider value={{
      player1,
      player2,
      setPlayer2,
      onSelectedPokemons: handleSelectedPokemons,
      clearPokemonContext: handleResetSelected
    }}>
      <Switch>
          <Route path={`${match.path}/`} exact component={StartPage} />
          <Route path={`${match.path}/board`} component={BoardPage} />
          <Route path={`${match.path}/finish`} component={FinishPage} />
      </Switch>
    </PokemonContext.Provider>
  );
};

export default GamePage;
