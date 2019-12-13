
const initReducerDefaultState = {
	stateError: false,
	uData: {},
	hData: { headerStuck: false },
	sData: {},
	isServerSide: false,
};
const initReducer = (state = initReducerDefaultState, action) => {
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
	default:
		return state;
	}
};

export default initReducer;
