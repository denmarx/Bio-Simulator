import Matter from 'matter-js';

const spawnEnzyme = (enzymeType, x, y, world, targetType) => {
  let enzyme;

  switch (enzymeType) {
    case 'amylase':
      enzyme = Matter.Bodies.polygon(x, y, 10, 40, {
        render: {
          fillStyle: 'orange',
        },
        isEnzyme: true,
      });
      break;
      case 'protease':
        enzyme = Matter.Bodies.trapezoid(x, y, 60, 60, 1, {
          render: {
            fillStyle: 'green',
          },
          isEnzyme: true,
        });
        break;
        case 'lipase':
          enzyme = Matter.Bodies.polygon(x, y, 10, 40, {
            render: {
              fillStyle: 'orange',
            },
            isEnzyme: true,
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
