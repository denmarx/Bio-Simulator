import { useState, useEffect } from 'react';
import Matter from 'matter-js';
// const NUM_PROTONS = 20;

const useProtons = (world, canvasRef, temperature, pH) => {
  const [protons, setProtons] = useState([]);
  const cacluateNumProtons = (pH) => {
    if (pH < 7) return 40 + (7 - pH) * 5;
    if (pH > 7) return Math.max(0, 40 - (pH - 7) * 5);
    return 40;
  };

  const addProtons = (numProtons) => {
    let protonArray = [];
    for (let i = 0; i < numProtons; i++) {
      let x = Math.floor(Math.random() * canvasRef.current.width);
      let y = Math.floor(Math.random() * canvasRef.current.height);
      const proton = Matter.Bodies.rectangle(x, y, 4, 4, {
        restitution: 1,
        friction: 0,
        frictionAir: 0,
        render: {
          fillStyle: 'red',
        },
      });
      Matter.Body.setInertia(proton, Infinity);
      Matter.World.add(world, proton);
      protonArray.push(proton);
    }
    setProtons(protonArray);
  };

  const removeProtons = () => {
    protons.forEach((proton) => {
      Matter.World.remove(world, proton);
    });
    setProtons([]);
  };

  useEffect(() => {
    const numProtons = cacluateNumProtons(pH);
    removeProtons();
    addProtons(numProtons);
  }, [pH]);

  useEffect(() => {
    const velocityScaleFactor = Math.max(0, temperature / 50);
    protons.forEach((proton) => {
      const direction = Math.random() * 9;
      const velocity = {
        x: Math.sin(direction) * 8 * velocityScaleFactor,
        y: Math.cos(direction) * 8 * velocityScaleFactor,
      };
      Matter.Body.setVelocity(proton, velocity);
    });
  }, [temperature, protons]);

  return protons;
};

export default useProtons;
