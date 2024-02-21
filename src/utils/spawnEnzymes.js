// spawnEnzyme.js

import Matter from 'matter-js';

const spawnEnzyme = (enzymeType, x, y, world, targetType) => {
  let enzyme;
  const categoryOther = 0x0004;

  const starVertices = [
    { x: 0, y: -50 }, // Top point
    { x: 14, y: -20 }, // Right top point
    { x: 50, y: -10 }, // Right middle point
    { x: 20, y: 20 }, // Right bottom point
    { x: 30, y: 50 }, // Bottom point
    { x: 0, y: 30 }, // Left bottom point
    { x: -30, y: 50 }, // Left point
    { x: -20, y: 20 }, // Left top point
    { x: -50, y: -10 }, // Left middle point
    { x: -14, y: -20 }, // Left top point
  ];

  switch (enzymeType) {
    case 'amylase':
      enzyme = Matter.Bodies.polygon(x, y, 10, 40, {
        collisionFilter: {
          category: categoryOther,
          mask: categoryOther,
        },
        render: {
          fillStyle: 'violet',
        },
        isEnzyme: true,
        enzymeType: 'amylase',
        // preferredpH: [-1, 0, 1, 2, 3, 4, 5, 6, 7],
      });
      break;
    case 'pepsin':
      enzyme = Matter.Bodies.trapezoid(x, y, 60, 60, 1, {
        collisionFilter: {
          category: categoryOther,
          mask: categoryOther,
        },
        render: {
          fillStyle: 'violet',
        },
        isEnzyme: true,
        enzymeType: 'pepsin',
        // preferredpH: [-1, 0, 1, 2, 3, 4, 5, 6, 7],
      });

      break;
    case 'lipase':
      // enzyme = Matter.Bodies.polygon(x, y, 10, 40, {
      enzyme = Matter.Bodies.fromVertices(x, y, [starVertices], {
        collisionFilter: {
          category: categoryOther,
          mask: categoryOther,
        },
        render: {
          fillStyle: 'violet',
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
