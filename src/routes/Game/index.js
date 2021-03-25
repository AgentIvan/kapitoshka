import { useState } from "react";
import { Route, Switch, useRouteMatch } from "react-router";
import StartPage from "./routes/Start";
import BoardPage from "./routes/Board";
import FinishPage from "./routes/Finish";
import { PokemonContext } from "../../context/pokemonContext";

const GamePage = () => {
  const [selectedPokemons, setSelectedPokemons] = useState({});

  const handleSelectedPokemons = (key, pokemon) => {
    setSelectedPokemons(prevState => {
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
    console.log('####: <GamePage />', 'resetSelectedPokemons');
    setSelectedPokemons({});
  };

  const match = useRouteMatch();
  return (
    <PokemonContext.Provider value={{
      pokemons: selectedPokemons,
      onSelectedPokemons: handleSelectedPokemons,
      resetSelectedPokemons: handleResetSelected
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
