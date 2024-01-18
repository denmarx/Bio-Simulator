import { useState, useEffect } from 'react';
import Matter from 'matter-js';
const NUM_PROTONS = 20;

const useProtons = (world, canvasRef, ph) => {
  const [protons, setProtons] = useState([]);

  const addProtons = () => {
    let protonArray = [];
    for (let i = 0; i < NUM_PROTONS; i++) {
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
  useEffect(() => {
    addProtons();
  }, []);

  return protons;
};

export default useProtons;
