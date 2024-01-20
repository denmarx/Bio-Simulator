import spawnNutrients from './spawnNutrients';

const generateMultipleNutrients = (nutrientType, world, count, canvasRef) => {
  const nutrients = [];
  const borderThickness = 40;

  const nutrientSize = 40;
  for (let i = 0; i < count; i++) {
    // let x = Math.floor(Math.random()*800);
    // let y = Math.floor(Math.random()*600);
    let x = Math.floor(Math.random() * (canvasRef.current.width - borderThickness - nutrientSize)) + borderThickness;
    let y = Math.floor(Math.random() * (canvasRef.current.height - borderThickness - nutrientSize)) + borderThickness;

    const nutrient = spawnNutrients(nutrientType, x, y, world);
    nutrients.push(nutrient);
  }
  return nutrients;
};

export default generateMultipleNutrients;
