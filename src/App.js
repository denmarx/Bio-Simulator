import React, { useState } from 'react';
import StomachSimulation from './simulations/StomachSimulation';
import Intro from './simulations/Intro';
import Tutorial from './simulations/Tutorial';
import { useRef } from 'react';
import SimulationInfo from './simulations/StomachSimulationInfo';

export default function App() {
  const [showSimulation, setShowSimulation] = useState(false);
  const [showTutorial, setShowTutorial] = useState(false);
  const [showSimulationInfo, setShowSimulationInfo] = useState(false);
  const canvasRef = useRef(null);

  const handleStart = () => {
    setShowSimulation(true);
    setShowTutorial(true);
    setShowSimulationInfo(true);
  };

  return (
    <>
      {showSimulation ? (
        <div>
          <StomachSimulation canvasRef={canvasRef} />
          {showTutorial && <div>{/* <Tutorial onClose={() => setShowTutorial(false)} /> */}</div>}
        </div>
      ) : (
        <Intro onStart={handleStart} />
      )}
      {showSimulationInfo && <SimulationInfo />}
    </>
  );
}
