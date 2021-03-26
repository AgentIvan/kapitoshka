import React, { useState, useCallback, useMemo, useContext } from "react";

export const PokemonContext = React.createContext({});

export const PokemonProvider = ({ children }) => {
  const [selectedPokemons, setSelectedPokemons] = useState({});

  const handleSelectedPokemons = useCallback((key, pokemon) => {
    setSelectedPokemons((prevState) => {
      if (prevState[key]) {
        // eslint-disable-next-line no-unused-vars
        const { [key]: _, ...newState } = prevState;
        return newState;
      }
      return { ...prevState, [key]: pokemon };
    });
  }, []);

  const handleClearSelectedPokemons = useCallback(() => {
    setSelectedPokemons({});
  }, []);

  const value = useMemo(
    () => ({
      selectedPokemons,
      handleSelectedPokemons,
      handleClearSelectedPokemons,
    }),
    [selectedPokemons, handleSelectedPokemons, handleClearSelectedPokemons]
  );

  return (
    <PokemonContext.Provider value={value}>{children}</PokemonContext.Provider>
  );
};

export const usePokemons = () => {
  const context = useContext(PokemonContext);

  return context;
};