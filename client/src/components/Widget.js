import React, { Component } from 'react';
import Cpu from './Cpu';
import Mem from './Mem';
import Info from './Info';

export default class Widget extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		const {
			macA,
			freeMem,
			totalMem,
			usedMem,
			memUsage,
			osType,
			upTime,
			cpuModel,
			numCores,
			cpuSpeed,
			cpuLoad
		} = this.props.data;
		const cpu = { cpuLoad };
		const mem = { totalMem, usedMem, memUsage, freeMem };
		const info = { macA, osType, upTime, cpuModel, numCores, cpuSpeed };

		return (
			<div>
				<Cpu cpuData={cpu} />
				<Mem memData={mem} />
				<Info infoData={info} />
			</div>
		);
	}
}
