// spawnEnzyme.js

import Matter from 'matter-js';

const spawnEnzyme = (enzymeType, x, y, world, targetType) => {
  let enzyme;
  const categoryOther = 0x0004;

  switch (enzymeType) {
    case 'amylase':
      enzyme = Matter.Bodies.polygon(x, y, 10, 40, {
        collisionFilter: {
          category: categoryOther,
          mask: categoryOther,
        },
        render: {
          fillStyle: 'orange',
        },
        isEnzyme: true,
        enzymeType: 'amylase', 
        // preferredpH: [-1, 0, 1, 2, 3, 4, 5, 6, 7],
      });
      break;
    case 'protease':
      enzyme = Matter.Bodies.trapezoid(x, y, 60, 60, 1, {
        collisionFilter: {
          category: categoryOther,
          mask: categoryOther,
        },
        render: {
          fillStyle: 'green',
        },
        isEnzyme: true,
        enzymeType: 'protease', 
        // preferredpH: [-1, 0, 1, 2, 3, 4, 5, 6, 7],
      });

      break;
    case 'lipase':
      enzyme = Matter.Bodies.polygon(x, y, 10, 40, {
        collisionFilter: {
          category: categoryOther,
          mask: categoryOther,
        },
        render: {
          fillStyle: 'orange',
        },
        isEnzyme: true,
        enzymeType: 'lipase', // Assign enzyme type directly here
        // preferredpH: [8, 9, 10, 11, 12, 13, 14],
      });
      break;
    default:
      break;
  }

  enzyme.targetType = targetType;
  Matter.World.add(world, enzyme);
  return enzyme;
};

export default spawnEnzyme;
