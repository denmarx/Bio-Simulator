import * as React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import StomachSim from './src/StomachSim';
import GutsSim from './src/GutsSim';

export default function App() {
  const navigate = useNavigate();

  const handleStomachClick = () => {
    // Use the navigate function to navigate to the /src route
    navigate('/wor1');
  };

  const handleGutsClick = () => {
    // Use the navigate function to navigate to the /src route
    navigate('/wor2');
  };

  return (
    <div className="App">
      <div>
        <Routes>
          <Route path="/wor1" element={<StomachSim />} />
          <Route path="/wor2" element={<GutsSim />} />
        </Routes>
      </div>
      <div className="buttonContainer">
        <button onClick={handleStomachClick} className="button">
          Stomach
        </button>
        <button onClick={handleGutsClick} className="button">
          Guts
        </button>
      </div>
    </div>
  );
}
