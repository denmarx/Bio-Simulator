import { useRef, useEffect } from 'react';
import Matter from 'matter-js';

export const useCanvasSetup = (engine, world, canvasRef, options = {}) => {
  // const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const categoryBorders = 0x0006;

  const drawCanvasBackground = () => {
    const ctx = canvasRef.current.getContext('2d');
    ctx.fillStyle = '#0a192f';
    ctx.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height);
  };

  // Function to set up the canvas borders
  const setupCanvasBorders = () => {
    const borderThickness = 1;
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

    drawCanvasBackground();
    setupCanvasBorders();

    render.canvas.style.background = '#0a192f';

    Matter.Render.run(render);

    return () => {
      Matter.Render.stop(render);
      Matter.Engine.clear(engine);
    };
  }, [engine, world, canvasRef, options.wireframes]);

  return { containerRef };
};
