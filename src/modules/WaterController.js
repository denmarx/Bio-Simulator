import { WaterView } from './WaterView.js';

class WaterController {
  constructor(gameview) {
    this.waterview = new WaterView(gameview);
    this.water = 'waterdummy';
  }
}

export { WaterController };
