import React, { useEffect, useState } from 'react';
import Water from '../components/Water/Water';
import SimulationControls from '../components/SimulationControls/SimulationControls';
import SimulationInfo from './StomachSimulationInfo';
import spawnNutrients from '../utils/spawnNutrients';
import spawnEnzyme from '../utils/spawnEnzymes';
import '../styles/App.css';
import Matter from 'matter-js';

const StomachSimulation = () => {
  const [engine] = useState(Matter.Engine.create());
  const [world] = useState(engine.world);
  const [temp, setTemp] = useState(20);
  const [ph, setPh] = useState(7);

  useEffect(() => {
    const runner = Matter.Runner.create();
    Matter.Runner.run(runner, engine);
    engine.gravity.scale = 0; // Water particles will fly off canvas without this
  }, [engine]);

  const handleNutrientAdd = (nutrientType) => {
    spawnNutrients(nutrientType, 250, 250, world);
  };

  const handleEnzymeAdd = (enzymeType) => {
    spawnEnzyme(enzymeType, 300, 300, world);
  };

  return (
    <div className='App'>
      <div className='centered-container'>
        <Water
          world={world}
          engine={engine}
          tempTitle='Temperature'
          startTemp={temp}
          tempUnit='°C'
          phTitle='pH'
          startPh={ph}
          temperature={temp}
        />
      </div>
      <SimulationControls
        temp={temp}
        ph={ph}
        onTempChange={setTemp}
        onPhChange={setPh}
        onNutrientAdd={handleNutrientAdd}
        onEnzymeAdd={handleEnzymeAdd}
      />
      <SimulationInfo />
    </div>
  );
};

export default StomachSimulation;
