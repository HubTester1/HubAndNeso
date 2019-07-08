
// ----- PULL IN MODULES

const nesoDBQueries = require('./nesoDBQueries');
const nesoSPSync = require('./nesoSPSync');
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
			const formattedStartDate = moment(startDate).format('YYYY/MM/DDTHH:mm:ssZ');
			const formattedEndDate = moment(endDate).format('YYYY/MM/DDTHH:mm:ssZ');
			// get a promise to sync all GSE data from SPO to Neso
			module.exports.SyncGSEItemsForExport(formattedStartDate, formattedEndDate)
				// if the promise is resolved with a result
				.then((result) => {
					/* 

					for each signup in the date range, get name and accountname

					get from schedules:
					schedule date
					half or full

					get from people:
					employee id

					write object to JSON

					 */
					resolve(result);
				})
				// if the promise is rejected with an error, then reject this promise with an error
				.catch((error) => { reject(error); });
		}),

	SyncGSEItemsForExport: (startDate, endDate) =>
		// return a new promise
		new Promise((resolve, reject) => {
			// create promises to sync all GSE data from SPO to Neso
			nesoSPSync.SyncGSECompletedInDateRangeSchedulesListItems(startDate, endDate)
			/* Promise.all([
				nesoSPSync.SyncGSECompletedInDateRangeSchedulesListItems(startDate, endDate),
				// nesoSPSync.SyncGSECreditGrantedInDateRangeSignupsListItems(startDate, endDate),
			])
 */				// when all promises have resolved
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
