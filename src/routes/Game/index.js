import { useState } from "react";
import { Route, Switch, useRouteMatch } from "react-router";
import StartPage from "./routes/Start";
import BoardPage from "./routes/Board";
import FinishPage from "./routes/Finish";
import { PokemonContext } from "../../context/pokemonContext";

const GamePage = () => {
  const [selectedPokemons, setSelectedPokemons] = useState({});

  const handleSelectedPokemons = (keyId, pokemon) => {
    setSelectedPokemons(prevState => {
      if(prevState[keyId]) {
        const copyState = {...prevState};
        delete copyState[keyId];
        return copyState;
      }
      return {
        ...prevState,
        [keyId]: pokemon
      };
    });
  };

  const match = useRouteMatch();
  return (
    <PokemonContext.Provider value={{
      pokemons: selectedPokemons,
      onSelectedPokemons: handleSelectedPokemons
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
