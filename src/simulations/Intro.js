import React from 'react';

function Intro({ onStart }) {
  return (
    <div>
      <p>Here is some information about the stomach simulation...</p>
      <button onClick={onStart}>Start Simulation</button>
    </div>
  );
}

export default Intro;
