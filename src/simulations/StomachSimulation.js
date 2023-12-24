import React, { useEffect, useState } from 'react';
import Water from '../components/Water/Water';
import SimulationControls from '../components/SimulationControls/SimulationControls';
import SimulationInfo from './StomachSimulationInfo';
import spawnNutrients from '../utils/spawnNutrients';
import spawnEnzyme from '../utils/spawnEnzymes';
import '../styles/App.css';
import Matter, { use } from 'matter-js';

const StomachSimulation = () => {
  const [engine] = useState(Matter.Engine.create());
  const [world] = useState(engine.world);
  const [temp, setTemp] = useState(20);
  const [ph, setPh] = useState(7);
  const [nutrients, setNutrients] = useState([]);
  const [enzymes, setEnzymes] = useState([]);

  useEffect(() => {
    const runner = Matter.Runner.create();
    Matter.Runner.run(runner, engine);
    engine.gravity.scale = 0; // Water particles will fly off canvas without this
  }, [engine]);

  const handleNutrientAdd = (nutrientType) => {
   const newNutrient = spawnNutrients(nutrientType, 250, 250, world);
    setNutrients(prev => [...prev, newNutrient]);
  };

  const handleEnzymeAdd = (enzymeType, targetType) => {
    const newEnzyme = spawnEnzyme(enzymeType, 300, 300, world, targetType);
    setEnzymes(prev => [...prev, newEnzyme]);
  };

  const seekTarget = (enzyme, target, forceMagnitude = 0.005) => {
    const direction = Matter.Vector.sub(target.position, enzyme.position);
    const force = Matter.Vector.mult(Matter.Vector.normalise(direction), forceMagnitude);
    Matter.Body.applyForce(enzyme, enzyme.position, force);
}

  const findNearestNutrient = (enzyme) => {
    let nearestNutrient = null;
    let minDistance = Infinity;
    
    nutrients.forEach(nutrient => {
      if (nutrient.nutrientType === enzyme.targetType) {
        const distance = Matter.Vector.magnitude(Matter.Vector.sub(enzyme.position, nutrient.position));
        if (distance < minDistance) {
          minDistance = distance;
          nearestNutrient = nutrient;
        }
      }
    });

    return nearestNutrient;
  }

  const updateEnzymes = () => {
    enzymes.forEach(enzyme => {
      const targetNutrient = findNearestNutrient(enzyme);
      if (targetNutrient) {
        seekTarget(enzyme, targetNutrient);
      }
    });
  }

  useEffect (() => {
    const interval = setInterval(() => {
      updateEnzymes();
    }, 100);
    return () => clearInterval(interval);
  }, [enzymes, nutrients]);

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
