import Matter from 'matter-js';

const spawnEnzyme = (enzymeType, x, y, world) => {
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
  Matter.World.add(world, enzyme);
};

export default spawnEnzyme;
