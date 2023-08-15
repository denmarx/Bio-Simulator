import React, { useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import '../ressources/styles/App.css';
import Matter from 'matter-js';
import Slider from './Slider';
import Water from './Water';

const App = () => {
  const canvasRef = useRef(null);
  const [temp, setTemp] = useState(20);
  const [ph, setPh] = useState(7);

  const handleWaterSlider = (value) => {
    setTemp(value);
  };

  const handlePhSlider = (value) => {
    setPh(value);
  };

  useEffect(() => {
    const engine = Matter.Engine.create();
    const world = engine.world;
    engine.gravity.scale = 0;

    const render = Matter.Render.create({
      canvas: canvasRef.current,
      engine: engine,
      options: {
        width: 800,
        height: 600,
        wireframes: false,
      },
    });

    const ground = Matter.Bodies.rectangle(400, 600, 800, 40, {
      isStatic: true,
    });
    Matter.World.add(world, ground);

    Matter.Runner.run(engine);
    Matter.Render.run(render);

    return () => {
      Matter.Render.stop(render);
      Matter.Engine.clear(engine);
    };
  }, []);

  return (
    <div className="App">
      <div className="centered-container">
        <div className="canvas-container">
          <Water
            tempTitle="Temperature"
            startTemp={temp}
            tempUnit="°C"
            phTitle="pH"
            startPh={ph}
          />
        </div>
        <div className="controls-container">
          <Slider
            label="Temperature"
            min={-51}
            max={51}
            value={temp}
            onChange={handleWaterSlider}
          />
          <Slider
            label="pH"
            min={-1}
            max={15}
            value={ph}
            onChange={handlePhSlider}
          />
          <button className="button">Create Enzyme</button>
        </div>
      </div>
    </div>
  );
};

export default App;
