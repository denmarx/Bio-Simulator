import React from 'react';
import { useState } from 'react';

// Slider is arrow function which takes one object with properties
const Slider = ({ label, min, max, value, onChange }) => {
  const handleChange = (e) => {
    const newValue = parseFloat(e.target.value);
    onChange(newValue);
  };

  return (
    <div className='slider'>
      <div className='row'>
        <label>{label}: </label>
        <span>{value} </span>
      </div>
      <input type='range' min={min} max={max} step={1} value={value} onChange={handleChange} />
    </div>
  );
};

export default Slider;
