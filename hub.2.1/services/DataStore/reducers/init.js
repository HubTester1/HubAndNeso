
// ----- REDUCERS

// define default state for this reducer
const initReducerDefaultState = {
	initStatesToReadyQuantity: 2,
	initStatesReady: [],
	stateError: false,
	uData: {
		preferences: {
			colorMode: 'dark'
		}

	},
	isServerSide: false
};
// configure reducer with state defaulting to defined default state
export default (state = initReducerDefaultState, action) => {
	switch (action.type) {
		case 'SET_USER_DATA':
			// if error, return empty object; otherwise, 
			// 		return received uData; in both cases,
			// 		signify whether state is in error and ready
			return action.error ?
				{
					initStatesToReadyQuantity: state.initStatesToReadyQuantity,
					initStatesReady: [...state.initStatesReady, 'uData'],
					stateError: true,
					uData: {},
					isServerSide: state.isServerSide
				} :
				{
					initStatesToReadyQuantity: state.initStatesToReadyQuantity,
					initStatesReady: [...state.initStatesReady, 'uData'],
					stateError: state.stateError,
					uData: action.uData,
					isServerSide: state.isServerSide
				};
		case 'SET_IS_SERVER_SIDE':
			// if window exists, this is client side, so return false; 
			// 		otherwise, return true
			return  {
				initStatesToReadyQuantity: state.initStatesToReadyQuantity,
				initStatesReady: [...state.initStatesReady, 'isServerSide'],
				stateError: state.stateError,
				uData: state.uData,
				isServerSide: action.isServerSide,
			};
		default:
			// just return state as is
			return state
	}
};
