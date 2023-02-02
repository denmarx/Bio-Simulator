import React from 'react';
import './ressources/styles/App.css';
import Slider from './src/Slider';
import Water from './src/Water';
import Ph from './src/Ph';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.waterRef = React.createRef();
    this.phRef = React.createRef();
  }

  // state = {};
  //waterSliderRef = useRef();

  handleWaterSlider = (e) => {
    console.log(e);
    this.waterRef.current.setState({ temp: e });
  };

  handlePhSlider = (e) => {
    console.log(e);
    this.waterRef.current.setState({ ph: e });
  };

  enzymeBtnClicked = () => {
    this.waterRef.current.addEnzyme();
    console.log(this.waterRef.current.state.enzymes);
    // this.waterRef.current.setState({enzymes: this.waterRef.state.enzymes})
  };

  render() {
    return (
      <div>
        <div className="bosstainer">
          <div className="uiContainer">
            <button
              className="createEnzymeButton"
              onClick={this.enzymeBtnClicked}
            >
              Create Enzyme
            </button>
            <Slider
              name="tempSlider"
              min={-51}
              max={51}
              startValue={20}
              changeHandler={this.handleWaterSlider}
              desc="Temperature"
            />
            <Slider
              name="phSlider"
              min={-1}
              max={15}
              startValue={7}
              changeHandler={this.handlePhSlider}
              desc="pH"
            />
          </div>
          <Water
            tempTitle="Temperature: "
            startTemp={20}
            ref={this.waterRef}
            tempUnit="°C"
            phTitle="pH: "
            startPh={7}
          />
        </div>
      </div>
    );
  }
}
