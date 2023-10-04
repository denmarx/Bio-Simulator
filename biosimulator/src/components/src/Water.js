import React, { useEffect, useRef, useState } from 'react';
import '../ressources/styles/App.css';
import Matter from 'matter-js';
import Slider from './Slider';

// Constants for magic numbers
const NUM_WATER_PARTICLES = 200;

// Custom hook to manage water particles
const useWaterParticles = (world, canvasRef, temperature) => {
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
        render: {
          fillStyle: 'blue',
        },
      });
      Matter.Body.setInertia(particle, Infinity);
      // const velocityScaleFactor = Math.max(0, temperature / 50);
      // const direction = Math.random() * Math.PI * 2;
      // const velocity = {
      //   x: Math.sin(direction) * 5 * velocityScaleFactor,
      //   y: Math.cos(direction) * 5 * velocityScaleFactor,
      // };
      // Matter.Body.setVelocity(particle, velocity);

      // Matter.Body.setVelocity(particle, {
      //   x: Math.sin(direction) * 5,
      //   y: Math.cos(direction) * 5,
      // });

      Matter.World.add(world, particle);
      particleArray.push(particle);
    }

    setParticles(particleArray);
  };

  useEffect(() => {
    addWaterParticles();
  }, []);

  useEffect(() => {
    const velocityScaleFactor = Math.max(0, temperature / 50);
    particles.forEach((particle) => {
      const direction = Math.random() * Math.PI * 2;
      const velocity = {
        x: Math.sin(direction) * 5 * velocityScaleFactor,
        y: Math.cos(direction) * 5 * velocityScaleFactor,
      };
      Matter.Body.setVelocity(particle, velocity);
    });
  }, [temperature, particles]);

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
  temperature,
}) => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [temp, setTemp] = useState(startTemp);
  const [ph, setPh] = useState(startPh);
  useWaterParticles(world, canvasRef, temperature);
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
