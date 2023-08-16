import React, { useEffect, useRef, useState } from 'react';
import '../ressources/styles/App.css';
import Matter from 'matter-js';

// Constants for magic numbers
const NUM_WATER_PARTICLES = 100;
const MIN_Y_BORDER = 10;

// Custom hook to manage water particles
const useWaterParticles = (world, canvasRef) => {
  const [particles, setParticles] = useState([]);

  const addWaterParticles = () => {
    let particleArray = [];

    for (let i = 0; i < NUM_WATER_PARTICLES; i++) {
      let x = Math.floor(Math.random() * canvasRef.current.width);
      let y = Math.floor(Math.random() * canvasRef.current.height);

      y = Math.max(y, MIN_Y_BORDER);
      y = Math.min(y, canvasRef.current.height - MIN_Y_BORDER);

      const particle = Matter.Bodies.circle(x, y, 5, {
        restitution: 1,
        friction: 0,
        frictionAir: 0,
      });
      Matter.Body.setInertia(particle, Infinity);
      const direction = Math.random() * Math.PI * 2;
      Matter.Body.setVelocity(particle, {
        x: Math.sin(direction) * 2,
        y: Math.cos(direction) * 2,
      });

      Matter.World.add(world, particle);
      particleArray.push(particle);
    }

    setParticles(particleArray);
  };

  // const resetWaterParticles = () => {
  //   particles.forEach((particle) => {
  //     Matter.World.remove(world, particle);
  //   });
  //   addWaterParticles();
  // };

  useEffect(() => {
    addWaterParticles();
  }, []);

  return { particles };
};

const Water = ({
  world,
  engine,
  tempTitle,
  startTemp,
  tempUnit,
  phTitle,
  startPh,
}) => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [temp, setTemp] = useState(startTemp);
  const [ph, setPh] = useState(startPh);
  const { resetWaterParticles } = useWaterParticles(world, canvasRef);

  //   for (let i = 0; i < 200; i++) {
  //     let x = Math.floor(Math.random() * canvasRef.current.width);
  //     let y = Math.floor(Math.random() * canvasRef.current.height);
  //     if (y <= 10) {
  //       y = 11;
  //     }
  //     if (y >= canvasRef.current.height - 10) {
  //       y = canvasRef.current.height - 11;
  //     }
  //     const particle = Matter.Bodies.circle(x, y, 5, {
  //       restitution: 1,
  //       friction: 0,
  //       frictionAir: 0,
  //     });
  //     Matter.Body.setInertia(particle, Infinity);
  //     Matter.World.add(world, particle);
  //     const direction = Math.random() * Math.PI * 2;
  //     Matter.Body.setVelocity(particle, {
  //       x: Math.sin(direction) * 2,
  //       y: Math.cos(direction) * 2,
  //     });
  //     particleArray.push(particle); // Store the particle in the array
  //   }

  //   setParticles(particleArray); // Set the particles state with the newly created particles
  // };

  // const resetWaterParticles = () => {
  //   // Remove existing particles from the world
  //   particles.forEach((particle) => {
  //     Matter.World.remove(world, particle);
  //   });

  //   // Re-initialize the particles
  //   addWaterParticles(world);
  // };

  useEffect(() => {
    const render = Matter.Render.create({
      canvas: canvasRef.current,
      element: containerRef.current,
      engine: engine,
      options: {
        wireframes: false,
      },
    });

    const borderThickness = 40;

    const ground = Matter.Bodies.rectangle(
      canvasRef.current.width / 2,
      canvasRef.current.height - 10,
      render.canvas.width,
      borderThickness,
      { isStatic: true }
    );
    Matter.World.add(world, ground);

    const upperBorder = Matter.Bodies.rectangle(
      canvasRef.current.width / 2,
      0,
      render.canvas.width,
      borderThickness,
      { isStatic: true }
    );
    Matter.World.add(world, upperBorder);

    const leftBorder = Matter.Bodies.rectangle(
      10,
      canvasRef.current.height / 2,
      borderThickness,
      canvasRef.current.height,
      { isStatic: true }
    );
    Matter.World.add(world, leftBorder);

    const rightBorder = Matter.Bodies.rectangle(
      canvasRef.current.width - 10,
      canvasRef.current.height / 2,
      borderThickness,
      canvasRef.current.height,
      { isStatic: true }
    );
    Matter.World.add(world, rightBorder);

    Matter.Render.run(render);

    return () => {
      Matter.Render.stop(render);
      Matter.Engine.clear(engine);
    };
  }, []);

  useEffect(() => {
    setTemp(startTemp);
  }, [startTemp]);

  useEffect(() => {
    setPh(startPh);
  }, [startPh]);

  return (
    <div className="waterContainer" ref={containerRef}>
      <div className="valueDisplay">
        {tempTitle} {temp} {tempUnit} {phTitle} {ph}
      </div>

      <canvas className="waterWorld" ref={canvasRef} />
    </div>
  );
};

export default Water;
