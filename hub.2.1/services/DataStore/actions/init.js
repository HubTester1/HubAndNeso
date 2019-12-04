
// ----- IMPORTS

import User from '../../User';

// ----- ACTIONS

// given uData and error, call setUserData reducer
export const setUserData = (uData, error) => ({
	type: 'SET_USER_DATA',
	uData,
	error
});
// async retrieve uData via local service and then
// 		dispatch setUserData action with uData or error
export const startSetUserData = () => {
	return (dispatch) => {
		User.ReturnUData()
			.then((response) => {
				return dispatch(setUserData(response.uData, null));
			})
			.catch((error) => {
				return dispatch(setUserData({}, error));
			});
	}
}
// call setIsServerSide reducer
export const setIsServerSide = () => ({
	type: 'SET_IS_SERVER_SIDE',
	isServerSide: typeof window !== 'undefined' ? false : true
});
