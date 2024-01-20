import { useState, useEffect } from 'react';
import Matter from 'matter-js';
const NUM_WATER_PARTICLES = 200;

const useWaterParticles = (world, canvasRef, temperature) => {
  const [particles, setParticles] = useState([]);
  const categoryWater = 0x0001;
  const categoryProtons = 0x0002;

  // particle creation, number,  physical properties
  const addWaterParticles = () => {
    let particleArray = [];
    for (let i = 0; i < NUM_WATER_PARTICLES; i++) {
      let x = Math.floor(Math.random() * canvasRef.current.width);
      let y = Math.floor(Math.random() * canvasRef.current.height);
      const particle = Matter.Bodies.circle(x, y, 5, {
        restitution: 1,
        friction: 0,
        frictionAir: 0,
        collisionFilter: {
          category: categoryWater,
          mask: categoryWater | categoryProtons,
        },
        render: {
          fillStyle: 'blue',
        },
      });
      Matter.Body.setInertia(particle, Infinity);
      Matter.World.add(world, particle);
      particleArray.push(particle);
    }

    setParticles(particleArray);
  };
  // adds particles during first initialization
  useEffect(() => {
    addWaterParticles();
  }, []);
  //Hook w/ dependency array that gets triggered when temperature or particles array changes
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

  return particles;
};

export default useWaterParticles;
