import React from 'react';
import './Slider.css';
import PropTypes from 'prop-types';

export default class Slider extends React.Component {
  PropTypes = {
    name: PropTypes.string,
    min: PropTypes.number,
    startValue: PropTypes.number,
    max: PropTypes.number,
    changeHandler: PropTypes.func,
    desc: PropTypes.string,
  };

  state = {
    value: this.props.startValue,
  };

  handleChange = (e) => {
    this.setState({ value: e.target._valueTracker.getValue() });
    this.props.changeHandler(this.state.value);
  };

  render() {
    return (
      <div className={this.props.name}>
        <input
          type="range"
          min={this.props.min}
          value={this.state.value}
          max={this.props.max}
          onChange={this.handleChange}
        ></input>
        <div> {this.props.desc}</div>
      </div>
    );
  }
}
