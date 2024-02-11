import React from 'react';
import Slider from '../Slider/Slider';
import Buttons from '../Slider/Buttons';
import Feedback from '../Feedback/Feedback';

const SimulationControls = ({ temp, pH, enzymes, onTempChange, onpHChange, onNutrientAdd, onEnzymeAdd, tempRanges, pHRanges  }) => {
  return (
    <div className='controls-container'>
      <Slider label='Temperature' min={-5} max={37} value={temp} onChange={onTempChange} />
      <Slider label='pH' min={0} max={15} value={pH} onChange={onpHChange} />
      <Buttons onNutrientAdd={onNutrientAdd} onEnzymeAdd={onEnzymeAdd} />
      <Feedback pH={pH} temp={temp} enzymes={enzymes} tempRanges={tempRanges} pHRanges={pHRanges} />

    </div>
  );
};

export default SimulationControls;
