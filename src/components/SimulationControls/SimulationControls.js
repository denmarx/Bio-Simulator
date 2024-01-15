import React from 'react';
import Slider from '../Slider/Slider';
import Buttons from '../Slider/Buttons';

const SimulationControls = ({ temp, ph, onTempChange, onPhChange, onNutrientAdd, onEnzymeAdd }) => {
  return (
    <div className='controls-container'>
      <Slider label='Temperature' min={-5} max={37} value={temp} onChange={onTempChange} />
      <Slider label='pH' min={-1} max={15} value={ph} onChange={onPhChange} />
      <Buttons onNutrientAdd={onNutrientAdd} />
      {/* <button className='button' onClick={() => onNutrientAdd('carbohydrates')}>
        Add Carbohydrates
      </button>
      <button className='button' onClick={() => onNutrientAdd('proteins')}>
        Add Proteins
      </button>
      <button className='button' onClick={() => onNutrientAdd('lipids')}>
        Add Lipids
      </button>
      <button className='button' onClick={() => onEnzymeAdd('amylase', "carbohydrates")}>
        Create Amylase
      </button>
      <button className='button' onClick={() => onEnzymeAdd('protease', "proteins")}>
        Create Protease
      </button>
      <button className='button' onClick={() => onEnzymeAdd('lipase', "lipids")}>
        Create Lipase
      </button> */}
    </div>
  );
};

export default SimulationControls;
