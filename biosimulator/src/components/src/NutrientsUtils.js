import Matter from 'matter-js';

const spawnNutrients = (nutrientType, x, y, world) => {
  let nutrient;

  switch (nutrientType) {
    case 'carbohydrates':
      nutrient = Matter.Bodies.polygon(x, y, 6, 20, {
        render: {
          fillStyle: 'blue',
        },
      });
      break;
    case 'proteins':
      nutrient = Matter.Bodies.circle(x, y, 20, {
        render: {
          fillStyle: 'red',
        },
      });
      break;
    case 'lipids':
      nutrient = Matter.Bodies.rectangle(x, y, 40, 20, {
        render: {
          fillStyle: 'green',
        },
      });
      break;
    default:
      break;
  }
  Matter.World.add(world, nutrient);
};

export default spawnNutrients;
