import { useEffect, useRef, useState } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
  color: string;
}

interface ParticleSystemProps {
  isActive: boolean;
  x: number;
  y: number;
  scale: number;
}

export function ParticleSystem({ isActive, x, y, scale }: ParticleSystemProps) {
  const [particles, setParticles] = useState<Particle[]>([]);
  const animationRef = useRef<number>();

  // Create particles when fish jumps
  useEffect(() => {
    if (!isActive) return;

    const newParticles: Particle[] = [];
    const particleCount = 8;

    for (let i = 0; i < particleCount; i++) {
      newParticles.push({
        x: x + 20 * scale,
        y: y + 20 * scale,
        vx: (Math.random() - 0.5) * 3,
        vy: Math.random() * 2 + 1,
        life: 1,
        maxLife: 1,
        size: Math.random() * 4 + 3,
        color: `hsl(${200 + Math.random() * 40}, 70%, 60%)`,
      });
    }

    setParticles(prev => [...prev, ...newParticles]);
  }, [isActive, x, y, scale]);

  // Update particles
  useEffect(() => {
    if (particles.length === 0) return;

    function updateParticles() {
      setParticles(prev => 
        prev
          .map(particle => ({
            ...particle,
            x: particle.x + particle.vx,
            y: particle.y + particle.vy,
            life: particle.life - 0.02,
            vy: particle.vy + 0.1, // gravity
          }))
          .filter(particle => particle.life > 0)
      );
    }

    animationRef.current = requestAnimationFrame(updateParticles);
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [particles]);

  return (
    <>
      {particles.map((particle, index) => (
        <div
          key={index}
          className="absolute rounded-full"
          style={{
            left: particle.x,
            top: particle.y,
            width: particle.size * scale,
            height: particle.size * scale,
            backgroundColor: particle.color,
            opacity: particle.life,
            transform: `translate(-50%, -50%)`,
            pointerEvents: 'none',
            zIndex: 10,
          }}
        />
      ))}
    </>
  );
} 