/**
 * @name State Store Service - Reducer
 * @function
 * @category Services
 * @description Define Redux state store reducer. Due to Next.js limitations, this
 * is the only reducer.
 * @param {object} action
 * @returns {object} Modified state object
 */

const reducerDefaultState = {
	stateError: false,
	uData: {},
	hData: { headerStuck: false },
	sData: {},
	isServerSide: false,
};
const reducer = (state = reducerDefaultState, action) => {
	switch (action.type) {
	case 'SET_USER_DATA':
		return {
			...state,
			uData: action.uData,
		};
	case 'SET_SCREEN_DATA':
		return {
			...state,
			sData: action.sData,
		};
	case 'SET_STATE_ERROR':
		return {
			...state,
			stateError: true,
			stateErrorDetails: action.error,
		};
	case 'SET_HEADER_STUCK':
		return {
			...state,
			hData: { headerStuck: action.headerStuck },
		};
	case 'UPDATE_SELECTED_SCREEN_AND_PARTIAL':
		return {
			...state,
			sData: { 
				s: action.s,
				p: action.p ? action.p : state.sData.p,
				screens: state.sData.screens,
			},
		};
	default:
		return state;
	}
};

export default reducer;
