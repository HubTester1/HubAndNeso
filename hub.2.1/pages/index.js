/* eslint-disable  react/react-in-jsx-scope */

// Primary purpose: retrieve data and send it to _app; call Container
// Used when /index is requested

import { Component } from 'react';
import { connect } from 'react-redux';
import Container from '../components/Layout/Container';
import User from '../services/User';
import Screen from '../services/Screen';

class Index extends Component {
	// add props to component and dispatch data to store; called on both 
	// 		server side and client side, but with different args. 
	// 		In both cases, args include normalized pathname and query.
	static async getInitialProps({
		store, isServer, pathname, query, 
	}) {
		const {
			s, o, u, p, 
		} = query;
		try {
			const uDataResponse = await User.ReturnUData(u, o);
			const uData = await uDataResponse.uData;
			const sData = Screen.ReturnSData(s, p);
			return {
				uData, sData,
			};
		} catch (error) {
			return {
				stateError: error, 
			};
		}
	}
	render() {
		return (
			<Container />
		);
	}
}

export default connect(state => state)(Index);
