import React, { useState, useCallback, useMemo, useContext } from "react";

const PlayerCardsContext = React.createContext({});

export const PlayerCardsProvider = ({ children }) => {
  const [playersCards, setPlayerCards] = useState(null);

  const handleSetPlayerCards = useCallback((playerOneCards, playerTwoCards) => {
    setPlayerCards({
      playerOne: playerOneCards,
      playerTwo: playerTwoCards,
    });
  }, []);

  const handleClearPlayersCards = useCallback(() => {
    setPlayerCards(null);
  }, []);

  const value = useMemo(
    () => ({ playersCards, handleSetPlayerCards, handleClearPlayersCards }),
    [playersCards, handleSetPlayerCards, handleClearPlayersCards]
  );

  return (
    <PlayerCardsContext.Provider value={value}>
      {children}
    </PlayerCardsContext.Provider>
  );
};

export const usePlayersCards = () => {
  const context = useContext(PlayerCardsContext);

  return context;
};