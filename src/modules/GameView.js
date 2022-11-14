import { WaterView } from './WaterView.js';

class GameView {
  constructor() {
    this.view = document.createElement('div');
    this.view.setAttribute('id', 'container');
    document.body.appendChild(this.view);
    this.createUI();
  }
  createUI() {
    this.ui = document.createElement('div');
    this.ui.setAttribute('id', 'uiContainer');
    this.view.appendChild(this.ui);
    this.createEnzymeButton = this.createButton(
      'createEnzymeButton',
      'Create Enzyme',
      this.ui
    );
  }
  createButton(buttonID, buttonText, parent) {
    const button = document.createElement('button');
    button.setAttribute('id', buttonID);
    button.textContent = buttonText;
    parent.appendChild(button);

    return button;
  }
}

export { GameView };
