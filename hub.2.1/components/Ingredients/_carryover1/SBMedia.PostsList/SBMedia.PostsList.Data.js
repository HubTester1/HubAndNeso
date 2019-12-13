
// ----- IMPORTS

import ApiClient from '../../services/ApiClient';


// ----- DATA

module.exports = {
	AddPostOptionToDatabaseAndReturnID: post => 
		// return a new promise
		new Promise((resolve, reject) => {
			console.log('sending post');
			console.log(post);
			// get a promise to post the post data to the API
			ApiClient.PostAPIData('http://192.168.0.15:3000/api/posts/add', post)
				// if the promise is resolved with a result, then resolve this promise with the result
				.then((result) => { resolve(result); })
				// if the promise is rejected with an error, 
				// 		then reject this promise with the error
				.catch((error) => { reject(error); });
		})
	,
};
