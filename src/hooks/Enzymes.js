import Matter from 'matter-js';
import { useEffect } from 'react';

const useEnzymes = (enzymes, nutrients, pH) => {
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
      if (enzyme.preferredpH.includes(pH)) {
        const targetNutrient = findNearestNutrient(enzyme);
        if (targetNutrient) {
          seekTarget(enzyme, targetNutrient);
        }
      } else {
        alert('false');
        console.log(enzyme.preferredpH);
      }
    });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      updateEnzymes();
    }, 100);
    return () => clearInterval(interval);
  }, [enzymes, nutrients]);
};

export default useEnzymes;
