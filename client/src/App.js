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
			console.log(data);
		});
	}

	render() {
		return (
			<div>
				<Widget />
			</div>
		);
	}
}

export default App;
