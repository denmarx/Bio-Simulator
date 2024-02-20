import React from 'react';

const Legend = ({ showCarbohydrates, showProteins, showLipids }) => {
  // Calculate vertices
  const vertices = [];
  const x = 50; // Example x coordinate
  const y = 50; // Example y coordinate
  const sideLength = 15; // Example side length
  for (let i = 0; i < 6; i++) {
    const angle = (Math.PI / 3) * i;
    const vertexX = x + sideLength * Math.cos(angle);
    const vertexY = y + sideLength * Math.sin(angle);
    vertices.push({ x: vertexX, y: vertexY });
  }

  // CSS styles for the hexagon
  const hexagonStyle = {
    position: 'relative',
    width: `${sideLength * 2}px`, // Twice the side length for the width
    height: `${sideLength * Math.sqrt(3)}px`, // Height of an equilateral triangle (sqrt(3) * side length)
    backgroundColor: 'orange',
    clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
    margin: '0 0 0 0.5em',
  };
  return (
    <div className='legend-container'>
      <h2> Molecules</h2>
      {/* Render the particle */}
      <div className='legend-div'>
        <div className='legend-water-particle'></div>
        <p>
          Water molecules are vital for dissolving substances and participating in key chemical reactions, crucial for
          life and ecosystems.
        </p>
      </div>
      <div className='legend-div'>
        <div className='legend-proton-particle'></div>
        <p>
          Protons dictate a solution's pH, with higher concentrations leading to lower pH values, signifying increased
          acidity. All enzymes have an optimum pH range.
        </p>
      </div>
      {showCarbohydrates && (
        <div className='legend-div'>
          <div className='legend-carb-particle' style={hexagonStyle}></div>
          <p>
            Carbohydrates, depicted as hexagons due to their 6 carbon atoms, are vital energy sources composed of
            carbon, hydrogen, and oxygen. They fuel brain and muscle function and are found in grains, fruits, and
            vegetables.
          </p>
        </div>
      )}
      {showProteins && (
        <div className='legend-div'>
          <div className='legend-protein-particle'></div>
          <p>
            Proteins are essential macronutrients crucial for the structure, function, and regulation of the body's
            tissues and organs. Composed of amino acids, proteins play diverse roles in the body, including enzyme
            catalysis, immune response, and muscle contraction.
          </p>
        </div>
      )}
      {showLipids && (
        <div className='legend-div'>
          <div className='legend-lipid-particle'></div>
          <p>
            Lipids, often referred to as fats, are macronutrients vital for energy storage, insulation, and cellular
            structure. Consisting of fatty acids and glycerol, lipids serve as building blocks for cell membranes and
            play key roles in hormone synthesis and nutrient absorption.
          </p>
        </div>
      )}
    </div>
  );
};

export default Legend;
