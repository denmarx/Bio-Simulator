import React, { useEffect, useState } from 'react';
import Water from './Water';
import Slider from './Slider';
import spawnNutrients from './NutrientsUtils';
import '../ressources/styles/App.css';
import Matter from 'matter-js';

const StomachSim = () => {
  const [engine] = useState(Matter.Engine.create());
  const [world] = useState(engine.world);
  const [temp, setTemp] = useState(20);
  const [ph, setPh] = useState(7);

  const handleWaterSlider = (value) => {
    setTemp(value);
  };

  const handlePhSlider = (value) => {
    setPh(value);
  };

  const handleNutrientButtonClick = (nutrientType) => () => {
    spawnNutrients(nutrientType, 100, 100, world);
  };

  useEffect(() => {
    const runner = Matter.Runner.create();
    Matter.Runner.run(runner, engine);
    engine.gravity.scale = 0;

    return () => {
      Matter.Runner.stop(runner);
      Matter.Engine.clear(engine);
    };
  }, [engine]);

  return (
    <div className="App">
      <div className="centered-container">
        <div className="canvas-container">
          <Water
            world={world}
            engine={engine}
            tempTitle="Temperature"
            startTemp={temp}
            tempUnit="°C"
            phTitle="pH"
            startPh={ph}
            temperature={temp}
          />
        </div>
      </div>
      <div className="side-container">
        <div className="text-container">
          <p>
            You are in the stomach. <br></br> In order to learn about enzymes in
            digestion, <br></br>select parameters which correspond to<br></br>{' '}
            this environment. Then add nutrients by<br></br> clicking on the
            button and pay attention to which <br></br> nutrients are digested.
          </p>
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
          <button
            className="button"
            onClick={handleNutrientButtonClick('carbohydrates')}
          >
            Add Carbohydrates
          </button>
          <button
            className="button"
            onClick={handleNutrientButtonClick('proteins')}
          >
            Add Proteins
          </button>
          <button
            className="button"
            onClick={handleNutrientButtonClick('lipids')}
          >
            Add Lipids
          </button>
          <button className="button" onClick={alert}>
            Create Enzyme
          </button>
        </div>
        <div className="text-container">
          <p>Feedback Text</p>
        </div>
      </div>
    </div>
  );
};

export default StomachSim;
