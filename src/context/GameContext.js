
import React, { createContext, useContext, useState } from 'react';

// Crear el contexto
const GameContext = createContext();

// Componente proveedor del contexto
export const GameProvider = ({ children }) => {
  const [gameState, setGameState] = useState('start');
  const [level, setLevel] = useState(1);
  const [errors, setErrors] = useState(0);
  const [board, setBoard] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);

  // Maneja el estado del juego
  const resetGame = () => {
    setGameState('start');
    setLevel(1);
    setBoard([]);
    setFlipped([]);
    setMatched([]);
    setErrors(0);
  };

  return (
    <GameContext.Provider
      value={{
        gameState,
        setGameState,
        level,
        setLevel,
        errors,
        setErrors,
        board,
        setBoard,
        flipped,
        setFlipped,
        matched,
        setMatched,
        resetGame
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

// Hook para acceder al contexto
export const useGameContext = () => {
  return useContext(GameContext);
};
