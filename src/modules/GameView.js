import { WaterView } from './WaterView.js';

class GameView {
  constructor(waterTemperature, pH) {
    this.view = document.createElement('div');
    this.view.setAttribute('id', 'container');
    document.body.appendChild(this.view);
    this.createUI(waterTemperature);
  }
  createUI(waterTemperature) {
    this.ui = document.createElement('div');
    this.ui.setAttribute('id', 'uiContainer');
    this.view.appendChild(this.ui);
    this.createEnzymeButton = this.createButton(
      'createEnzymeButton',
      'Create Enzyme',
      this.ui
    );
    this.temperatureSlider = this.createWaterSlider(waterTemperature);
  }
  createButton(buttonID, buttonText, parent) {
    const button = document.createElement('button');
    button.setAttribute('id', buttonID);
    button.textContent = buttonText;
    parent.appendChild(button);

    return button;
  }
  createSlider(sliderID, parent, min, max, value) {
    const sliderContainer = document.createElement('div');
    sliderContainer.setAttribute('id', sliderID);
    parent.appendChild(sliderContainer);
    const SliderInput = document.createElement('input');
    SliderInput.setAttribute('min', min);
    SliderInput.setAttribute('type', 'range');
    SliderInput.setAttribute('max', max);
    SliderInput.setAttribute('value', value);
    sliderContainer.appendChild(SliderInput);
    return SliderInput;
  }
  createWaterSlider(waterTemperature) {
    return this.createSlider('waterSlider', this.ui, -50, 50, waterTemperature);
  }
}

export { GameView };
