import React from 'react';

interface GameUIProps {
  score: number;
  started: boolean;
  gameOver: boolean;
  onResetGame: () => void;
}

export function GameUI({ score, started, gameOver, onResetGame }: GameUIProps) {
  return (
    <>
      {/* Score */}
      {started && !gameOver && (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 text-white text-3xl font-bold drop-shadow-lg z-20">
          {score}
        </div>
      )}
      
      {/* Start Screen */}
      {!started && !gameOver && (
        <div className="absolute inset-0 flex flex-col items-center justify-center z-30">
          <div className="text-white text-2xl font-bold mb-2">Press Space or Click to Start</div>
          <div className="text-blue-200 text-sm">Avoid the pipes!</div>
        </div>
      )}
      
      {/* Game Over */}
      {gameOver && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-blue-900/90 z-40">
          <div className="text-white text-3xl font-bold mb-4">Game Over</div>
          <div className="text-blue-200 text-lg mb-6">Score: {score}</div>
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-md font-semibold text-lg"
            onClick={onResetGame}
          >
            Play Again
          </button>
        </div>
      )}
    </>
  );
} 