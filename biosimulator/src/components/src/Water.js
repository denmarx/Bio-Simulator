import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import '../ressources/styles/App.css';
import Matter from 'matter-js';

const Water = ({ tempTitle, startTemp, tempUnit, phTitle, startPh }) => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [temp, setTemp] = useState(startTemp);
  const [ph, setPh] = useState(startPh);
  const [engine, setEngine] = useState(null);
  const [renderM, setRenderM] = useState(null);
  const [world, setWorld] = useState(null);

  useEffect(() => {
    const engine = Matter.Engine.create({});
    const render = Matter.Render.create({
      canvas: canvasRef.current,
      element: containerRef.current,
      engine: engine,
      options: {
        wireframes: false,
      },
    });

    const world = engine.world;
    engine.gravity.scale = 0;

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

    for (let i = 0; i < 200; i++) {
      addWaterParticles(world);
    }

    Matter.Runner.run(engine);
    Matter.Render.run(render);

    setEngine(engine);
    setRenderM(render);
    setWorld(world);

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

  useEffect(() => {
    if (world) {
      // Update temperature and pH-related logic here
    }
  }, [temp, ph, world]);

  const addWaterParticles = (world) => {
    let x = Math.floor(Math.random() * canvasRef.current.width);
    if (x <= 10) {
      x = 11;
    }
    if (x >= canvasRef.current.width - 10) {
      x = canvasRef.current.width - 11;
    }
    let y = Math.floor(Math.random() * canvasRef.current.height);
    if (y <= 10) {
      y = 11;
    }
    if (y >= canvasRef.current.height - 10) {
      y = canvasRef.current.height - 11;
    }
    const particle = Matter.Bodies.circle(x, y, 5, {
      restitution: 1,
      friction: 0,
      frictionAir: 0,
    });
    Matter.Body.setInertia(particle, Infinity);
    Matter.World.add(world, particle);

    const direction = Math.random() * Math.PI * 2;

    Matter.Body.setVelocity(particle, {
      x: Math.sin(direction) * 2,
      y: Math.cos(direction) * 2,
    });
  };

  return (
    <div className="waterContainer" ref={containerRef}>
      <div className="valueDisplay">
        {tempTitle} {temp} {tempUnit} {phTitle} {ph}
      </div>
      <canvas className="waterWorld" ref={canvasRef} />
    </div>
  );
};

Water.propTypes = {
  tempTitle: PropTypes.string,
  startTemp: PropTypes.number,
  tempUnit: PropTypes.string,
  phTitle: PropTypes.string,
  startPh: PropTypes.number,
};

export default Water;
