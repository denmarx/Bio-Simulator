import { useEffect } from 'react';
import Matter from 'matter-js';

const useCollisionHandler = (engine, world, nutrients, setNutrients) => {
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
};
export default useCollisionHandler;
