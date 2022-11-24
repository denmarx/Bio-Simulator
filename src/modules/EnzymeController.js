import { Enzyme } from './Enzyme.js';
import { EnzymeView, ENZYMEVIEW } from './EnzymeView.js';

class EnzymeController {
  constructor(water) {
    this.view = ENZYMEVIEW;
    this.enzyme = new Enzyme(water);
  }
}

export { EnzymeController };
