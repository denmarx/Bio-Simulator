import React from 'react';
import useWaterParticles from '../../hooks/WaterParticles';
import useProtons from '../../hooks/Protons';
import { useCanvasSetup } from '../../hooks/useCanvasSetup';
import '../../styles/App.css';
import '../../index.css';

// Water engine
const Water = ({ canvasRef, world, engine, tempTitle, startTemp, tempUnit, pHTitle, startpH, temperature, pH }) => {
  const { containerRef } = useCanvasSetup(engine, world, canvasRef);
  useWaterParticles(world, canvasRef, temperature);
  useProtons(world, canvasRef, temperature, pH);

  return (
    <div className='waterContainer' ref={containerRef}>
      {/* <div className='valueDisplay'>
        {tempTitle} {startTemp} {tempUnit} {pHTitle} {startpH}
      </div> */}
      <canvas className='waterWorld' ref={canvasRef} />
    </div>
  );
};

export default Water;
