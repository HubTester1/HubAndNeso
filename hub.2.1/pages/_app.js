
// ----- IMPORTS

import { Provider } from "react-redux";
import App from "next/app";
import configureStore from '../services/DataStore/store/configureStore';
import { startSetUserData } from '../services/DataStore/actions/init';

// ----- SET UP REDUX DATA STORE

// get a store
const store = configureStore();
// dispatch init action startSetUserData
store.dispatch(startSetUserData());

// ----- EXTEND NEXT APP W/ REDUX DATA STORE

class AppWithRedux extends App {
	render() {
		const { Component, pageProps } = this.props
		return (
			<Provider store={store}>
				<Component {...pageProps} />
			</Provider>
		);
	}
};

export default AppWithRedux;