import React, { Component } from 'react';
import socket from './utils/socketConnections';
import Widget from './components/Widget';
import './App.css';

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
			console.log(this.state.performanceData);
		});
	}

	render() {
		let widgets = [];
		const data = this.state.performanceData;
		// grab each machine , by property, from data
		// Return [[key, value]]
		Object.entries(data).forEach(([key, value]) => {
			// Fill widgets array with components
			widgets.push(<Widget key={key} data={value} />);
		});
		return <div className="App">{widgets}</div>;
	}
}

export default App;
