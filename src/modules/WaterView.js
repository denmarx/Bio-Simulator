class WaterView {
  constructor(gameview) {
    this.view = document.createElement('div');
    this.view.setAttribute('id', 'waterContainer');
    gameview.view.appendChild(this.view);
  }
}
export { WaterView };
