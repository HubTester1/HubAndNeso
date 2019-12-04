
// ----- IMPORTS

import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import initReducer from '../reducers/init';
import thunk from 'redux-thunk';


// ----- CONFIGURE STORE

// define the compose enhancers to be used; if server, compose; if client, dev tools
const composeEnhancers = 
	(typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || 
	compose;

// create store
export default () => {
	// create store with reducer(s), compose enhancers, and thunk middleware
	const store = createStore(
		initReducer,
		composeEnhancers(applyMiddleware(thunk))
	);
	// return created store
	return store;
};
