import Matter from 'matter-js';

const spawnEnzyme = (enzymeType, x, y, world, targetType) => {
  let enzyme;

  switch (enzymeType) {
    case 'enzyme':
      enzyme = Matter.Bodies.polygon(x, y, 10, 40, {
        render: {
          fillStyle: 'orange',
        },
      });
      break;
    default:
      break;
  }
  enzyme.targetType = targetType;
  Matter.World.add(world, enzyme);
  console.log(enzyme)
  return enzyme;
};

export default spawnEnzyme;
