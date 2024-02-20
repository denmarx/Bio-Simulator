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
      <div>
        <h2 className='heading'>Enzyme Monitor</h2>
      </div>
      {/* Render feedback for each unique enzyme type */}
      {uniqueEnzymeTypes.map((enzymeType, index) => {
        const optimization = checkOptimization(enzymeType);
        const capitalizedEnzymeType = enzymeType.charAt(0).toUpperCase() + enzymeType.slice(1);
        let enzymeDescription = '';
        if (enzymeType === 'protease') {
          enzymeDescription =
            'Pepsin is a stomach enzyme that breaks down proteins into smaller peptides. It works best in the highly acidic environment of the stomach, with an optimum pH range of around 1.5 to 2.0.';
        }

        return (
          <div key={index} className={enzymeType}>
            <p>{capitalizedEnzymeType} </p>
            <p>Temperature: {optimization.temp}</p>
            <p>pH: {optimization.pH}</p>
            <p> {enzymeDescription}</p>
          </div>
        );
      })}
    </div>
  );
};

export default Feedback;
