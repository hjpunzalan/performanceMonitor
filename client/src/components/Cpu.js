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
				<h3>CPU Load</h3>
				<div className="canvas-wrapper">
					<canvas className="canvas" ref={this.canvas}></canvas>
					<span className="cpu-text">{cpuLoad}</span>
				</div>
			</div>
		);
	}
}

export default Cpu;
