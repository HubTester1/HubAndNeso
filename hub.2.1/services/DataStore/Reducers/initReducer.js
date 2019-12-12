
const initReducerDefaultState = {
	stateError: false,
	screen: '',
	partialScreen: '',
	uData: {},
	isServerSide: false,
};
const initReducer = (state = initReducerDefaultState, action) => {
	switch (action.type) {
	case 'SET_SCREEN':
		return {
			...state,
			screen: action.screen,
		};
	case 'SET_SUBSCREEN':
		return {
			...state,
			partialScreen: action.partialScreen,
		};
	case 'SET_USER_DATA':
		return {
			...state,
			uData: action.uData,
		};
	case 'SET_STATE_ERROR':
		return {
			...state,
			stateError: true,
			stateErrorDetails: action.error,
		};
	default:
		return state;
	}
};

export default initReducer;
