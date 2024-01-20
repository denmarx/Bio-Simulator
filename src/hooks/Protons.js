import { useState, useEffect } from 'react';
import Matter from 'matter-js';

const useProtons = (world, canvasRef, temperature, pH) => {
  const [protons, setProtons] = useState([]);
  const categoryWater = 0x0001;
  const categoryProtons = 0x0002;
  const cacluateNumProtons = (pH) => {
    if (pH < 7) return 60 + (7 - pH) * 5;
    if (pH > 7) return Math.max(0, 60 - (pH - 7) * 5);
    return 60;
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
        collisionFilter: {
          category: categoryProtons,
          mask: categoryWater | categoryProtons,
        },
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
    const applyVelocity = () => {
      const velocityScaleFactor = temperature > 0 ? Math.max(0, temperature / 25) : 0;
      protons.forEach((proton) => {
        const direction = Math.random() * Math.PI * 2;
        const velocity = {
          x: Math.sin(direction) * velocityScaleFactor,
          y: Math.cos(direction) * velocityScaleFactor,
        };
        Matter.Body.setVelocity(proton, velocity);
      });
    };
    const interval = setInterval(applyVelocity, 100);
    return () => clearInterval(interval);
  }, [temperature, protons]);

  return protons;
};

export default useProtons;
