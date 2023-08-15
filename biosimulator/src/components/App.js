import * as React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from 'react-router-dom';
import Environment from './src/Environment';

export default function App() {
  const navigate = useNavigate();

  const handleStomachClick = () => {
    // Use the navigate function to navigate to the /src route
    navigate('/src');
  };

  return (
    <div className="App">
      <div>
        <Routes>
          <Route path="/src" element={<Environment />} />
        </Routes>
      </div>
      <div className="buttonContainer">
        <button onClick={handleStomachClick} className="button">
          Stomach
        </button>
        <button className="button">Guts</button>
      </div>
    </div>
  );
}
