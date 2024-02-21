import React, { useState } from 'react';
import StomachSimulation from './simulations/StomachSimulation';
import Intro from './simulations/Intro';
import Tutorial from './simulations/Tutorial';
import { useRef } from 'react';
import SimulationInfo from './simulations/StomachSimulationInfo';

export default function App() {
  // const [showSimulation, setShowSimulation] = useState(false);
  // const [showTutorial, setShowTutorial] = useState(false);
  // const [showSimulationInfo, setShowSimulationInfo] = useState(false);
  const canvasRef = useRef(null);

  // const handleStart = () => {
  //   setShowSimulation(true);
  //   setShowTutorial(true);
  //   setShowSimulationInfo(true);
  // };

  return (
    <div className='app-container'>
      <h1>Digestive Enzyme Regulation Virtual Lab</h1>
      <StomachSimulation canvasRef={canvasRef} />
      <p className='version-number'>V1.0.0</p>
    </div>
  );
}
