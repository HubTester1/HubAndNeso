
// ----- PULL IN MODULES

const nesoDBQueries = require('./nesoDBQueries');
const nesoSPSync = require('./nesoSPSync');
const nesoUtilities = require('./nesoUtilities');
const moment = require('moment');


// ----- DEFINE HEALTH FUNCTIONS

module.exports = {

	ReturnExportSettingsData: () =>
		// return a new promise
		new Promise(((resolve, reject) => {
			// get a promise to retrieve all documents from the emailSettings document collection
			nesoDBQueries.ReturnAllDocsFromCollection('exportSettings')
				// if the promise is resolved with the docs, then resolve this promise with the docs
				.then((result) => { resolve(result); })
				// if the promise is rejected with an error, then reject this promise with an error
				.catch((error) => { reject(error); });
		})),

	ReturnExportWhitelistedDomains: () =>
		// return a new promise
		new Promise(((resolve, reject) => {
			// get a promise to retrieve all email settings
			module.exports.ReturnExportSettingsData()
				// if the promise is resolved with the settings
				.then((settings) => {
					// resolve this promise with the requested setting
					resolve({
						error: settings.error,
						whitelistedDomains: settings.docs[0].whitelistedDomains,
					});
				})
				// if the promise is rejected with an error, then reject this promise with an error
				.catch((error) => { reject(error); });
		})),

	ReturnGSEStats: (startDate, endDate) =>
		// return a new promise
		new Promise((resolve, reject) => {
			// get a promise to retrieve all documents from the nesoHealth document collection
			module.exports.ProcessGSEExport(startDate, endDate)
				// if the promise is resolved with the docs, then resolve this promise with the docs
				.then((result) => { resolve(result); })
				// if the promise is rejected with an error, then reject this promise with an error
				.catch((error) => { reject(error); });
		}),

	ProcessGSEExport: (startDate, endDate) =>
		// return a new promise
		new Promise((resolve, reject) => {
			const formattedStartDate = `${moment(startDate).format('YYYY/MM/DDTHH:mm:ss')}Z`;
			const formattedEndDate = `${moment(endDate).format('YYYY/MM/DDTHH:mm:ss')}Z`;
			// get a promise to sync all GSE data from SPO to Neso
			module.exports.SyncGSEItemsForExport(formattedStartDate, formattedEndDate)
				// if the promise is resolved with a result
				.then((syncResult) => {
					// get a promise to pull all synced GSE signups from db
					nesoDBQueries.ReturnAllDocsFromCollection('gseCreditGrantedInDateRangeSignups')
						// if the promise is resolved with the docs
						.then((signupQueryResult) => {
							// // set up vars to receive signups data and data processing promises
							// const signups = [];
							// const dataProcessingPromises = [];
							// const scheduleProcessingPromises = [];
							// const userProcessingPromises = [];








							
							signupQueryResult.docs.forEach((signupValue, signupIndex) => {
								dataProcessingPromises.push(
									// return a new promise
									new Promise((resolve, reject) => {


										// if the promise was resolved with the result
										.then((conversionResult) => {


								);
								
								
								
								
								const thisSignup = {
									name: signupValue.AllRequestData['Requested-For'][0].displayText,
								};
								// add to schedule processing promises container a promise to 
								// 		process one schedule
								scheduleProcessingPromises
									.push(module.exports.ProcessNewMessageImage(files[fileKey], storageBasePath, storageBaseURI));






								
									// if the promise is resolved with the docs
									.then((scheduleQueryResult) => {
										// if (signupIndex === 1) {											
										// 	console.log(parseInt(signupValue.ScheduleID, 10));
										// 	console.log(scheduleQueryResult.docs);
										// }
										thisSignup.date = scheduleQueryResult.docs[0].Date;
										thisSignup.length = scheduleQueryResult.docs[0].ShiftLength;
										nesoDBQueries.ReturnAllSpecifiedDocsFromCollection('adUsers', {
											account: nesoUtilities.ReplaceAll('@mos.org', '', nesoUtilities.ReplaceAll('i:0#.f\\|membership\\|', '', signupValue.AllRequestData['Requested-For'][0].account)),
										}, {})
											// if the promise is resolved with the docs
											.then((userQueryResult) => {
												// if (signupIndex === 1) {
												// 	console.log(userQueryResult.docs);
												// }
												thisSignup.employeeID = userQueryResult.docs[0].employeeID;
												signups.push(thisSignup);
												console.log('--single--');
												console.log(thisSignup);
												resolve({ error: false });
											})
											// if the promise is rejected with an error, 
											// 		then reject this promise with an error
											.catch((userQueryError) => {
												reject(userQueryError);
											});
									})
									// if the promise is rejected with an error, 
									// 		then reject this promise with an error
									.catch((scheduleQueryError) => {
										reject(scheduleQueryError);
									});
							});
							console.log('-------signups-------');
							console.log(signups);
						})
						// if the promise is rejected with an error, then reject this promise with an error
						.catch((signupQueryError) => {
							reject(signupQueryError);
						});
					resolve(syncResult);
				})
				// if the promise is rejected with an error, then reject this promise with an error
				.catch((syncError) => { reject(syncError); });
		}),

	SyncGSEItemsForExport: (startDate, endDate) =>
		// return a new promise
		new Promise((resolve, reject) => {
			// create promises to sync all GSE data from SPO to Neso
			Promise.all([
				nesoSPSync.SyncGSECompletedInDateRangeSchedulesListItems(startDate, endDate),
				nesoSPSync.SyncGSECreditGrantedInDateRangeSignupsListItems(startDate, endDate),
			])
				// when all promises have resolved
				.then((syncResults) => {
					// resolve with non-error flag
					resolve({
						error: false,
					});
				})
				// if a promise was rejected with an error
				.catch((syncErrors) => {
					// reject with error flag
					reject({
						error: false,
						syncErrors,
					});
				});
		}),

	/* ReturnGSEItemsFromDBForExport: (startDate, endDate) =>
		// return a new promise
		new Promise((resolve, reject) => {
			// create promises to sync all GSE data from SPO to Neso
			Promise.all([
				nesoDBQueries.ReturnAllDocsFromCollection('exportSettings'),
				nesoSPSync.SyncGSECreditGrantedInDateRangeSignupsListItems(startDate, endDate),
			])
				// when all promises have resolved
				.then((syncResults) => {
					// resolve with non-error flag
					resolve({
						error: false,
					});
				})
				// if a promise was rejected with an error
				.catch((syncErrors) => {
					// reject with error flag
					reject({
						error: false,
						syncErrors,
					});
				});
		}), */
};
