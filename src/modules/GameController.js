import { GameView } from './GameView.js';
import { WaterController } from './WaterController.js';

class GameController {
  constructor(game) {
    (this.game = game), (this.gameview = new GameView());
    this.watercontroller = new WaterController(this.gameview);
  }
}

export { GameController };
