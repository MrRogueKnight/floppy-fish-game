import { useEffect } from "react";

interface GameOverScreenProps {
  score: number;
  onRestart: () => void;
}

export function GameOverScreen({ score, onRestart }: GameOverScreenProps) {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.code === "Space") {
        e.preventDefault();
        onRestart();
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onRestart]);

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-blue-900/90 rounded-xl z-40">
      <div className="text-center">
        <div className="text-white text-4xl font-bold mb-2">🎮 Game Over</div>
        <div className="text-blue-200 text-xl mb-4">Final Score: {score}</div>
        <div className="text-blue-300 text-sm mb-6">
          Press SPACE or click to play again
        </div>
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-8 rounded-lg font-semibold text-lg transition-colors"
          onClick={onRestart}
        >
          🎯 Play Again
        </button>
      </div>
    </div>
  );
} 