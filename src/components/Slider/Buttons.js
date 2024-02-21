import React from 'react';

// Slider is arrow function which takes one object with properties
const Buttons = ({ onNutrientAdd, onEnzymeAdd }) => {
  return (
    <div className='button-controls'>
      <button id='carbohydrates' className='button' onClick={() => onNutrientAdd('carbohydrates')}>
        Add Carbohydrates
      </button>
      <button id='proteins' className='button' onClick={() => onNutrientAdd('proteins')}>
        Add Proteins
      </button>
      <button id='lipids' className='button' onClick={() => onNutrientAdd('lipids')}>
        Add Lipids
      </button>
      <button id='amylase' className='button' onClick={() => onEnzymeAdd('amylase', 'carbohydrates')}>
        Add Amylase
      </button>
      <button id='pepsin' className='button' onClick={() => onEnzymeAdd('pepsin', 'proteins')}>
        Add Pepsin
      </button>
      <button id='lipase' className='button' onClick={() => onEnzymeAdd('lipase', 'lipids')}>
        Add Lipase
      </button>
    </div>
  );
};

export default Buttons;
