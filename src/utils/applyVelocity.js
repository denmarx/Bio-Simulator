import { useEffect } from 'react';
import Matter from 'matter-js';

const useParticleVelocity = (temperature, particles) => {
  useEffect(() => {
    const applyVelocity = () => {
      // sets particles speed based on temperature
      const velocityScaleFactor = temperature > 0 ? Math.max(0, temperature / 25) : 0;
      particles.forEach((particle) => {
        // calculates angle of velocity vectors
        const direction = Math.random() * Math.PI * 2;
        const velocity = {
          // cacluates velocity vectors dependent on temperature
          x: Math.sin(direction) * velocityScaleFactor,
          y: Math.cos(direction) * velocityScaleFactor,
        };
        Matter.Body.setVelocity(particle, velocity);
      });
    };

    const interval = setInterval(applyVelocity, 100);
    return () => clearInterval(interval);
  }, [temperature, particles]);
};

export default useParticleVelocity;
