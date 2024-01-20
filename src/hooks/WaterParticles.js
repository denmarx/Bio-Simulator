import { useState, useEffect } from 'react';
import Matter from 'matter-js';
import useParticleVelocity from '../utils/applyVelocity';
const NUM_WATER_PARTICLES = 200;

const useWaterParticles = (world, canvasRef, temperature) => {
  const [particles, setParticles] = useState([]);
  const categoryWater = 0x0001;
  const categoryProtons = 0x0002;

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

  useParticleVelocity(temperature, particles);
};

export default useWaterParticles;
