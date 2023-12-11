import { useState, useEffect } from 'react';
import Matter from 'matter-js';
const NUM_WATER_PARTICLES = 200;

const useWaterParticles = (world, canvasRef, temperature) => {
  // particles location
  const [particles, setParticles] = useState([]);
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
    // sets particles speed based on temperature
    const velocityScaleFactor = Math.max(0, temperature / 50);
    // calculates
    particles.forEach((particle) => {
      // calculates angle of velocity vectors
      const direction = Math.random() * 9;
      const velocity = {
        // cacluates velocity vectors dependent on temperature
        x: Math.sin(direction) * 8 * velocityScaleFactor,
        y: Math.cos(direction) * 8 * velocityScaleFactor,
      };
      Matter.Body.setVelocity(particle, velocity);
    });
    // dependency arrays
  }, [temperature, particles]);

  return particles;
};

export default useWaterParticles;
