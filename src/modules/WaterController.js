import { WaterView } from './WaterView.js';
import { Water } from './Water.js';

let TEMPERATUR = 20;
let PH = 7;

class WaterController {
  constructor(gameview) {
    this.waterview = new WaterView(gameview);
    this.water = new Water(TEMPERATUR, PH);
  }
}

export { WaterController, TEMPERATUR, PH };
