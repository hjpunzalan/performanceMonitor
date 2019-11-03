import React from 'react';
import moment from 'moment';

const Info = props => {
	return (
		<div className="cpu-info">
			<div>
				<h3>Operating System</h3>
				<span className="widget-text">{props.infoData.osType}</span>
			</div>
			<div>
				<h3>Time Online</h3>
				<span className="widget-text">
					{moment.duration(props.infoData.upTime).humanize()}
				</span>
			</div>
			<div className="more-info">
				<h3>Processor information</h3>
				<span className="widget-text">
					<strong>Type:</strong> {props.infoData.cpuModel}
				</span>
				<span className="widget-text">
					<strong>Number of Cores:</strong> {props.infoData.numCores}
				</span>
				<span className="widget-text">
					<strong>Clock Speed:</strong> {props.infoData.cpuSpeed}
				</span>
			</div>
		</div>
	);
};

export default Info;
