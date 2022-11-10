import { WaterView } from './WaterView.js';

class GameView {
  constructor() {
    this.view = document.createElement('div');
    this.view.setAttribute('id', 'container');
    document.body.appendChild(this.view);
    this.createEnzymeButton = document.createElement('button');
    this.createEnzymeButton.setAttribute('id', 'createEnzymeButton');
    this.createEnzymeButton.textContent = 'Create Enzyme';
    this.createUI();
  }
  createUI() {
    this.ui = document.createElement('div');
    this.ui.setAttribute('id', 'uiContainer');
    this.view.appendChild(this.ui);
    this.ui.appendChild(this.createEnzymeButton);
  }
}

export { GameView };
