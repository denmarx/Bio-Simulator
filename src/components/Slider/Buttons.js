import React from 'react';

// Slider is arrow function which takes one object with properties
const Buttons = ({ onNutrientAdd, onEnzymeAdd }) => {
  return (
    <>
      <button id='carbohydrates' onClick={() => onNutrientAdd('carbohydrates')}>
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
      <button id='protease' className='button' onClick={() => onEnzymeAdd('protease', 'proteins')}>
        Add Protease
      </button>
      <button id='lipase' className='button' onClick={() => onEnzymeAdd('lipase', 'lipids')}>
        Add Lipase
      </button>
    </>
  );
};

export default Buttons;
