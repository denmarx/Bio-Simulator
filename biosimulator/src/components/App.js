import React from 'react';
import './App.css';
import Slider from '../components/Slider';
import Water from '../components/Water';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.waterRef = React.createRef();
  }

  state = {};
  //waterSliderRef = useRef();

  handleWaterSlider = (e) => {
    console.log(e);
    this.waterRef.current.setState({ temp: e });
  };

  render() {
    return (
      <div className="bosstainer">
        <div className="uiContainer">
          <button className="createEnzymeButton">Create Enzyme</button>
          <div>
            <Slider
              name="waterSlider"
              min={-50}
              max={50}
              startValue={20}
              changeHandler={this.handleWaterSlider}
            />
          </div>
        </div>
        <Water startTemp={20} ref={this.waterRef} />
      </div>
    );
  }
}
