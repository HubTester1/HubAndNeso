import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import initReducer from '../Reducers/initReducer';
import thunk from 'redux-thunk';


// define the compose enhancers to be used; if server, compose; if client, dev tools
const composeEnhancers =
	(typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
	compose;


const makeStore = (initialState, options) => {
	/**
	* @param {object} initialState
	* @param {boolean} options.isServer indicates whether it is a server side or client side
	* @param {Request} options.req NodeJS Request object (not set when client applies initialState from server)
	* @param {Request} options.res NodeJS Request object (not set when client applies initialState from server)
	* @param {boolean} options.debug User-defined debug mode param
	* @param {string} options.storeKey This key will be used to preserve store in global namespace for safe HMR
	*/
	return createStore(
		initReducer, 
		initialState,
		composeEnhancers(applyMiddleware(thunk))
	);
};

export default makeStore;