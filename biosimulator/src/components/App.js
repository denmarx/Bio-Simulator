import React from 'react';
import './App.css';
import Slider from '../components/Slider';
import Water from '../components/Water';
import Ph from '../components/Ph';

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
    this.phRef.current.setState({ ph: e });
  };

  render() {
    return (
      <div className="bosstainer">
        <div className="uiContainer">
          <button className="createEnzymeButton">Create Enzyme</button>
          <Slider
            name="tempSlider"
            min={-50}
            max={50}
            startValue={20}
            changeHandler={this.handleWaterSlider}
            desc="Temperature"
          />
          <Slider
            name="phSlider"
            min={0}
            max={14}
            startValue={7}
            changeHandler={this.handlePhSlider}
            desc="pH"
          />
        </div>
        <Water
          title="Temperature: "
          startTemp={20}
          ref={this.waterRef}
          unit="°C"
        />
        <Ph title="pH: " startPh={7} ref={this.phRef} />
      </div>
    );
  }
}
