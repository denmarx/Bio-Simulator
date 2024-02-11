import Matter from 'matter-js';
import { useEffect } from 'react';

const useEnzymes = (enzymes, nutrients, pH, temp, tempRanges, pHRanges) => {
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

  useEffect(() => {
    const updateEnzymes = () => {
      enzymes.forEach((enzyme) => {
        const targetNutrient = findNearestNutrient(enzyme);
        if (targetNutrient) {
          const tempRange = tempRanges[enzyme.enzymeType];
          const pHRange = pHRanges[enzyme.enzymeType];

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
            enzyme.enzymeType === 'lipase'
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

          // Adjust enzyme speed based on temperature and pH
          let enzymeSpeed = 0; // Default to stopped
          if (tempStatus === 'optimal' && pHStatus === 'optimal') {
            enzymeSpeed = 1.5; // Full speed
          } else if (
            (tempStatus === 'good' || tempStatus === 'non-optimal') &&
            (pHStatus === 'optimal' || pHStatus === 'non-optimal')
          ) {
            enzymeSpeed = 0.5; // Half speed
          } else if (tempStatus === 'optimal' && pHStatus === 'non-optimal') {
            enzymeSpeed = 0.5;
          } else if (tempStatus === 'denaturation' || pHStatus === 'denaturation') {
            enzymeSpeed = 0;
          }
          // Apply force based on enzyme speed
          seekTarget(enzyme, targetNutrient, enzymeSpeed * 0.005);
        } else {
          // Stop enzyme if no target nutrient
          // Add implementation here if necessary
        }
      });
    };

    const interval = setInterval(() => {
      updateEnzymes();
    }, 100);
    return () => clearInterval(interval);
  }, [enzymes, nutrients, pH, temp, tempRanges, pHRanges]);
};

export default useEnzymes;
