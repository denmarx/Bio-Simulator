import React from 'react';

const Slider = ({ label, min, max, value, onChange }) => {
  const handleChange = (e) => {
    onChange(parseFloat(e.target.value));
  };

  return (
    <div className="slider">
      <label>{label}</label>
      <input
        type="range"
        min={min}
        max={max}
        step={1}
        value={value}
        onChange={handleChange}
      />
      <span>{value}</span>
    </div>
  );
};

export default Slider;
