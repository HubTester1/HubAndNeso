import axios from 'axios';

export default class NesoHttpClient {
	static ReturnNesoData(endpoint) {
		// return a new promise
		return new Promise(((resolve, reject) => {
			// get a promise to retrieve the data
			axios.get(endpoint)
				// if the promise is resolved with the docs, then resolve this promise with the docs
				.then((result) => { resolve(result.data.docs); })
				// if the promise is rejected with an error, then reject this promise with an error
				.catch((error) => { reject(error); });
		}));
	}	
}
