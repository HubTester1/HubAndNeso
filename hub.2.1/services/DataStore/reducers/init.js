
// ----- REDUCERS

// define default state for this reducer
const initReducerDefaultState = {
	uData: {},
	stateError: false,
	stateReady: false
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
					uData: {},
					stateError: true,
					stateReady: true
				} : 
				{ 
					uData: action.uData,
					stateError: false,
					stateReady: true
				};
		default:
			// just return state as is
			return state
	}
};
