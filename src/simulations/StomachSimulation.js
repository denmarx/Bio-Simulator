import React, { useEffect, useState } from 'react';
import Water from '../components/Water/Water';
import SimulationControls from '../components/SimulationControls/SimulationControls';
import SimulationInfo from './StomachSimulationInfo';
import spawnEnzyme from '../utils/spawnEnzymes';
import '../styles/App.css';
import Matter from 'matter-js';
import generateMultipleNutrients from '../utils/generateMultipleNutrients';
import useEnzymes from '../hooks/Enzymes';
import useCollisionHandler from '../utils/useCollisionHandler';
import useParticleVelocity from '../utils/applyVelocity';

const StomachSimulation = ({ canvasRef }) => {
  const [engine] = useState(Matter.Engine.create());
  const [world] = useState(engine.world);
  const [temp, setTemp] = useState(20);
  const [pH, setpH] = useState(7);
  const [nutrients, setNutrients] = useState([]);
  const [enzymes, setEnzymes] = useState([]);

  useEffect(() => {
    const runner = Matter.Runner.create();
    Matter.Runner.run(runner, engine);
    engine.gravity.scale = 0;
  }, [engine]);

  const handleNutrientAdd = (nutrientType) => {
    const newNutrient = generateMultipleNutrients(nutrientType, world, 15, canvasRef);
    setNutrients((prev) => [...prev, ...newNutrient]);
  };

  const handleEnzymeAdd = (enzymeType, targetType) => {
    const newEnzyme = spawnEnzyme(enzymeType, 300, 300, world, targetType);
    setEnzymes((prev) => [...prev, newEnzyme]);
  };

  useParticleVelocity(temp, nutrients);

  useEnzymes(enzymes, nutrients);

  useCollisionHandler(engine, world, nutrients, setNutrients);

  return (
    <div className='App'>
      <div className='centered-container'>
        <Water
          canvasRef={canvasRef}
          world={world}
          engine={engine}
          tempTitle='Temperature'
          startTemp={temp}
          tempUnit='°C'
          pHTitle='pH'
          startpH={pH}
          temperature={temp}
          pH={pH}
        />
      </div>
      <SimulationControls
        temp={temp}
        pH={pH}
        onTempChange={setTemp}
        onpHChange={setpH}
        onNutrientAdd={handleNutrientAdd}
        onEnzymeAdd={handleEnzymeAdd}
      />
      <SimulationInfo />
    </div>
  );
};

export default StomachSimulation;
