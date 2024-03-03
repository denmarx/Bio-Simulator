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
  const desiredWidth = 1000;
  const desiredHeight = 800;

  // const handleStart = () => {
  //   setShowSimulation(true);
  //   setShowTutorial(true);
  //   setShowSimulationInfo(true);
  // };

  return (
    <div className='app-container'>
      <h1>Enzymatic Digestion Simulation</h1>
      <StomachSimulation canvasRef={canvasRef} desiredWidth={desiredWidth} desiredHeight={desiredHeight} />
      <p className='version-number'>V1.0.0</p>
      <div className='icon-credits'>
        Icons created by{' '}
        <a href='https://www.flaticon.com/de/autoren/freepik' title='Freepik'>
          {' '}
          Freepik{' '}
        </a>{' '}
        from{' '}
        <a href='https://www.flaticon.com/de/' title='Flaticon'>
          www.flaticon.com
        </a>
      </div>
    </div>
  );
}
