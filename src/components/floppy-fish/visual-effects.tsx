import { useEffect, useState } from "react";

interface VisualEffect {
  id: number;
  x: number;
  y: number;
  text: string;
  color: string;
  life: number;
}

interface VisualEffectsProps {
  score: number;
  powerUpCollected: string | null;
  scale: number;
  gameWidth: number;
}

export function VisualEffects({ score, powerUpCollected, scale, gameWidth }: VisualEffectsProps) {
  const [effects, setEffects] = useState<VisualEffect[]>([]);
  const [lastScore, setLastScore] = useState(score);
  const [lastPowerUp, setLastPowerUp] = useState<string | null>(null);

  // Create score effect
  useEffect(() => {
    if (score > lastScore) {
      const newEffect: VisualEffect = {
        id: Date.now(),
        x: gameWidth * 0.2,
        y: 50,
        text: `+${score - lastScore}`,
        color: '#10B981', // Green
        life: 1,
      };
      setEffects(prev => {
        // Limit to maximum 5 effects at once
        const maxEffects = 5;
        const updated = [...prev, newEffect];
        return updated.slice(-maxEffects);
      });
      setLastScore(score);
    }
  }, [score, lastScore, gameWidth]);

  // Create power-up effect
  useEffect(() => {
    if (powerUpCollected && powerUpCollected !== lastPowerUp) {
      const newEffect: VisualEffect = {
        id: Date.now() + 1,
        x: gameWidth * 0.7,
        y: 50,
        text: `+${powerUpCollected.toUpperCase()}`,
        color: powerUpCollected === 'shield' ? '#3B82F6' : 
               powerUpCollected === 'speed' ? '#F59E0B' : '#8B5CF6',
        life: 1,
      };
      setEffects(prev => {
        // Limit to maximum 5 effects at once
        const maxEffects = 5;
        const updated = [...prev, newEffect];
        return updated.slice(-maxEffects);
      });
      setLastPowerUp(powerUpCollected);
    }
  }, [powerUpCollected, lastPowerUp, gameWidth]);

  // Animate effects - optimized for performance
  useEffect(() => {
    const interval = setInterval(() => {
      setEffects(prev => 
        prev
          .map(effect => ({
            ...effect,
            y: effect.y - 0.5, // Slower movement
            life: effect.life - 0.01, // Slower fade
          }))
          .filter(effect => effect.life > 0)
      );
    }, 100); // Reduced frequency

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {effects.map(effect => (
        <div
          key={effect.id}
          className="absolute font-bold text-lg pointer-events-none"
          style={{
            left: effect.x * scale,
            top: effect.y * scale,
            color: effect.color,
            opacity: effect.life,
            transform: `translate(-50%, -50%)`,
            zIndex: 25,
            textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
          }}
        >
          {effect.text}
        </div>
      ))}
    </>
  );
} 