import React from 'react';
import Feedback from '../components/Feedback/Feedback';

const SimulationInfo = ({ pH, temp, enzymes, tempRanges, pHRanges }) => {
  return (
    <div className='text-container'>
      <Feedback pH={pH} temp={temp} enzymes={enzymes} tempRanges={tempRanges} pHRanges={pHRanges} />
      {/* <p>
        You are in the stomach. In order to learn about enzymes in digestion, select parameters which correspond to this
        environment. Then add nutrients by clicking on the button and pay attention to which nutrients are digested.
      </p> */}
    </div>
  );
};

export default SimulationInfo;
