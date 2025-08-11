import { useEffect, useState } from "react";

interface PowerUp {
  id: number;
  x: number;
  y: number;
  type: 'shield' | 'speed' | 'double';
  collected: boolean;
  animation: number;
}

interface PowerUpsProps {
  columns: { x: number; gapY: number; scored?: boolean }[];
  scale: number;
  gameWidth: number;
  gameHeight: number;
  fishY: number;
  onCollect: (type: string) => void;
}

export function PowerUps({ columns, scale, gameWidth, gameHeight, fishY, onCollect }: PowerUpsProps) {
  const [powerUps, setPowerUps] = useState<PowerUp[]>([]);
  const [animationTime, setAnimationTime] = useState(0);

  // Spawn power-ups based on columns with better distribution
  useEffect(() => {
    const newPowerUps: PowerUp[] = [];
    
    columns.forEach((col, index) => {
      // Reduced spawn rate to 15% and ensure better spacing
      const shouldSpawn = Math.random() < 0.15 && 
        !powerUps.some(p => p.x === col.x) &&
        !powerUps.some(p => Math.abs(p.x - col.x) < 200); // Minimum 200px spacing
      
      if (shouldSpawn) {
        const types: ('shield' | 'speed' | 'double')[] = ['shield', 'speed', 'double'];
        const randomType = types[Math.floor(Math.random() * types.length)];
        
        // Randomize position within the gap for better distribution
        const gapCenter = col.gapY + 60;
        const randomOffset = (Math.random() - 0.5) * 40; // ±20px variation
        
        newPowerUps.push({
          id: Date.now() + index,
          x: col.x + 40, // Center of column
          y: gapCenter + randomOffset, // Varied vertical position
          type: randomType,
          collected: false,
          animation: 0,
        });
      }
    });

    if (newPowerUps.length > 0) {
      console.log('Power-ups spawned:', newPowerUps.length);
      setPowerUps(prev => {
        // Limit total power-ups to maximum 3 at any time
        const maxPowerUps = 3;
        const combined = [...prev, ...newPowerUps];
        return combined.slice(-maxPowerUps); // Keep only the latest 3
      });
    }
  }, [columns, powerUps]);

  // Animate power-ups with reduced frequency for better performance
  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationTime(prev => prev + 0.05); // Reduced animation speed
    }, 200); // Increased interval for better performance

    return () => clearInterval(interval);
  }, []);

  // Move power-ups with columns and check for fish collision - optimized for performance
  useEffect(() => {
    setPowerUps(prev => 
      prev
        .map(powerUp => ({
          ...powerUp,
          x: powerUp.x - 2, // Same speed as columns
        }))
        .filter(powerUp => {
          // Remove if off screen
          if (powerUp.x < -50) return false;
          
          // Only check collision if power-up is near the fish (performance optimization)
          if (powerUp.x > 80 && powerUp.x < 200) {
            const fishRect = {
              left: 120,
              right: 160,
              top: fishY,
              bottom: fishY + 40
            };
            
            const powerUpRect = {
              left: powerUp.x,
              right: powerUp.x + 32,
              top: powerUp.y,
              bottom: powerUp.y + 32
            };
            
            // Check for collision
            const collision = (
              fishRect.left < powerUpRect.right &&
              fishRect.right > powerUpRect.left &&
              fishRect.top < powerUpRect.bottom &&
              fishRect.bottom > powerUpRect.top
            );
            
            if (collision && !powerUp.collected) {
              onCollect(powerUp.type);
              return false; // Remove the power-up
            }
          }
          
          return true;
        })
    );
  }, [columns, fishY, onCollect]);

  const getPowerUpIcon = (type: string) => {
    switch (type) {
      case 'shield':
        return '🛡️';
      case 'speed':
        return '⚡';
      case 'double':
        return '💎';
      default:
        return '⭐';
    }
  };

  const getPowerUpColor = (type: string) => {
    switch (type) {
      case 'shield':
        return 'bg-blue-500';
      case 'speed':
        return 'bg-yellow-500';
      case 'double':
        return 'bg-purple-500';
      default:
        return 'bg-white';
    }
  };

  return (
    <>
      {powerUps.map(powerUp => (
        <div
          key={powerUp.id}
          className={`absolute flex items-center justify-center rounded-full ${getPowerUpColor(powerUp.type)} shadow-lg`}
          style={{
            left: powerUp.x * scale,
            top: powerUp.y * scale,
            width: 32 * scale,
            height: 32 * scale,
            transform: `translate(-50%, -50%) translateY(${Math.sin(animationTime + powerUp.id) * 3}px)`,
            opacity: powerUp.collected ? 0 : 1,
            transition: 'opacity 0.3s ease',
            zIndex: 15,
            cursor: 'pointer',
          }}
          onClick={() => {
            if (!powerUp.collected) {
              setPowerUps(prev => 
                prev.map(p => 
                  p.id === powerUp.id ? { ...p, collected: true } : p
                )
              );
              onCollect(powerUp.type);
            }
          }}
        >
          <span className="text-white text-xs font-bold">
            {getPowerUpIcon(powerUp.type)}
          </span>
        </div>
      ))}
    </>
  );
} 