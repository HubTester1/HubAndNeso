
// ----- PULL IN MODULES

const nesoDBQueries = require('./nesoDBQueries');

// ----- DEFINE SETTINGS FUNCTIONS

module.exports = {

	ReturnNesoSettingsData: () => 
		// return a new promise
		new Promise(((resolve, reject) => {
			// get a promise to retrieve all documents from the nesoSettings document collection
			nesoDBQueries.ReturnAllDocsFromCollection('nesoSettings')
			// if the promise is resolved with the docs, then resolve this promise with the docs
				.then((result) => { resolve(result); })
			// if the promise is rejected with an error, then reject this promise with an error
				.catch((error) => { reject(error); });
		})),
};
