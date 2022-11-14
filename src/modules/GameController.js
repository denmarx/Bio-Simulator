import { EnzymeView } from './EnzymeView.js';
import { GameView } from './GameView.js';
import { WaterController } from './WaterController.js';

class GameController {
  constructor(game) {
    (this.game = game), (this.gameview = new GameView());
    this.watercontroller = new WaterController(this.gameview);
    this.bind(this.gameview.createEnzymeButton);
  }
  bind(button) {
    button.addEventListener('click', (e) =>
      ((parent) => {
        const enzyme = new EnzymeView();
        parent.appendChild(enzyme);
      })(this.watercontroller.waterview.view)
    );
  }
}
export { GameController };
