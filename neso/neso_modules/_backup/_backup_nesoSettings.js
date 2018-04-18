
/*********************************************************************
	PULL IN MODULES
*********************************************************************/

// enable use of "monk" node module; this provides "simple yet substantial usability improvements for MongoDB usage within Node.JS"
var monk = require('monk');

// use the "nesoDBConnection" neso module; this is sufficient to bring in the database connection
var nesoDBConnection = require('./nesoDBConnection');
// use the "nesoDBQueries" neso module; this allows us to use some standardized and convenient query methods
var nesoDBQueries = require('./nesoDBQueries');





/*********************************************************************
	DEFINE SETTINGS FUNCTIONS
*********************************************************************/

var nesoSettings = function() {
		
	var ReturnNesoSettingsData = function() {
		// return a new promise
		return new Promise(function(resolve, reject) {
			// get a promise to retrieve all documents from the nesoSettings document collection
			nesoDBQueries.ReturnAllDocsFromCollection('nesoSettings')
			// if the promise is resolved with the docs, then resolve this promise with the docs
			.then(function(result) { resolve(result) })
			// if the promise is rejected with an error, then reject this promise with an error
			.catch(function (error) { reject(error) });
		});
	};





	return {
		ReturnNesoSettingsData: ReturnNesoSettingsData
	};
}();

module.exports = nesoSettings;