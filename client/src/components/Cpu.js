import React, { Component, createRef } from 'react';
import drawCircle from '../utils/canvasLoadAnimation';

class Cpu extends Component {
	constructor(props) {
		super(props);
		this.canvas = createRef();
	}

	render() {
		const canvas = this.canvas.current;
		const cpuLoad = this.props.cpuData.cpuLoad;
		drawCircle(canvas, cpuLoad);

		return (
			<div className="cpu">
				<h3>CPU</h3>
				<div className="canvas-wrapper">
					<canvas className="canvas" ref={this.canvas}></canvas>
					<div className="cpu-text">{cpuLoad}</div>
				</div>
			</div>
		);
	}
}

export default Cpu;
