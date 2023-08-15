import React from 'react';

class LoadingScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedEnvironment: null,
    };
  }

  // Function to handle the selection of an environment
  handleEnvironmentSelection = (env) => {
    this.setState({ selectedEnvironment: env });
    this.props.onEnvironmentSelected(env); // Callback to inform parent component
  };

  render() {
    // If an environment has been selected, do not render the loading screen
    if (this.state.selectedEnvironment !== null) {
      return null;
    }

    return (
      <div style={{ textAlign: 'center', marginTop: '20%' }}>
        <h1>Loading...</h1>
        <p>Please select an environment to continue:</p>
        <button
          onClick={() => this.handleEnvironmentSelection('Environment 1')}
        >
          Environment 1
        </button>
        <button
          onClick={() => this.handleEnvironmentSelection('Environment 2')}
        >
          Environment 2
        </button>
      </div>
    );
  }
}

export default LoadingScreen;
