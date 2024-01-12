import spawnNutrients from "./spawnNutrients"

const generateMultipleNutrients = (nutrientType, world, count) => {
  const nutrients = [];
  for (let i = 0; i < count; i++) {
    
    let x = Math.floor(Math.random()*800);
    let y = Math.floor(Math.random()*600);
    
    const nutrient = spawnNutrients(nutrientType, x, y, world);
    nutrients.push(nutrient);
  }
  return nutrients;
};

export default generateMultipleNutrients;
