import React, { Component } from 'react';
import socket from './utils/socketConnections';
import Widget from './components/Widget';

class App extends Component {
	constructor() {
		super();
		this.state = {
			performanceData: {}
		};
	}

	componentDidMount() {
		socket.on('data', data => {
			// received new data
			// Update state to rerender components
			// State is object for easy finding key vaLue pairs
			const currentState = { ...this.state.performanceData };
			// Each performance data is per computer via mac address
			currentState[data.macA] = data;
			this.setState({
				performanceData: currentState
			});
		});
	}

	render() {
		console.log(this.state.performanceData);
		return (
			<div>
				<Widget />
			</div>
		);
	}
}

export default App;
