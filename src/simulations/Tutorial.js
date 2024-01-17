import React from 'react';

function Tutorial({ onClose }) {
  return (
    <div>
      <p>This is a short tutorial on how to use the stomach simulation...</p>
      <button onClick={onClose}>Close Tutorial</button>
    </div>
  );
}

export default Tutorial;
