import React from 'react';
import PropTypes from 'prop-types';
import './App.css';

export default class Water extends React.Component {
  PropTypes = {
    startTemp: PropTypes.number,
  };

  state = {
    temp: this.props.startTemp,
  };

  changeState() {}

  render() {
    return <div className="waterContainer">{this.state.temp}</div>;
  }
}
