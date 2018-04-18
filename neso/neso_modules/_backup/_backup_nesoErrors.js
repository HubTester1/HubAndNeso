
/*********************************************************************
	PULL IN MODULES
*********************************************************************/

// enable use of "monk" node module; this provides "simple yet substantial usability improvements for MongoDB usage within Node.JS"
var monk = require('monk');
// enable use of "twitter" node module; this will allow us to tweet errors
var twitter = require('twitter');

// use the "nesoDBConnection" neso module; this is sufficient to bring in the database connection
var nesoDBConnection = require('./nesoDBConnection');
// use the "nesoDBQueries" neso module; this allows us to use some standardized and convenient query methods
var nesoDBQueries = require('./nesoDBQueries');
// use the "nesoSettings" neso module; this allows us to get system-wide settings
var nesoSettings = require('./nesoSettings');
// use the "nesoUtilities" neso module; this allows us to use some date and time functions
var nesoUtilities = require('./nesoUtilities');





/*********************************************************************
	DEFINE ERROR FUNCTIONS
*********************************************************************/

var nesoErrors = function() {
		
	var ReturnErrorLogData = function() {
		// return a new promise
		return new Promise(function(resolve, reject) {
			// get a promise to retrieve all documents from the emailQueue document collection
			nesoDBQueries.ReturnAllDocsFromCollection('errors')
			// if the promise is resolved with the docs, then resolve this promise with the docs
			.then(function(result) { resolve(result) })
			// if the promise is rejected with an error, then reject this promise with an error
			.catch(function (error) { reject(error) });
		});
	};

	var ReturnErrorSettingsData = function() {
		// return a new promise
		return new Promise(function(resolve, reject) {
			// get a promise to retrieve all documents from the emailSettings document collection
			nesoDBQueries.ReturnAllDocsFromCollection('errorsSettings')
			// if the promise is resolved with the docs, then resolve this promise with the docs
			.then(function(result) { resolve(result) })
			// if the promise is rejected with an error, then reject this promise with an error
			.catch(function (error) { reject(error) });
		});
	};

	var ReturnErrorTwitterSettings = function() {
		// return a new promise
		return new Promise(function(resolve, reject) {
			// get a promise to retrieve all email settings
			ReturnErrorSettingsData()
			// if the promise is resolved with the settings, then resolve this promise with the requested setting
			.then(function(settings) { resolve( { "error": settings.error, "twitterSettings": settings["docs"][0]["twitterSettings"] } ) } )
			// if the promise is rejected with an error, then reject this promise with an error
			.catch(function (error) { reject(error) });
		});
	};

	var AddErrorToTwitter = function(errorData) {
		// return a new promise
		return new Promise(function(resolve, reject) {
			// get a promise to retrieve all error settings
			nesoSettings.ReturnNesoSettingsData()
			// if the promise is resolved with the settings
			.then(function(returnedsettingsData) {
				
				// try to post error to twitter
				try {
					// construct tweet based on errorData
					var errorTweet = nesoUtilities.ReturnFormattedDateTime('nowLocal', null, 'ddd, MM/DD, h:mm a');
					errorTweet += " - Neso ";
					if (typeof(errorData.emergencyError) !== "undefined" && errorData.emergencyError === true) {
						errorTweet += "Emergency Error: ";
						if (typeof(errorData.emergencyErrorDetails) !== "undefined") {
							errorTweet += errorData.emergencyErrorDetails + ".";
						} else {
							errorTweet += "No details available."
						}
					} else {
						errorTweet += "Standard Error.";
					}
					// extract neso's twitter settings
					var twitterSettings = returnedsettingsData["docs"][0]["twitter"];
					// get a twitter client using neso's twitter settings
					var client = new twitter({
						consumer_key: twitterSettings.consumer_key,
						consumer_secret: twitterSettings.consumer_secret,
						access_token_key: twitterSettings.access_token_key,
						access_token_secret: twitterSettings.access_token_secret
					});
					// attempt post error to Twitter
					client.post('statuses/update', {status: errorTweet},  function(tweetingError, tweet, response) {
						// if there was an error posting to twitter
						if(tweetingError) {
							// construct custom error object
							var twitterErrorData = {
								"error": true,
								"twitterError": true,
								"twitterErrorDetails": tweetingError
							}
							// get a promise to add the error to the log
							AddErrorToLog(twitterErrorData)
							// if the promise is resolved, ignore the mongoDB result and resolve with twitterErrorData
							.then(function(result) { resolve(twitterErrorData) })
							// if the promise is rejected with an error, ignore the mongoDB result and resolve with twitterErrorData
							.catch(function (error) { resolve(twitterErrorData) });
						} else {
							resolve({ "error": false, "twitterError": false })
						}
					});
				} catch(tweetingError) {
					// construct custom error object
					var twitterErrorData = {
						"error": true,
						"twitterError": true,
						"twitterErrorDetails": tweetingError
					}
					// get a promise to add the error to the log
					AddErrorToLog(twitterErrorData)
					// if the promise is resolved, ignore the mongoDB result and resolve this promise with twitterErrorData
					.then(function(result) { resolve(twitterErrorData) })
					// if the promise is rejected with an error, ignore the mongoDB result and resolve this promise with twitterErrorData
					.catch(function (error) { resolve(twitterErrorData) });
				}
			})
			// if the promise is rejected with an error, then resolve this promise with the error
			.catch(function (error) { resolve(error) });
		});
	};

	var AddErrorToLog = function(errorData) {

		// todo: add req.headers.referer

		errorData.errorTime = nesoUtilities.ReturnFormattedDateTime('nowUTC', null, null);

		// return a new promise
/*		return new Promise(function(resolve, reject) {
			// if this is NOT a db error; log is in db, so trying to add an error to db while db is problematic creates a circularity;
			// 		db errors in db log file
			if (typeof(errorData.mongoDBError) === "undefined" || errorData.mongoDBError === false) {
				// get a promise to retrieve all documents from the emailQueue document collection
				nesoDBQueries.InsertDocIntoCollection(errorData, 'errors')
				// if the promise is resolved with the result, then resolve this promise with the result
				.then(function(result) { resolve(result) })
				// if the promise is rejected with an error, then reject this promise with an error
				.catch(function (error) { resolve(error) });
			// if this is a db error
			} else {
				resolve({"error": false});
			}
		});
*/	};

	var ProcessError = function(errorData) {
		// return a new promise
		return new Promise(function(resolve, reject) {
			// get promises to async add error to twitter and to async add error to log
			Promise.all([AddErrorToTwitter(errorData), AddErrorToLog(errorData)])
			// when all promises have resolved
			.then(function(twitterAndLogResults) {
				// extract results for convenience
				var twitterResults = twitterAndLogResults[0];
				var logResults = twitterAndLogResults[1];
				// start constructing the result, defaulting to no errors
				var result = { "error": false };
				// if there was a twitter error that isn't just a duplicate status warning (code 187)
				if (twitterResults.error === true && typeof(twitterResults.twitterErrorDetails) !== "undefined" && twitterResults["twitterErrorDetails"][0]["code"] !== 187) {
					// make sure error is true and collect twitter error info
					result.error = true;
					result.twitterError =  twitterResults.twitterError;
					result.twitterErrorDetails = twitterResults.twitterErrorDetails;
				// if there was no twitter error (or there was only the duplicate status warning (code 187))
				} else {
					// collect twitter error info
					result.twitterError =  twitterResults.twitterError;
				}
				// if there was a log error
				if (logResults.error === true) {
					// make sure error is true and collect log error info
					result.error = true;
					result.mongoDBError =  logResults.mongoDBError;
					result.mongoDBErrorDetails = logResults.mongoDBErrorDetails;
				// if there was no log error
				} else {
					// collect log error info
					result.mongoDBError =  false;
				}
				resolve(result);
			})
			.catch(function(error) {
				console.log(error);
			});
		});
	};




	return {
		ReturnErrorLogData: ReturnErrorLogData,
		ReturnErrorSettingsData: ReturnErrorSettingsData,
		ReturnErrorTwitterSettings: ReturnErrorTwitterSettings,
		AddErrorToLog: AddErrorToLog,
		ProcessError: ProcessError
	};
}();

module.exports = nesoErrors;