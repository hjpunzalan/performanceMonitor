import React, { Component, createRef } from 'react';
import drawCircle from '../utils/canvasLoadAnimation';

class Mem extends Component {
	constructor(props) {
		super(props);
		this.canvas = createRef();
	}

	componentDidMount() {
		drawCircle(this.canvas.current, this.props.memData.memUsage * 100);
	}

	render() {
		const { totalMem, memUsage, freeMem } = this.props.memData;
		const gbPerBytes = 1073741824;
		const totalMemInGb = (totalMem / gbPerBytes).toFixed(0);
		const freeMemInGb = (freeMem / gbPerBytes).toFixed(2);
		return (
			<div className="memory-usage">
				<h3>Memory usage</h3>
				<div className="canvas-wrapper">
					<canvas
						className="memCanvas"
						width="200"
						height="200"
						ref={this.canvas}></canvas>
					<span className="mem-text">{Math.ceil(memUsage * 100)}%</span>
				</div>
				<span className="widget-text">Total Memory: {totalMemInGb}gb</span>
				<span className="widget-text">Free Memory: {freeMemInGb}gb</span>
			</div>
		);
	}
}

export default Mem;
