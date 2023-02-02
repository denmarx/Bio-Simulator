import React from 'react';
import PropTypes from 'prop-types';
import '../ressources/styles/App.css';

export default class Ph extends React.Component {
  PropTypes = {
    startPh: PropTypes.number,
    title: PropTypes.string,
  };

  state = {
    ph: this.props.startPh,
  };

  render() {
    return (
      <div className="phContainer">
        {this.props.title}
        {this.state.ph}
      </div>
    );
  }
}
