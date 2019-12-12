/* eslint-disable  react/react-in-jsx-scope */

// Primary purpose: retrieve data and send it to _app; call AppContainer

import { Component } from 'react';
import { connect } from 'react-redux';
import AppContainer from '../components/Layout/AppContainer/AppContainer';
import User from '../services/User';

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
			const uDataResponse = await User.ReturnUData(u);
			const uData = await uDataResponse.uData;
			return {
				s, o, u, p, uData, 
			};
		} catch (error) {
			return {
				s, o, u, p, stateError: error, 
			};
		}
	}
	render() {
		return (
			<AppContainer />
		);
	}
}

export default connect(state => state)(Index);
