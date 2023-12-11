import React, { useEffect, useRef, useState } from 'react';
import '../ressources/styles/App.css';
import Matter from 'matter-js';

// Constants for magic numbers
const NUM_WATER_PARTICLES = 200;

// Custom hook to manage water particles
const useWaterParticles = (world, canvasRef, temperature) => {
  // particles location
  const [particles, setParticles] = useState([]);
  // particle creation, number,  physical properties
  const addWaterParticles = () => {
    let particleArray = [];
    for (let i = 0; i < NUM_WATER_PARTICLES; i++) {
      let x = Math.floor(Math.random() * (canvasRef.current.width * 3.5));
      let y = Math.floor(Math.random() * (canvasRef.current.height * 3.5));
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

// Water engine
const Water = ({ world, engine, tempTitle, startTemp, tempUnit, phTitle, startPh, temperature }) => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [temp, setTemp] = useState(startTemp);
  const [ph, setPh] = useState(startPh);
  useWaterParticles(world, canvasRef, temperature);

  // renders canvas borders
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

    const upperBorder = Matter.Bodies.rectangle(canvasRef.current.width / 2, 0, render.canvas.width, borderThickness, {
      isStatic: true,
    });
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

  // updates value display
  useEffect(() => {
    setTemp(startTemp);
  }, [startTemp]);

  useEffect(() => {
    setPh(startPh);
  }, [startPh]);

  return (
    <div className='waterContainer' ref={containerRef}>
      <div className='valueDisplay'>
        {tempTitle} {temp} {tempUnit} {phTitle} {ph}
      </div>

      <canvas className='waterWorld' ref={canvasRef} />
    </div>
  );
};

export default Water;
