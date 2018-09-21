
// ----- PULL IN MODULES

const spauth = require('node-sp-auth');
const axios = require('axios');

// ----- DEFINE SHAREPOINT CLIENT FUNCTIONS

module.exports = {

	ReturnSPListItems: (siteURL, listName) =>
		// return a new promise
		new Promise((resolve, reject) => {
			// not sure why, but the environment vars must be extracted before use
			const username = process.env.spUser;
			const password = process.env.spPass;  
			spauth.getAuth(siteURL, {
				username,
				password,
			})
				.then((options) => {
					// extract, augment headers; assign to config object
					const { headers } = options;
					headers.Accept = 'application/json;odata=verbose';
					const axiosConfig = {
						headers,
					};
					// construct endpoint
					const endpoint = `${siteURL}/_api/web/lists/getByTitle('${listName}')/items`;
					// get a promise to retrieve the data
					axios.get(endpoint, axiosConfig)
						// if the promise is resolved with the list items
						.then((result) => {
							// resolve this promise with the list items
							resolve({ listItemsArray: result.data.d.results });
						})
						// if the promise is rejected with an error, then reject this promise with an error
						.catch((error) => { reject(error); });
				});
		}),

	ReturnSPAppSWFListItems: appToken => 
		// return a new promise
		new Promise((resolve, reject) => {
			// construct full site URL
			const siteURL = `https://bmos.sharepoint.com/sites/${appToken}`;
			// get a promise to get the list items
			module.exports.ReturnSPListItems(siteURL, 'SWFList')
				// if the promise is resolved with the list items, then respond with the list items
				.then((result) => { resolve(result); })
				// if the promise is rejected with an error, then reject this promise with an error
				.catch((error) => { reject(error); });
		}),

};
