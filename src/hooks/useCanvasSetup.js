import { useRef, useEffect } from 'react';
import Matter from 'matter-js';

export const useCanvasSetup = (engine, world, canvasRef, desiredWidth, desiredHeight, options = {}) => {
  // const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const categoryBorders = 0x0006;

  // Function to set up the canvas borders
  const setupCanvasBorders = () => {
    const borderThickness = 1;
    canvasRef.current.width = desiredWidth;
    canvasRef.current.height = desiredHeight;
    const width = canvasRef.current.width;
    const height = canvasRef.current.height;

    const ground = Matter.Bodies.rectangle(width / 2, height - borderThickness / 2, width, borderThickness, {
      collisionFilter: {
        category: categoryBorders,
      },
      isStatic: true,
    });
    const ceiling = Matter.Bodies.rectangle(width / 2, borderThickness / 2, width, borderThickness, {
      collisionFilter: {
        category: categoryBorders,
      },
      isStatic: true,
    });
    const leftWall = Matter.Bodies.rectangle(borderThickness / 2, height / 2, borderThickness, height, {
      collisionFilter: {
        category: categoryBorders,
      },
      isStatic: true,
    });
    const rightWall = Matter.Bodies.rectangle(width - borderThickness / 2, height / 2, borderThickness, height, {
      collisionFilter: {
        category: categoryBorders,
      },
      isStatic: true,
    });

    const borders = [ground, ceiling, leftWall, rightWall];

    borders.forEach((body) => Matter.World.add(world, body));
  };

  useEffect(() => {
    if (!canvasRef || !canvasRef.current) {
      console.log('Canvas ref is not available in useCanvasSetup.');
      return;
    }

    const render = Matter.Render.create({
      canvas: canvasRef.current,
      // element: containerRef.current,
      engine: engine,
      options: {
        wireframes: options.wireframes || false,
      },
    });

    setupCanvasBorders();

    Matter.Render.run(render);

    return () => {
      Matter.Render.stop(render);
      Matter.Engine.clear(engine);
    };
  }, [engine, world, canvasRef, options.wireframes]);

  return { containerRef };
};
