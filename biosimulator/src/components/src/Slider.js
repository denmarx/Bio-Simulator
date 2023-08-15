import React from 'react';
import PropTypes from 'prop-types';

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

Slider.propTypes = {
  label: PropTypes.string.isRequired,
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default Slider;
