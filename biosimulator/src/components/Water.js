import React from 'react';
import PropTypes from 'prop-types';
import './App.css';
import Enzyme from './Enzyme';
import Matter, { Runner, Render} from 'matter-js';
//import Scene from './Scene';

export default class Water extends React.Component {
  constructor(props){
    super(props);
    this.canvasRef= React.createRef();
    this.containerRef = React.createRef();
    this.engine = null;
    this.renderM = null;
    this.world = null;
  };

  PropTypes = {
    startTemp: PropTypes.number,
    title: PropTypes.string,
    unit: PropTypes.string,

  };

  state = {
    temp: this.props.startTemp,
    enzymes: [],
  };

  componentDidMount() {
    this.engine = Matter.Engine.create({});
    this.renderM = Matter.Render.create({
      canvas: this.canvasRef.current,
      element: this.containerRef.current,
      engine: this.engine,
      options: {/*width: 600, height: 600, */
      wireframes: false,},
    });
    this.world = this.engine.world;

    //Matter.World.add(this.engine.world, []);

    Runner.run(this.engine);
    Render.run(this.renderM);
    //this.renderM.run()
  }

  addEnzyme = () => {
    // let newEnzymes = this.state.enzymes;
    // newEnzymes.push(1);
    // this.setState({ enzymes: newEnzymes });
    Matter.World.add(this.world, Matter.Bodies.circle(150, 50, 30, { restitution: 0.7 }));
    //this.state.World.add(this.state.world, this.state.Bodies.circle(150, 50, 30, { restitution: 0.7 }));
  };

  render() {
    return (
      <>
        <div className="waterContainer" ref={this.containerRef}>
          <div>{this.props.title} {this.state.temp} {this.props.unit}</div>
          {/*<Scene/>*/}
          {/*/ {this.state.enzymes.map((x, index) => (
            //   <Enzyme />
          // ))}*/}
          <canvas className="WaterWorld" ref={this.canvasRef}/>
          </div>
          </>
          );
  }
}