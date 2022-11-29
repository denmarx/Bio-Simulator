class Water {
  constructor(temp, ph) {
    this.temperatur = temp;
    this.ph = ph;
    this.enzymes = [];
  }
  /**
   *
   * @param {Enzyme} enzyme
   */
  addEnzyme(enzyme) {
    this.enzymes.push(enzyme);
  }
  setTemperature(newTemp) {
    this.temperatur = newTemp;
  }
}
export { Water };
