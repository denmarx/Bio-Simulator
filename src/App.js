import React, { useState } from 'react';
import StomachSimulation from './simulations/StomachSimulation';
import Intro from './simulations/Intro';
import Tutorial from './simulations/Tutorial';
import { useRef } from 'react';

export default function App() {
  const [showSimulation, setShowSimulation] = useState(false);
  const [showTutorial, setShowTutorial] = useState(false);
  const canvasRef = useRef(null);

  const handleStart = () => {
    setShowSimulation(true);
    setShowTutorial(true);
  };

  return (
    <div className='App'>
      {showSimulation ? (
        <div>
          <StomachSimulation canvasRef={canvasRef} />
          {showTutorial && (
            <div>
              <Tutorial onClose={() => setShowTutorial(false)} />
            </div>
          )}
        </div>
      ) : (
        <Intro onStart={handleStart} />
      )}
    </div>
  );
}
