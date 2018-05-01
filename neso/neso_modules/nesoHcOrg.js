
/* eslint-disable no-multiple-empty-lines */
/* eslint-disable padded-blocks */

// ----- PULL IN MODULES

const nesoDBQueries = require('./nesoDBQueries');
const nesoActiveDirectory = require('./nesoActiveDirectory');

// ----- DEFINE HEALTH FUNCTIONS

module.exports = {

	ReturnHcOrgSettings: () =>
		// return a new promise
		new Promise(((resolve, reject) => {
			// get a promise to retrieve all documents from the hcOrgSettings document collection
			nesoDBQueries.ReturnAllDocsFromCollection('hcOrgSettings')
				// if the promise is resolved with the docs, then resolve this promise with the docs
				.then((result) => { resolve(result); })
				// if the promise is rejected with an error, then reject this promise with an error
				.catch((error) => { reject(error); });
		})),


	ReturnHcOrgWhitelistedDomains: () =>
		// return a new promise
		new Promise(((resolve, reject) => {
			// get a promise to retrieve all email settings
			module.exports.ReturnHcOrgSettings()
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


	ReturnHcOrgDataProcessingAllowed: () =>
		// return a new promise
		new Promise(((resolve, reject) => {
			// get a promise to retrieve all email settings
			module.exports.ReturnHcOrgSettings()
				// if the promise is resolved with the settings, 
				// 		then resolve this promise with the requested setting
				.then((settings) => {
					resolve({
						error: settings.error,
						dataProcessingAllowed: settings.docs[0].dataProcessingAllowed,
					});
				})
				// if the promise is rejected with an error, then reject this promise with an error
				.catch((error) => {
					reject(error);
				});
		})),

	ReplaceOneHcOrgSetting: newSingleSettingObject =>
		// return a new promise
		new Promise(((resolve, reject) => {
			// get a promise to retrieve all email settings
			module.exports.ReturnHcOrgSettings()
				// if the promise is resolved with the settings, 
				//		then resolve this promise with the requested setting
				.then((existingSettings) => {
					// get a new version of all settings
					const newSettings = existingSettings.docs[0];
					// get an array containing the property key of newSingleSettingObject; 
					//		iterate over the array
					Object.keys(newSingleSettingObject).forEach((newSingleSettingKey) => {
						// in the new settings, replace relevant setting with value passed to this function
						newSettings[newSingleSettingKey] = newSingleSettingObject[newSingleSettingKey];
					});
					// get a promise to replace the settings in the emailSettings document collection
					nesoDBQueries.OverwriteDocInCollection(existingSettings.docs[0]._id, newSettings, 'hcOrgSettings')
						// if the promise is resolved with the counts, then resolve this promise with the counts
						.then((result) => {
							resolve(result);
						})
						// if the promise is rejected with an error, then reject this promise with an error
						.catch((error) => {
							reject(error);
						});
				})
				// if the promise is rejected with an error, then reject this promise with an error
				.catch((error) => {
					reject(error);
				});
		})),

	ReturnTeamsAll: () =>
		// return a new promise
		new Promise(((resolve, reject) => {
			// get a promise to retrieve all documents from the adUsers document collection
			nesoDBQueries.ReturnAllDocsFromCollection('hcTeamsAll')
				// if the promise is resolved with the docs, then resolve this promise with the docs
				.then((result) => {
					resolve({
						error: false,
						hcTeamsAll: result.docs,
					});
				})
				// if the promise is rejected with an error, then reject this promise with an error
				.catch((error) => {
					reject(error);
				});
		})),

	ReturnMiscContacts: () =>
		// return a new promise
		new Promise(((resolve, reject) => {
			// get a promise to retrieve all documents from the adUsers document collection
			nesoDBQueries.ReturnAllDocsFromCollection('hcOrgMiscContacts')
				// if the promise is resolved with the docs, then resolve this promise with the docs
				.then((result) => {
					resolve({
						error: false,
						miscContacts: result.docs,
					});
				})
				// if the promise is rejected with an error, then reject this promise with an error
				.catch((error) => {
					reject(error);
				});
		})),

	ReturnMission: () =>
		// return a new promise
		new Promise(((resolve, reject) => {
			// get a promise to retrieve all documents from the adUsers document collection
			nesoDBQueries.ReturnAllDocsFromCollection('hcOrgMission')
				// if the promise is resolved with the docs, then resolve this promise with the docs
				.then((result) => {
					resolve({
						error: false,
						mission: result.docs,
					});
				})
				// if the promise is rejected with an error, then reject this promise with an error
				.catch((error) => {
					reject(error);
				});
		})),

	ReturnXTeams: () =>
		// return a new promise
		new Promise(((resolve, reject) => {
			// get a promise to retrieve all documents from the adUsers document collection
			nesoDBQueries.ReturnAllDocsFromCollection('hcOrgXTeams')
				// if the promise is resolved with the docs, then resolve this promise with the docs
				.then((result) => {
					resolve({
						error: false,
						xTeams: result.docs,
					});
				})
				// if the promise is rejected with an error, then reject this promise with an error
				.catch((error) => {
					reject(error);
				});
		})),

	ReturnDivDeptsWTeams: () =>
		new Promise(((resolve, reject) => {
			const queries = [
				nesoActiveDirectory.ReturnADUsersByDivisionDepartmentData(),
				module.exports.ReturnTeamsAll(),
			];
			Promise.all(queries)
				.then((resultsReturnArray) => {
					
					/* let divDeptReturn;
					let teamsReturn;
					let divisionKeys;
					let deptKeys;

					const divDeptTempHolder = {};
					let divDeptTempHolderDivKeys;
					let divDeptTempHolderDeptKeys;
					let divDeptFinal;					
					
					resultsReturnArray.forEach((resultValue) => {
						if (resultValue[0].ServerRedirectedEmbedUrl) {
							orgChartsReturn = resultValue;
						}
						if (resultValue[0].Advancement) {
							divDeptReturn = resultValue[0];
						}
						if (resultValue[0].pageToken) {
							teamsReturn = resultValue;
						}
					}); */
					
					
					
					
					
					resolve(resultsReturnArray);
				});
		})),

	ProcessHcOrgDivDeptWTeamsData: () =>
		// return a new promise
		new Promise(((resolve, reject) => {
			// get a promise to retrieve ad processing status
			module.exports.ReturnHcOrgDataProcessingAllowed()
				// if the promise is resolved with the setting
				.then((hcOrgDataProcessingAllowed) => {
					// if it's ok to process ad users
					if (hcOrgDataProcessingAllowed.dataProcessingAllowed === true) {
						// get a promise to set dataProcessingNow to true
						module.exports.ReplaceOneHcOrgSetting({
							dataProcessingNow: true,
						})
							// if the promise to set dataProcessingNow to true was resolved
							.then((replaceOneHcOrgSettingResult) => {
								// ------------------- RESTART HERE ----------------------------
								// get a promise to get all ad users from csv
								module.exports.ReturnDivDeptsWTeams()
									// if the promise to get all ad users from csv was resolved with the ad users
									.then((returnAllActiveDirectoryUsersFromCSVResult) => {
										// extract the data from the result
										const adUsers = returnAllActiveDirectoryUsersFromCSVResult.activeDirectoryUsers;
										// get a promise to delete all ad users from the database
										module.exports.DeleteAllADUsersFromDatabase()
											// if the promise to delete all ad users from the database was resolved
											.then((deleteAllActiveDirectoryUsersFromDatabaseResult) => {
												// get a promise to add ad users from csv to the database
												module.exports.AddAllADUsersToDatabase(adUsers)
													// if the promise to add ad users from csv to the database was resolved
													.then((addAllActiveDirectoryUsersToDatabaseResult) => {
														// get a promise to set dataProcessingNow to false
														module.exports.ReplaceOneHcOrgSetting({
															dataProcessingNow: false,
														})
															// if the promise to set dataProcessingNow 
															//		to false was resolved with the result
															.then((replaceOneHcOrgSettingSecondResult) => {
																// resolve this promise with a message
																resolve({
																	error: false,
																});
															})
															// if the promise to set dataProcessingNow 
															//		to false was rejected with an error
															.catch((error) => {
																// reject this promise with the error
																reject(error);
															});
													})
													// if the promise to add ad users from 
													//		csv to the database was rejected with an error
													.catch((addAllActiveDirectoryUsersToDatabaseError) => {
														// get a promise to set dataProcessingNow to false
														module.exports.ReplaceOneHcOrgSetting({
															dataProcessingNow: false,
														})
															// if the promise to set dataProcessingNow 
															//		to false was resolved with the result
															.then((replaceOneHcOrgSettingSecondResult) => {
																// reject this promise with the error
																reject(addAllActiveDirectoryUsersToDatabaseError);
															})
															// if the promise to add ad users from 
															// 		csv to the database was rejected with an error
															.catch((replaceOneADSettingError) => {
																// construct a custom error
																const errorToReport = {
																	error: true,
																	mongoDBError: true,
																	errorCollection: [
																		addAllActiveDirectoryUsersToDatabaseError.mongoDBErrorDetails,
																		replaceOneADSettingError.mongoDBErrorDetails,
																	],
																};
																// process error
																nesoErrors.ProcessError(errorToReport);
																// reject this promise with the error
																reject(errorToReport);
															});
													});
											})
											// if the promise to delete all ad users from 
											// 		the database was rejected with an error
											.catch((deleteAllActiveDirectoryUsersFromDatabaseError) => {
												// get a promise to set dataProcessingNow to false
												module.exports.ReplaceOneHcOrgSetting({
													dataProcessingNow: false,
												})
													// if the promise to set dataProcessingNow 
													// 		to false was resolved with the result
													.then((replaceOneHcOrgSettingSecondResult) => {
														// reject this promise with the error
														reject(deleteAllActiveDirectoryUsersFromDatabaseError);
													})
													// if the promise to add ad users from csv 
													// 		to the database was rejected with an error
													.catch((replaceOneADSettingError) => {
														// construct a custom error
														const errorToReport = {
															error: true,
															mongoDBError: true,
															errorCollection: [
																deleteAllActiveDirectoryUsersFromDatabaseError.mongoDBErrorDetails,
																replaceOneADSettingError.mongoDBErrorDetails,
															],
														};
														// process error
														nesoErrors.ProcessError(errorToReport);
														// reject this promise with the error
														reject(errorToReport);
													});
											});
									})
									// if the promise to get all ad users from csv was rejected with an error
									.catch((returnAllActiveDirectoryUsersFromCSVError) => {
										// get a promise to set dataProcessingNow to false
										module.exports.ReplaceOneHcOrgSetting({
											dataProcessingNow: false,
										})
											// if the promise to set dataProcessingNow 
											// 		to false was resolved with the result
											.then((replaceOneHcOrgSettingSecondResult) => {
												// reject this promise with the error
												reject(returnAllActiveDirectoryUsersFromCSVError);
											})
											// if the promise to add ad users from csv 
											// 		to the database was rejected with an error
											.catch((replaceOneADSettingError) => {
												// construct a custom error
												const errorToReport = {
													error: true,
													mongoDBError: true,
													errorCollection: [
														returnAllActiveDirectoryUsersFromCSVError.mongoDBErrorDetails,
														replaceOneADSettingError.mongoDBErrorDetails,
													],
												};
												// process error
												nesoErrors.ProcessError(errorToReport);
												// reject this promise with the error
												reject(errorToReport);
											});
									});
							})
							// if the promise to set dataProcessingNow to true was rejected with an error, 
							// 		then reject this promise with the error
							.catch((error) => {
								reject(error);
							});
						// if it's NOT ok to process ad users
					} else {
						// reject this promise with the error
						reject({
							error: true,
							settingsError: 'dataProcessingStatus === false',
						});
					}
				})
				// if the promise to retrieve ad users processing status is rejected with an error, 
				// 		then reject this promise with the error
				.catch((error) => {
					reject(error);
				});
		})),

	ReturnAllHcOrgData: () =>
		new Promise(((resolve, reject) => {
			const queries = [
				module.exports.ReturnDivDeptsWTeams(),
				module.exports.ReturnMiscContacts(),
				module.exports.ReturnMission(),
				module.exports.ReturnXTeams(),
			];
			Promise.all(queries)
				.then((allQueryResults) => {
					resolve({
						error: false,
						data: allQueryResults,
					});
				})
				.catch((error) => {
					reject(error);
				});
		})),

};
