import React, { useEffect, useRef, useState } from 'react';
import '../ressources/styles/App.css';
import Matter from 'matter-js';

// Constants for magic numbers
const NUM_WATER_PARTICLES = 100;

// Custom hook to manage water particles
const useWaterParticles = (world, canvasRef) => {
  const [particles, setParticles] = useState([]);

  const addWaterParticles = () => {
    let particleArray = [];

    for (let i = 0; i < NUM_WATER_PARTICLES; i++) {
      let x = Math.floor(Math.random() * canvasRef.current.width);
      let y = Math.floor(Math.random() * canvasRef.current.height);

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

// Water engine
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
  useWaterParticles(world, canvasRef);
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
