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
}
export { Water };
