import React, { Component } from 'react';
import Cpu from './Cpu';
import Mem from './Mem';
import Info from './Info';
import '../styles/widget.css';

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
			cpuLoad,
			isActive
		} = this.props.data;
		const cpu = { cpuLoad };
		const mem = { totalMem, usedMem, memUsage, freeMem };
		const info = { macA, osType, upTime, cpuModel, numCores, cpuSpeed };

		let notActiveDiv;

		if (!isActive) {
			notActiveDiv = <div className="not-active">Offline</div>;
		}

		return (
			<div className={`widget ${isActive ? null : 'offline'}`}>
				{notActiveDiv}
				<Cpu cpuData={cpu} />
				<Mem memData={mem} />
				<Info infoData={info} />
			</div>
		);
	}
}
