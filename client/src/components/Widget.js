import React, { Component } from 'react';
import Cpu from './Cpu';
import Mem from './Mem';
import Info from './Info';

export default class Widget extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div>
				<h1>Widget</h1>
				<p>{this.props.data.cpuLoad}</p>
				<Cpu />
				<Mem />
				<Info />
			</div>
		);
	}
}
