import React from 'react';
import PropTypes from 'prop-types';
import './App.css';
import Enzyme from './Enzyme';

export default class Water extends React.Component {
  PropTypes = {
    startTemp: PropTypes.number,
    title: PropTypes.string,
    unit: PropTypes.string,
  };

  state = {
    temp: this.props.startTemp,
    enzymes: [],
  };

  addEnzyme = () => {
    let newEnzymes = this.state.enzymes;
    newEnzymes.push(1);
    this.setState({ enzymes: newEnzymes });
  };

  render() {
    return (
      <>
        <div className="waterContainer">
          {this.props.title} {this.state.temp} {this.props.unit}
          {this.state.enzymes.map((x, index) => (
            <Enzyme />
          ))}
        </div>
      </>
    );
  }
}
