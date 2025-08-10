interface GameUIProps {
  score: number;
  started: boolean;
  activePowerUps: Set<string>;
}

export function GameUI({ score, started, activePowerUps }: GameUIProps) {
  return (
    <>
      {/* Score overlay */}
      <div className="absolute top-4 left-4 text-white text-2xl font-bold z-20">
        {score}
      </div>
      
      {/* Power-up status */}
      <div className="absolute top-4 right-4 flex gap-2 z-20">
        {activePowerUps.has('shield') && (
          <div className="bg-blue-500 text-white px-2 py-1 rounded text-xs font-bold animate-pulse">
            🛡️ Shield
          </div>
        )}
        {activePowerUps.has('speed') && (
          <div className="bg-yellow-500 text-white px-2 py-1 rounded text-xs font-bold animate-pulse">
            ⚡ Speed
          </div>
        )}
        {activePowerUps.has('double') && (
          <div className="bg-purple-500 text-white px-2 py-1 rounded text-xs font-bold animate-pulse">
            💎 2x Points
          </div>
        )}
      </div>
      
      {/* Press to start overlay */}
      {!started && (
        <div className="absolute inset-0 flex items-center justify-center bg-blue-900/80 rounded-xl z-30">
          <div className="text-center text-white">
            <h2 className="text-2xl font-bold mb-4">🐟 Floppy Fish Game</h2>
            <p className="text-lg mb-2">Avoid the green pipes!</p>
            <p className="text-sm mb-4">Collect power-ups for bonuses</p>
            <div className="bg-white/20 p-4 rounded-lg">
              <p className="text-xl font-semibold">Press SPACE or CLICK to Start</p>
              <p className="text-sm mt-2">Use SPACE, CLICK, or TOUCH to jump</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
} 