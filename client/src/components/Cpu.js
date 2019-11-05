import React, { Component, createRef } from 'react';
import drawCircle from '../utils/canvasLoadAnimation';

class Cpu extends Component {
	constructor(props) {
		super(props);
		this.canvas = createRef();
	}

	render() {
		const cpuLoad = this.props.cpuData.cpuLoad;
		drawCircle(this.canvas.current, cpuLoad);
		return (
			<div className="cpu-load">
				<h3>CPU Load</h3>
				<div className="canvas-wrapper">
					<canvas
						className="canvas"
						ref={this.canvas}
						width="200"
						height="200"></canvas>
					<span className="cpu-text">{cpuLoad}%</span>
				</div>
			</div>
		);
	}
}

export default Cpu;
