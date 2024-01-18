import React, { useEffect, useState } from 'react';
import Water from '../components/Water/Water';
import SimulationControls from '../components/SimulationControls/SimulationControls';
import SimulationInfo from './StomachSimulationInfo';
import spawnEnzyme from '../utils/spawnEnzymes';
import '../styles/App.css';
import Matter from 'matter-js';
import generateMultipleNutrients from '../utils/generateMultipleNutrients';

const StomachSimulation = () => {
  const [engine] = useState(Matter.Engine.create());
  const [world] = useState(engine.world);
  const [temp, setTemp] = useState(20);
  const [pH, setpH] = useState(7);
  const [nutrients, setNutrients] = useState([]);
  const [enzymes, setEnzymes] = useState([]);

  useEffect(() => {
    const runner = Matter.Runner.create();
    Matter.Runner.run(runner, engine);
    engine.gravity.scale = 0; // Water particles will fly off canvas without this
  }, [engine]);

  const handleNutrientAdd = (nutrientType) => {
    //  const newNutrient = spawnNutrients(nutrientType, Math.floor(Math.random()*800), Math.floor(Math.random()*600), world);
    const newNutrient = generateMultipleNutrients(nutrientType, world, 15);

    setNutrients((prev) => [...prev, ...newNutrient]);
  };

  const handleEnzymeAdd = (enzymeType, targetType) => {
    const newEnzyme = spawnEnzyme(enzymeType, 300, 300, world, targetType);
    setEnzymes((prev) => [...prev, newEnzyme]);
  };

  const seekTarget = (enzyme, target, forceMagnitude = 0.005) => {
    const direction = Matter.Vector.sub(target.position, enzyme.position);
    const force = Matter.Vector.mult(Matter.Vector.normalise(direction), forceMagnitude);
    Matter.Body.applyForce(enzyme, enzyme.position, force);
  };

  const findNearestNutrient = (enzyme) => {
    let nearestNutrient = null;
    let minDistance = Infinity;

    nutrients.forEach((nutrient) => {
      if (nutrient.nutrientType === enzyme.targetType) {
        const distance = Matter.Vector.magnitude(Matter.Vector.sub(enzyme.position, nutrient.position));
        if (distance < minDistance) {
          minDistance = distance;
          nearestNutrient = nutrient;
        }
      }
    });

    return nearestNutrient;
  };

  const updateEnzymes = () => {
    enzymes.forEach((enzyme) => {
      const targetNutrient = findNearestNutrient(enzyme);
      if (targetNutrient) {
        seekTarget(enzyme, targetNutrient);
      }
    });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      updateEnzymes();
    }, 100);
    return () => clearInterval(interval);
  }, [enzymes, nutrients]);

  useEffect(() => {
    const collisionHandler = (event) => {
      event.pairs.forEach((pair) => {
        const { bodyA, bodyB } = pair;
        // Check if one of the bodies is an enzyme and the other is its target nutrient
        if (bodyA.isEnzyme && bodyB.nutrientType === bodyA.targetType) {
          // Remove the nutrient
          Matter.World.remove(world, bodyB);
          // Remove the nutrient from the nutrients array
          setNutrients((prev) => prev.filter((nutrient) => nutrient !== bodyB));
        }
        // Similar check if bodyB is the enzyme and bodyA is the nutrient
        else if (bodyB.isEnzyme && bodyA.nutrientType === bodyB.targetType) {
          Matter.World.remove(world, bodyA);
          setNutrients((prev) => prev.filter((nutrient) => nutrient !== bodyA));
        }
      });
    };

    Matter.Events.on(engine, 'collisionStart', collisionHandler);

    return () => {
      Matter.Events.off(engine, 'collisionStart', collisionHandler);
    };
  }, [engine, world, nutrients]);

  return (
    <div className='App'>
      <div className='centered-container'>
        <Water
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
