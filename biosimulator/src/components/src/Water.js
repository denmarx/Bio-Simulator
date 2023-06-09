import React, { createRef } from 'react';
import PropTypes from 'prop-types';
import '../ressources/styles/App.css';
import '../ressources/styles/Water.css';
import Matter, { Runner, Render } from 'matter-js';
//import Scene from './Scene';

export default class Water extends React.Component {
  constructor(props) {
    super(props);
    this.canvasRef = React.createRef();
    this.containerRef = React.createRef();
    this.engine = Matter.Engine.create({});
    this.engine.gravity.scale = 0;
    this.renderM = Matter.Render.create({
      canvas: this.canvasRef.current,
      element: this.containerRef.current,
      engine: this.engine,
      options: {
        /*width: 600, height: 600, */ wireframes: false,
      },
    });
    this.world = this.engine.world;
  }

  PropTypes = {
    tempTitle: PropTypes.string,
    startTemp: PropTypes.number,
    tempUnit: PropTypes.string,
    phTitle: PropTypes.string,
    startPh: PropTypes.number,
  };

  state = {
    temp: this.props.startTemp,
    ph: this.props.startPh,
    enzymes: [],
  };

  componentDidMount() {
    // this.engine = Matter.Engine.create({ options: { gravity: 0 } });
    this.renderM = Matter.Render.create({
      canvas: this.canvasRef.current,
      element: this.containerRef.current,
      engine: this.engine,
      options: {
        /*width: 600, height: 600, */ wireframes: false,
      },
    });
    this.world = this.engine.world;
    //this.engine.gravity = 0

    var borderThickness = 40;

    var ground = Matter.Bodies.rectangle(
      this.canvasRef.current.width / 2,
      this.canvasRef.current.height - 10,
      this.renderM.canvas.width,
      borderThickness,
      { isStatic: true }
    );
    Matter.World.add(this.world, ground);

    var upperBorder = Matter.Bodies.rectangle(
      this.canvasRef.current.width / 2,
      0,
      this.renderM.canvas.width,
      borderThickness,
      { isStatic: true }
    );
    Matter.World.add(this.world, upperBorder);

    var leftBorder = Matter.Bodies.rectangle(
      10,
      this.canvasRef.current.height / 2,
      borderThickness,
      this.canvasRef.current.height,
      { isStatic: true }
    );
    Matter.World.add(this.world, leftBorder);

    var rightBorder = Matter.Bodies.rectangle(
      this.canvasRef.current.width - 10,
      this.canvasRef.current.height / 2,
      borderThickness,
      this.canvasRef.current.height,
      { isStatic: true }
    );
    Matter.World.add(this.world, rightBorder);

    for (let i = 0; i < 200; i++) {
      this.addWaterParticles();
    }

    Runner.run(this.engine);
    Render.run(this.renderM);
    //this.renderM.run()
  }

  addEnzyme = () => {
    // let newEnzymes = this.state.enzymes;
    // newEnzymes.push(1);
    // this.setState({ enzymes: newEnzymes });
    Matter.World.add(
      this.world,
      Matter.Bodies.circle(150, 50, 30, { restitution: 0.7 })
    );
    //Matter.World.remove
    //this.state.World.add(this.state.world, this.state.Bodies.circle(150, 50, 30, { restitution: 0.7 }));
  };

  addWaterParticles = () => {
    let x = Math.floor(Math.random() * this.canvasRef.current.width);
    if (x <= 10) {
      x = 11;
    }
    if (x >= this.canvasRef.current.width - 10) {
      x = this.canvasRef.current.width - 11;
    }
    let y = Math.floor(Math.random() * this.canvasRef.current.height);
    if (y <= 10) {
      y = 11;
    }
    if (y >= this.canvasRef.current.height - 10) {
      y = this.canvasRef.current.height - 11;
    }
    const particle = Matter.Bodies.circle(x, y, 5, {
      restitution: 1,
      friction: 0,
      frictionAir: 0,
    });
    Matter.Body.setInertia(particle, Infinity);
    Matter.World.add(this.world, particle);
    // Find a random direction, in radians
    const direction = Math.random() * Math.PI * 2;

    Matter.Body.setVelocity(particle, {
      x: Math.sin(direction) * 2,
      y: Math.cos(direction) * 2,
    });
  };

  render() {
    return (
      <>
        <div className="waterContainer" ref={this.containerRef}>
          <div className="valueDisplay">
            {this.props.tempTitle} {this.state.temp} {this.props.tempUnit}{' '}
            {this.props.phTitle} {this.state.ph}
          </div>
          {/*<Scene/>*/}
          {/*/ {this.state.enzymes.map((x, index) => (
            //   <Enzyme />
          // ))}*/}
          <canvas className="waterWorld" ref={this.canvasRef} />
        </div>
      </>
    );
  }
}
