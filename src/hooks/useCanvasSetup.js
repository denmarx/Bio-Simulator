import { useRef, useEffect } from 'react';
import Matter from 'matter-js';

export const useCanvasSetup = (engine, world, canvasRef, options = {}) => {
  // const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const categoryBorders = 0x0006;

  // Function to set up the canvas borders
  const setupCanvasBorders = () => {
    const borderThickness = 40;

    const borders = [
      // Ground
      Matter.Bodies.rectangle(
        canvasRef.current.width / 2,
        canvasRef.current.height - 10,
        canvasRef.current.width,
        borderThickness,
        {
          collisionFilter: {
            category: categoryBorders,
          },
          isStatic: true,
        }
      ),
      // Upper Border
      Matter.Bodies.rectangle(canvasRef.current.width / 2, 0, canvasRef.current.width, borderThickness, {
        collisionFilter: {
          category: categoryBorders,
        },
        isStatic: true,
      }),
      // Left Border
      Matter.Bodies.rectangle(10, canvasRef.current.height / 2, borderThickness, canvasRef.current.height, {
        collisionFilter: {
          category: categoryBorders,
        },
        isStatic: true,
      }),
      // Right Border
      Matter.Bodies.rectangle(
        canvasRef.current.width - 10,
        canvasRef.current.height / 2,
        borderThickness,
        canvasRef.current.height,
        {
          collisionFilter: {
            category: categoryBorders,
          },
          isStatic: true,
        }
      ),
    ];

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
