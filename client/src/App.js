import React, { Component } from 'react';
import socket from './utils/socketConnections';

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
		return <div></div>;
	}
}

export default App;
