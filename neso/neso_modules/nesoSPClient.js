
// ----- PULL IN MODULES

const spauth = require('node-sp-auth');
const axios = require('axios');

// ----- DEFINE SHAREPOINT CLIENT FUNCTIONS

module.exports = {

	ReturnSPListItems: (siteURL, fields, listName) =>
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
					headers.Accept = 'application/json;odata=nometadata';
					const axiosConfig = {
						headers,
					};
					// construct endpoint
					let endpoint = `${siteURL}/_api/web/lists/getByTitle('${listName}')/items?$top=5000`;
					// if fields is a non-empty array
					if (typeof (fields) === 'object' && fields[0]) {
						// start a select clause
						endpoint += '&$select=';
						// add each field to be selected
						fields.forEach((fieldValue, fieldIndex) => {
							if (fieldIndex !== 0) {
								endpoint += ',';
							}
							endpoint += fieldValue;
						});
					}
					// get a promise to retrieve the data
					axios.get(endpoint, axiosConfig)
						// if the promise is resolved
						.then((result) => {
							// if status indicates success
							if (result.status === 200) {
								// resolve this promise with the list items  
								resolve({ listItemsArray: result.data.value });
							} else {
								// construct a custom error
								const errorToReport = {
									error: true,
									spClientError: true,
									spClientErrorDetails: 'response not 200',
								};
								// reject this promise with the error
								reject(errorToReport);
							}
						})
						// if the promise is rejected with an error, then reject this promise with an error
						.catch((error) => { reject(error); });
				});
		}),

	ReturnSPAppSWFListItems: (appToken, fields) => 
		// return a new promise
		new Promise((resolve, reject) => {
			// construct full site URL
			const siteURL = `https://bmos.sharepoint.com/sites/${appToken}`;
			// get a promise to get the list items
			module.exports.ReturnSPListItems(siteURL, fields, 'SWFList')
				// if the promise is resolved with the list items, then respond with the list items
				.then((result) => { resolve(result); })
				// if the promise is rejected with an error, then reject this promise with an error
				.catch((error) => { reject(error); });
		}),

};
