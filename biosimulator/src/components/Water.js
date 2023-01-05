import React from 'react';
import PropTypes from 'prop-types';
import './App.css';

export default class Water extends React.Component {
  PropTypes = {
    startTemp: PropTypes.number,
    title: PropTypes.string,
    unit: PropTypes.string,
  };

  state = {
    temp: this.props.startTemp,
  };

  render() {
    return (
      <div className="waterContainer">
        {this.props.title} {this.state.temp} {this.props.unit}
      </div>
    );
  }
}
