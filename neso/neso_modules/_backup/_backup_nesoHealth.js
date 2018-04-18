
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
	DEFINE EMAIL FUNCTIONS
*********************************************************************/

var nesoHealth = function() {

	var ReturnHealthSettingsData = function() {
		// return a new promise
		return new Promise(function(resolve, reject) {
			// get a promise to retrieve all documents from the emailSettings document collection
			nesoDBQueries.ReturnAllDocsFromCollection('healthSettings')
			// if the promise is resolved with the docs, then resolve this promise with the docs
			.then(function(result) { resolve(result) })
			// if the promise is rejected with an error, then reject this promise with an error
			.catch(function (error) { reject(error) });
		});
	};

	var ReturnHealthWhitelistedDomains = function() {
		// return a new promise
		return new Promise(function(resolve, reject) {
			// get a promise to retrieve all email settings
			ReturnHealthSettingsData()
			// if the promise is resolved with the settings, then resolve this promise with the requested setting
			.then(function(settings) { resolve( { "error": settings.error, "whitelistedDomains": settings["docs"][0]["whitelistedDomains"] } ) } )
			// if the promise is rejected with an error, then reject this promise with an error
			.catch(function (error) { reject(error)});
		});
	};

	var ReturnNesoHealthFromDB = function() {
		// return a new promise
		return new Promise(function(resolve, reject) {
			// get a promise to retrieve all documents from the nesoHealth document collection
			nesoDBQueries.ReturnAllDocsFromCollection('health')
			// if the promise is resolved with the docs, then resolve this promise with the docs
			.then(function(result) { resolve(result) })
			// if the promise is rejected with an error, then reject this promise with an error
			.catch(function (error) { reject(error) });
		});
	};

	var ReturnNesoHealth = function() {
		// return a new promise
		return new Promise(function(resolve, reject) {
			// get a promise to retrieve all documents from the nesoHealth document collection
			ReturnNesoHealthFromDB()
			// if the promise is resolved with the docs, then resolve this promise with the docs
			.then(function(result) { resolve(result) })
			// if the promise is rejected with an error, then reject this promise with an error
			.catch(function (error) { reject(error) });
		});
	};





	return {
		ReturnHealthSettingsData: ReturnHealthSettingsData,
		ReturnHealthWhitelistedDomains: ReturnHealthWhitelistedDomains,
		ReturnNesoHealthFromDB: ReturnNesoHealthFromDB,
		ReturnNesoHealth: ReturnNesoHealth
	};
}();

module.exports = nesoHealth;