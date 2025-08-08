import { useEffect, useRef, useState } from "react";

interface Bubble {
  id: number;
  x: number;
  y: number;
  size: number;
  speed: number;
  opacity: number;
}

interface Seaweed {
  id: number;
  x: number;
  height: number;
  sway: number;
  swaySpeed: number;
}

interface AnimatedBackgroundProps {
  gameWidth: number;
  gameHeight: number;
  scale: number;
}

export function AnimatedBackground({ gameWidth, gameHeight, scale }: AnimatedBackgroundProps) {
  const [bubbles, setBubbles] = useState<Bubble[]>([]);
  const [seaweeds, setSeaweeds] = useState<Seaweed[]>([]);
  const animationRef = useRef<number>();
  const bubbleIdRef = useRef(0);
  const seaweedIdRef = useRef(0);

  // Initialize seaweed
  useEffect(() => {
    const newSeaweeds: Seaweed[] = [];
    for (let i = 0; i < 5; i++) {
      newSeaweeds.push({
        id: seaweedIdRef.current++,
        x: Math.random() * gameWidth,
        height: Math.random() * 100 + 50,
        sway: Math.random() * Math.PI * 2,
        swaySpeed: Math.random() * 0.02 + 0.01,
      });
    }
    setSeaweeds(newSeaweeds);
  }, [gameWidth]);

  // Spawn bubbles periodically
  useEffect(() => {
    const spawnBubble = () => {
      const newBubble: Bubble = {
        id: bubbleIdRef.current++,
        x: Math.random() * gameWidth,
        y: gameHeight + 20,
        size: Math.random() * 8 + 4,
        speed: Math.random() * 1 + 0.5,
        opacity: Math.random() * 0.5 + 0.3,
      };
      setBubbles(prev => [...prev, newBubble]);
    };

    const interval = setInterval(spawnBubble, 1000); // Spawn bubbles more frequently
    return () => clearInterval(interval);
  }, [gameWidth, gameHeight]);

  // Animate bubbles and seaweed
  useEffect(() => {
    function animate() {
      // Update bubbles
      setBubbles(prev => 
        prev
          .map(bubble => ({
            ...bubble,
            y: bubble.y - bubble.speed,
          }))
          .filter(bubble => bubble.y > -20)
      );

      // Update seaweed sway
      setSeaweeds(prev => 
        prev.map(seaweed => ({
          ...seaweed,
          sway: seaweed.sway + seaweed.swaySpeed,
        }))
      );

      animationRef.current = requestAnimationFrame(animate);
    }

    animationRef.current = requestAnimationFrame(animate);
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, []);

  return (
    <>
      {/* Animated bubbles */}
      {bubbles.map(bubble => (
        <div
          key={bubble.id}
          className="absolute rounded-full bg-blue-200/60 backdrop-blur-sm"
          style={{
            left: bubble.x * scale,
            top: bubble.y * scale,
            width: bubble.size * scale,
            height: bubble.size * scale,
            opacity: bubble.opacity,
            transform: `translate(-50%, -50%)`,
            pointerEvents: 'none',
            zIndex: 1,
          }}
        />
      ))}

      {/* Animated seaweed */}
      {seaweeds.map(seaweed => (
        <div
          key={seaweed.id}
          className="absolute bottom-0"
          style={{
            left: seaweed.x * scale,
            transform: `translateX(-50%) rotate(${Math.sin(seaweed.sway) * 5}deg)`,
            pointerEvents: 'none',
            zIndex: 2,
          }}
        >
          <div
            className="bg-green-600/70 rounded-t-full"
            style={{
              width: 4 * scale,
              height: seaweed.height * scale,
              background: `linear-gradient(to top, rgba(34, 197, 94, 0.6), rgba(34, 197, 94, 0.2))`,
            }}
          />
        </div>
      ))}
    </>
  );
} 