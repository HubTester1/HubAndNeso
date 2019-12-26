import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import initReducer from '../Reducers/initReducer';

/**
 * @name State Store Service - Make Store
 * @function
 * @category Services
 * @description Create Redux state store and connect reducers and middleware (redux-thunk).
 * @param {object} initialState
 * @param {boolean} options.isServer indicates server side or client side
 * @param {Request} options.req NodeJS Request object
 * @param {Response} options.res NodeJS Response object
 * @param {boolean} options.debug User-defined debug mode param
 * @param {string} options.storeKey Preserve store in global namespace for safe HMR
 * @returns {object} Store, an object that holds complete state
 */

// define the compose enhancers to be used; if server, compose; if client, dev tools
const composeEnhancers =
	(typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
	compose;

const makeStore = (initialState, options) => 
	createStore(
		initReducer,
		initialState,
		composeEnhancers(applyMiddleware(thunk)),
	);
export default makeStore;
