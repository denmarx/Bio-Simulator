import { EnzymeController } from './EnzymeController.js';
import { EnzymeView } from './EnzymeView.js';
import { GameView } from './GameView.js';
import { WaterController, TEMPERATUR, PH } from './WaterController.js';

class GameController {
  constructor(game) {
    (this.game = game), (this.gameview = new GameView(TEMPERATUR, PH));
    this.watercontroller = new WaterController(this.gameview);
    this.bindButton(this.gameview.createEnzymeButton);
    this.bindTemperatureSlider();
  }
  bindButton(button) {
    button.addEventListener('click', (e) =>
      ((parent) => {
        const enzymeController = new EnzymeController(
          this.watercontroller.water
        );
        this.watercontroller.water.addEnzyme();
        parent.appendChild(enzymeController.view);
      })(this.watercontroller.waterview.view)
    );
  }
  bindSlider(slider, fun) {
    slider.addEventListener('change', fun);
  }
  bindTemperatureSlider() {
    // this.bindSlider(
    //   this.gameview.temperatureSlider,
    //   this.watercontroller.setTemperature(this.gameview.temperatureSlider.value)
    // );
    this.gameview.temperatureSlider.addEventListener('change', (e) =>
      ((watercontroller) => {
        watercontroller.setTemperature(this.gameview.temperatureSlider.value);
      })(this.watercontroller)
    );
  }
}

export { GameController };
