import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import initReducer from '../Reducers/initReducer';


// define the compose enhancers to be used; if server, compose; if client, dev tools
const composeEnhancers =
	(typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
	compose;


const makeStore = (initialState, options) => 
	/**
	* @param {object} initialState
	* @param {boolean} options.isServer indicates whether it is a server side or client side
	* @param {Request} options.req NodeJS Request object
	* @param {Request} options.res NodeJS Request object
	* @param {boolean} options.debug User-defined debug mode param
	* @param {string} options.storeKey Preserve store in global namespace for safe HMR
	*/
	createStore(
		initReducer, 
		initialState,
		composeEnhancers(applyMiddleware(thunk)),
	);
export default makeStore;
