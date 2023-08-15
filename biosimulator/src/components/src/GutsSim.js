import React, { useState } from 'react';
import Water from './Water';
import Slider from './Slider';
import '../ressources/styles/App.css';

const GutsSim = () => {
  // This is array destructuring. It's used to assign values from an array to individual variables
  //  useState to introduce state into a functional component
  const [temp, setTemp] = useState(20);
  const [ph, setPh] = useState(7);

  const handleWaterSlider = (value) => {
    setTemp(value);
  };

  const handlePhSlider = (value) => {
    setPh(value);
  };

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

export default GutsSim;
