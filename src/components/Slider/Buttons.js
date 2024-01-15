import React from 'react';

// Slider is arrow function which takes one object with properties
const Buttons = ({ onNutrientAdd }) => {
  return (
    <>
      <button id='carbohydrates' onClick={() => onNutrientAdd('carbohydrates')}>
        Add Carbohydrates
      </button>
      <button id='proteins' className='button' onClick={() => onNutrientAdd('proteins')}>
        Add Carbohydrates
      </button>
      <button id='lipids' className='button' onClick={() => onNutrientAdd('lipids')}>
        Add Carbohydrates
      </button>
    </>
  );
};

export default Buttons;
