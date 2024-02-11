import React from 'react';

const Feedback = ({ pH, temp, enzymes, tempRanges, pHRanges }) => {
  const uniqueEnzymeTypes = Array.from(new Set(enzymes.map((en) => en.enzymeType)));

  const checkOptimization = (enzymeType) => {
    const tempRange = tempRanges[enzymeType];
    const pHRange = pHRanges[enzymeType];

    if (!tempRange || !pHRange) return 'Invalid enzyme type';

    // Check temperature conditions
    const tempStatus =
      temp >= tempRange.min && temp <= tempRange.med
        ? 'non-optimal'
        : temp >= tempRange.med && temp <= tempRange.max
        ? 'good'
        : temp === tempRange.opt
        ? 'optimal'
        : 'denaturation';

    // Check pH conditions
    const pHStatus =
      enzymeType === 'lipase'
        ? pH >= pHRange.min && pH < pHRange.med
          ? 'denaturation'
          : pH >= pHRange.med && pH < pHRange.max
          ? 'non-optimal'
          : pH >= pHRange.max
          ? 'optimal'
          : 'denaturation'
        : pH >= pHRange.min && pH < pHRange.med
        ? 'optimal'
        : pH >= pHRange.med && pH < pHRange.max
        ? 'non-optimal'
        : pH >= pHRange.max
        ? 'denaturation'
        : 'denaturation';

    return {
      temp: tempStatus,
      pH: pHStatus,
    };
  };

  return (
    <div className='feedback'>
      <h2>Feedback</h2>
      {/* Render feedback for each unique enzyme type */}
      {uniqueEnzymeTypes.map((enzymeType, index) => {
        const optimization = checkOptimization(enzymeType);
        return (
          <div key={index}>
            <p>{enzymeType}:</p>
            <p>Temperature: {optimization.temp}</p>
            <p>pH: {optimization.pH}</p>
          </div>
        );
      })}
    </div>
  );
};

export default Feedback;
