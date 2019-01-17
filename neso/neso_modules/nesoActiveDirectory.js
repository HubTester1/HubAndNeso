// ----- PULL IN MODULES

const fse = require('fs-extra');
const csv = require('csvtojson');

const nesoDBQueries = require('./nesoDBQueries');
const nesoUtilities = require('./nesoUtilities');
const nesoErrors = require('./nesoErrors');
const nesoDBConnection = require('./nesoDBConnection');


// ----- DEFINE ACTIVE DIRECTORY FUNCTIONS

module.exports = {

	// SETTINGS, STATUS, CORS, UTILS

	ReturnADSettings: () =>
		// return a new promise
		new Promise((resolve, reject) => {
			// get a promise to retrieve all documents from the emailSettings document collection
			nesoDBQueries.ReturnAllDocsFromCollection('adSettings')
				// if the promise is resolved with the docs, then resolve this promise with the docs
				.then((result) => {
					resolve(result);
				})
				// if the promise is rejected with an error, then reject this promise with an error
				.catch((error) => {
					reject(error);
				});
		}),

	ReturnADDataProcessingStatus: () =>
		// return a new promise
		new Promise((resolve, reject) => {
			// get a promise to retrieve all email settings
			module.exports.ReturnADSettings()
				// if the promise is resolved with the settings, 
				// 		then resolve this promise with the requested setting
				.then((settings) => {
					resolve({
						error: settings.error,
						dataProcessingStatus: settings.docs[0].dataProcessingStatus,
					});
				})
				// if the promise is rejected with an error, then reject this promise with an error
				.catch((error) => {
					reject(error);
				});
		}),

	ReturnADDataProcessingNow: () =>
		// return a new promise
		new Promise((resolve, reject) => {
			// get a promise to retrieve all email settings
			module.exports.ReturnADSettings()
				// if the promise is resolved with the settings, 
				// 		then resolve this promise with the requested setting
				.then((settings) => {
					resolve({
						error: settings.error,
						dataProcessingNow: settings.docs[0].dataProcessingNow,
					});
				})
				// if the promise is rejected with an error, then reject this promise with an error
				.catch((error) => {
					reject(error);
				});
		}),

	ReturnADCSVSettings: () =>
		// return a new promise
		new Promise((resolve, reject) => {
			// get a promise to retrieve all email settings
			module.exports.ReturnADSettings()
				// if the promise is resolved with the settings, 
				// 		then resolve this promise with the requested setting
				.then((settings) => {
					resolve({
						error: settings.error,
						csv: settings.docs[0].csvOptions,
					});
				})
				// if the promise is rejected with an error, then reject this promise with an error
				.catch((error) => {
					reject(error);
				});
		}),

	ReturnADWhitelistedDomains: () =>
		// return a new promise
		new Promise((resolve, reject) => {
			// get a promise to retrieve all email settings
			module.exports.ReturnADSettings()
				// if the promise is resolved with the settings, 
				//		then resolve this promise with the requested setting
				.then((settings) => {
					resolve({
						error: settings.error,
						whitelistedDomains: settings.docs[0].whitelistedDomains,
					});
				})
				// if the promise is rejected with an error, then reject this promise with an error
				.catch((error) => {
					reject(error);
				});
		}),

	ReplaceAllADSettings: newSettings =>
		// return a new promise
		new Promise((resolve, reject) => {
			// get a promise to retrieve all email settings
			module.exports.ReturnADSettings()
				// if the promise is resolved with the settings, 
				// 		then resolve this promise with the requested setting
				.then((existingSettings) => {
					// get a promise to replace the settings in the emailSettings document collection
					nesoDBQueries.OverwriteDocInCollection(existingSettings.docs[0]._id, newSettings, 'adSettings')
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
		}),

	ReplaceOneADSetting: newSingleSettingObject =>
		// return a new promise
		new Promise((resolve, reject) => {
			// get a promise to retrieve all email settings
			module.exports.ReturnADSettings()
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
					nesoDBQueries.OverwriteDocInCollection(existingSettings.docs[0]._id, newSettings, 'adSettings')
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
		}),

	ReturnNewADUsersFilePathAndName: currentFilePathAndName =>
		`${currentFilePathAndName.slice(0, currentFilePathAndName.length - 4)}Copy.csv`,

	ReturnUserNameWeightRelativeToAnother: (a, b) => {
		if (a.lastName < b.lastName) {
			return -1;
		}
		if (a.lastName > b.lastName) {
			return 1;
		}
		if (a.firstName < b.firstName) {
			return -1;
		}
		if (a.firstName > b.firstName) {
			return 1;
		}
		return 0;
	},

	// DB DELETIONS

	DeleteAllADUsersFromDatabase: () =>
		// return a new promise
		new Promise((resolve, reject) => {
			// get a promise to retrieve all documents from the adUsers document collection
			nesoDBQueries.DeleteAllDocsFromCollection('adUsers')
				// if the promise is resolved with the docs, then resolve this promise with the docs
				.then((result) => {
					resolve(result);
				})
				// if the promise is rejected with an error, then reject this promise with an error
				.catch((error) => {
					reject(error);
				});
		}),

	DeleteAllADUsersByDivisionDepartmentFromDatabase: () =>
		// return a new promise
		new Promise((resolve, reject) => {
			// get a promise to retrieve all documents 
			//		from the adUsersByDivisionDepartment document collection
			nesoDBQueries.DeleteAllDocsFromCollection('adUsersByDivisionDepartment')
				// if the promise is resolved with the docs, then resolve this promise with the docs
				.then((result) => {
					resolve(result);
				})
				// if the promise is rejected with an error, then reject this promise with an error
				.catch((error) => {
					reject(error);
				});
		}),

	DeleteAllADDepartmentsFromDatabase: () =>
		// return a new promise
		new Promise((resolve, reject) => {
			// get a promise to retrieve all documents from the adDepartments document collection
			nesoDBQueries.DeleteAllDocsFromCollection('adDepartments')
				// if the promise is resolved with the docs, then resolve this promise with the docs
				.then((result) => {
					resolve(result);
				})
				// if the promise is rejected with an error, then reject this promise with an error
				.catch((error) => {
					reject(error);
				});
		}),

	DeleteAllADManagersSimpleFromDatabase: () =>
		// return a new promise
		new Promise((resolve, reject) => {
			// get a promise to retrieve all documents from the adManagersFlat document collection
			nesoDBQueries.DeleteAllDocsFromCollection('adManagersFlat')
				// if the promise is resolved with the docs, then resolve this promise with the docs
				.then((result) => {
					resolve(result);
				})
				// if the promise is rejected with an error, then reject this promise with an error
				.catch((error) => {
					reject(error);
				});
		}),

	DeleteAllADManagersWithFullFlatDownlinesFromDatabase: () =>
		// return a new promise
		new Promise((resolve, reject) => {
			// get a promise to retrieve all documents from the 
			// 		adManagersWithFullFlatDownlines document collection
			nesoDBQueries.DeleteAllDocsFromCollection('adManagersWithFullFlatDownlines')
				// if the promise is resolved with the docs, then resolve this promise with the docs
				.then((result) => {
					resolve(result);
				})
				// if the promise is rejected with an error, then reject this promise with an error
				.catch((error) => {
					reject(error);
				});
		}),

	DeleteAllADManagersWithFullHierarchicalDownlinesFromDatabase: () =>
		// return a new promise
		new Promise((resolve, reject) => {
			// get a promise to retrieve all documents from the 
			// 		adManagersWithFullHierarchicalDownlines document collection
			nesoDBQueries.DeleteAllDocsFromCollection('adManagersWithFullHierarchicalDownlines')
				// if the promise is resolved with the docs, then resolve this promise with the docs
				.then((result) => {
					resolve(result);
				})
				// if the promise is rejected with an error, then reject this promise with an error
				.catch((error) => {
					reject(error);
				});
		}),
	
	// DB INSERTIONS

	AddAllADUsersToDatabase: adUsers =>
		// return a new promise
		new Promise((resolve, reject) => {
			// get a promise to retrieve all documents from the emailQueue document collection
			nesoDBQueries.InsertDocIntoCollection(adUsers, 'adUsers')
				// if the promise is resolved with the result, then resolve this promise with the result
				.then((result) => {
					resolve(result);
				})
				// if the promise is rejected with an error, then reject this promise with an error
				.catch((error) => {
					reject(error);
				});
		}),

	AddAllADUsersByDivisionDepartmentToDatabase: adUsersByDivisionDepartment =>
		// return a new promise
		new Promise((resolve, reject) => {
			// get a promise to retrieve all documents from the emailQueue document collection
			nesoDBQueries.InsertDocIntoCollection(adUsersByDivisionDepartment, 'adUsersByDivisionDepartment')
				// if the promise is resolved with the result, then resolve this promise with the result
				.then((result) => {
					resolve(result);
				})
				// if the promise is rejected with an error, then reject this promise with an error
				.catch((error) => {
					reject(error);
				});
		}),

	AddAllADDepartmentsToDatabase: adDepartments =>
		// return a new promise
		new Promise((resolve, reject) => {
			// get a promise to retrieve all documents from the emailQueue document collection
			nesoDBQueries.InsertDocIntoCollection(adDepartments, 'adDepartments')
				// if the promise is resolved with the result, then resolve this promise with the result
				.then((result) => {
					resolve(result);
				})
				// if the promise is rejected with an error, then reject this promise with an error
				.catch((error) => {
					reject(error);
				});
		}),

	AddAllADManagersSimpleToDatabase: adManagers =>
		// return a new promise
		new Promise((resolve, reject) => {
			// get a promise to retrieve all documents from the emailQueue document collection
			nesoDBQueries.InsertDocIntoCollection(adManagers, 'adManagersFlat')
				// if the promise is resolved with the result, then resolve this promise with the result
				.then((result) => {
					resolve(result);
				})
				// if the promise is rejected with an error, then reject this promise with an error
				.catch((error) => {
					reject(error);
				});
		}),

	AddAllADManagersWithFullFlatDownlinesToDatabase: adManagers =>
		// return a new promise
		new Promise((resolve, reject) => {
			// get a promise to insert all documents into the 
			// 		adManagersWithFullFlatDownlines document collection
			nesoDBQueries.InsertDocIntoCollection(adManagers, 'adManagersWithFullFlatDownlines')
				// if the promise is resolved with the result, then resolve this promise with the result
				.then((result) => {
					resolve(result);
				})
				// if the promise is rejected with an error, then reject this promise with an error
				.catch((error) => {
					reject(error);
				});
		}),

	AddAllADManagersWithFullHierarchicalDownlinesToDatabase: adManagers =>
		// return a new promise
		new Promise((resolve, reject) => {
			// get a promise to insert all documents into the 
			// 		adManagersWithFullHierarchicalDownlines document collection
			nesoDBQueries.InsertDocIntoCollection(adManagers, 'adManagersWithFullHierarchicalDownlines')
				// if the promise is resolved with the result, then resolve this promise with the result
				.then((result) => {
					resolve(result);
				})
				// if the promise is rejected with an error, then reject this promise with an error
				.catch((error) => {
					reject(error);
				});
		}),

	// PARENT PROCESSES

	// scheduled
	ProcessADUsersData: () =>
		// return a new promise
		new Promise((resolve, reject) => {
			// get a promise to retrieve ad processing status
			module.exports.ReturnADDataProcessingStatus()
				// if the promise is resolved with the setting
				.then((adUsersDataProcessingStatus) => {
					// if it's ok to process ad users
					if (adUsersDataProcessingStatus.dataProcessingStatus === true) {
						// get a promise to set dataProcessingNow to true
						module.exports.ReplaceOneADSetting({
							dataProcessingNow: true,
						})
							// if the promise to set dataProcessingNow to true was resolved
							.then((replaceOneActiveDirectorySettingResult) => {
								// get a promise to get all ad users from csv
								module.exports.ReturnAllADUsersFromCSVWithLegacyPhoneNumbers()
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
														module.exports.ReplaceOneADSetting({
															dataProcessingNow: false,
														})
															// if the promise to set dataProcessingNow 
															//		to false was resolved with the result
															.then((replaceOneActiveDirectorySettingSecondResult) => {
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
														module.exports.ReplaceOneADSetting({
															dataProcessingNow: false,
														})
															// if the promise to set dataProcessingNow 
															//		to false was resolved with the result
															.then((replaceOneActiveDirectorySettingSecondResult) => {
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
												module.exports.ReplaceOneADSetting({
													dataProcessingNow: false,
												})
													// if the promise to set dataProcessingNow 
													// 		to false was resolved with the result
													.then((replaceOneActiveDirectorySettingSecondResult) => {
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
										module.exports.ReplaceOneADSetting({
											dataProcessingNow: false,
										})
											// if the promise to set dataProcessingNow 
											// 		to false was resolved with the result
											.then((replaceOneActiveDirectorySettingSecondResult) => {
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
		}),
	// scheduled
	ProcessADUsersByDivisionDepartmentData: () =>
		// return a new promise
		new Promise((resolve, reject) => {
			// get a promise to retrieve ad processing status
			module.exports.ReturnADDataProcessingStatus()
				// if the promise is resolved with the setting
				.then((adUsersDataProcessingStatus) => {
					// if it's ok to process ad users
					if (adUsersDataProcessingStatus.dataProcessingStatus === true) {
						// get a promise to set dataProcessingNow to true
						module.exports.ReplaceOneADSetting({
							dataProcessingNow: true,
						})
							// if the promise to set dataProcessingNow to true was resolved
							.then((replaceOneActiveDirectorySettingResult) => {
								// get a promise to get all ad users from csv
								module.exports.ReturnAllADUsersByDivisionDepartmentFromCSV()
									// if the promise to get all ad users from csv was resolved with the ad users
									.then((returnAllADUsersByDivisionDepartmentFromADUsersResult) => {
										// extract the data from the result
										const {
											adUsersByDivisionDepartment,
										} =
											returnAllADUsersByDivisionDepartmentFromADUsersResult;
										// get a promise to delete all ad users from the database
										module.exports.DeleteAllADUsersByDivisionDepartmentFromDatabase()
											// if the promise to delete all ad users from the database was resolved
											.then((deleteAllADUsersByDivisionDepartmentFromDatabaseResult) => {
												// get a promise to add ad users from csv to the database
												module.exports
													.AddAllADUsersByDivisionDepartmentToDatabase(adUsersByDivisionDepartment)
													// if the promise to add ad users from csv to the database was resolved
													.then((addAllADUsersByDivisionDepartmentToDatabaseResult) => {
														// get a promise to set dataProcessingNow to false
														module.exports.ReplaceOneADSetting({
															dataProcessingNow: false,
														})
															// if the promise to set dataProcessingNow 
															// 		to false was resolved with the result
															.then((replaceOneActiveDirectorySettingSecondResult) => {
																// resolve this promise with a message
																resolve({
																	error: false,
																});
															})
															// if the promise to set dataProcessingNow 
															// 		to false was rejected with an error
															.catch((error) => {
																// reject this promise with the error
																reject(error);
															});
													})
													// if the promise to add ad users from csv 
													// 		to the database was rejected with an error
													.catch((addAllADUsersByDivisionDepartmentToDatabaseError) => {
														// get a promise to set dataProcessingNow to false
														module.exports.ReplaceOneADSetting({
															dataProcessingNow: false,
														})
															// if the promise to set dataProcessingNow to false 
															// 		was resolved with the result
															.then((replaceOneActiveDirectorySettingSecondResult) => {
																// reject this promise with the error
																reject(addAllADUsersByDivisionDepartmentToDatabaseError);
															})
															// if the promise to add ad users from csv 
															// 		to the database was rejected with an error
															.catch((replaceOneADSettingError) => {
																// construct a custom error
																const errorToReport = {
																	error: true,
																	mongoDBError: true,
																	errorCollection: [
																		addAllADUsersByDivisionDepartmentToDatabaseError
																			.mongoDBErrorDetails,
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
											// if the promise to delete all ad users from the database 
											// 		was rejected with an error
											.catch((deleteAllADUsersByDivisionDepartmentFromDatabaseError) => {
												// get a promise to set dataProcessingNow to false
												module.exports.ReplaceOneADSetting({
													dataProcessingNow: false,
												})
													// if the promise to set dataProcessingNow 
													// 		to false was resolved with the result
													.then((replaceOneActiveDirectorySettingSecondResult) => {
														// reject this promise with the error
														reject(deleteAllADUsersByDivisionDepartmentFromDatabaseError);
													})
													// if the promise to add ad users from csv 
													// 		to the database was rejected with an error
													.catch((replaceOneADSettingError) => {
														// construct a custom error
														const errorToReport = {
															error: true,
															mongoDBError: true,
															errorCollection: [
																deleteAllADUsersByDivisionDepartmentFromDatabaseError
																	.mongoDBErrorDetails,
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
									.catch((returnAllADUsersByDivisionDepartmentFromADUsersError) => {
										// get a promise to set dataProcessingNow to false
										module.exports.ReplaceOneADSetting({
											dataProcessingNow: false,
										})
											// if the promise to set dataProcessingNow to false 
											// 		was resolved with the result
											.then((replaceOneActiveDirectorySettingSecondResult) => {
												// reject this promise with the error
												reject(returnAllADUsersByDivisionDepartmentFromADUsersError);
											})
											// if the promise to add ad users from csv to the database 
											// 		was rejected with an error
											.catch((replaceOneADSettingError) => {
												// construct a custom error
												const errorToReport = {
													error: true,
													mongoDBError: true,
													errorCollection: [
														returnAllADUsersByDivisionDepartmentFromADUsersError
															.mongoDBErrorDetails,
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
		}),
	// scheduled
	ProcessADDepartments: () =>
		// return a new promise
		new Promise((resolve, reject) => {
			// get a promise to retrieve ad processing status
			module.exports.ReturnADDataProcessingStatus()
				// if the promise is resolved with the setting
				.then((adUsersDataProcessingStatus) => {
					// if it's ok to process ad users
					if (adUsersDataProcessingStatus.dataProcessingStatus === true) {
						// get a promise to set dataProcessingNow to true
						module.exports.ReplaceOneADSetting({
							dataProcessingNow: true,
						})
							// if the promise to set dataProcessingNow to true was resolved
							.then((replaceOneActiveDirectorySettingResult) => {
								// get a promise to get all ad users from csv
								module.exports.ReturnAllADDepartmentsFromADUsersByDivisionDepartment()
									// if the promise to get all ad users from csv was resolved with the ad users
									.then((returnAllADDepartmentsFromADUsersByDivisionDepartmentResult) => {
										// get a promise to delete all ad depts from the database
										module.exports.DeleteAllADDepartmentsFromDatabase()
											// if the promise to delete all ad depts from the database was resolved
											.then((deleteAllActiveDirectoryDeptsFromDatabaseResult) => {
												// extract data (just to keep line length short, really)
												const {
													adDepartments,
												} =
													returnAllADDepartmentsFromADUsersByDivisionDepartmentResult;
												// get a promise to add ad users from csv to the database
												module.exports
													.AddAllADDepartmentsToDatabase(adDepartments)
													// if the promise to add ad users from csv to the database was resolved
													.then((addAllActiveDirectoryDepartmentsToDatabaseResult) => {
														// get a promise to set dataProcessingNow to false
														module.exports.ReplaceOneADSetting({
															dataProcessingNow: false,
														})
															// if the promise to set dataProcessingNow 
															//		to false was resolved with the result
															.then((replaceOneActiveDirectorySettingSecondResult) => {
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
													.catch((addAllActiveDirectoryDepartmentsToDatabaseError) => {
														// get a promise to set dataProcessingNow to false
														module.exports.ReplaceOneADSetting({
															dataProcessingNow: false,
														})
															// if the promise to set dataProcessingNow 
															//		to false was resolved with the result
															.then((replaceOneActiveDirectorySettingSecondResult) => {
																// reject this promise with the error
																reject(addAllActiveDirectoryDepartmentsToDatabaseError);
															})
															// if the promise to add ad users from 
															// 		csv to the database was rejected with an error
															.catch((replaceOneADSettingError) => {
																// construct a custom error
																const errorToReport = {
																	error: true,
																	mongoDBError: true,
																	errorCollection: [
																		addAllActiveDirectoryDepartmentsToDatabaseError
																			.mongoDBErrorDetails,
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
											.catch((deleteAllActiveDirectoryDeptsFromDatabaseError) => {
												// get a promise to set dataProcessingNow to false
												module.exports.ReplaceOneADSetting({
													dataProcessingNow: false,
												})
													// if the promise to set dataProcessingNow 
													// 		to false was resolved with the result
													.then((replaceOneActiveDirectorySettingSecondResult) => {
														// reject this promise with the error
														reject(deleteAllActiveDirectoryDeptsFromDatabaseError);
													})
													// if the promise to add ad users from csv 
													// 		to the database was rejected with an error
													.catch((replaceOneADSettingError) => {
														// construct a custom error
														const errorToReport = {
															error: true,
															mongoDBError: true,
															errorCollection: [
																deleteAllActiveDirectoryDeptsFromDatabaseError.mongoDBErrorDetails,
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
									.catch((returnAllADDepartmentsFromADUsersByDivisionDepartmentError) => {
										// get a promise to set dataProcessingNow to false
										module.exports.ReplaceOneADSetting({
											dataProcessingNow: false,
										})
											// if the promise to set dataProcessingNow 
											// 		to false was resolved with the result
											.then((replaceOneActiveDirectorySettingSecondResult) => {
												// reject this promise with the error
												reject(returnAllADDepartmentsFromADUsersByDivisionDepartmentError);
											})
											// if the promise to add ad users from csv 
											// 		to the database was rejected with an error
											.catch((replaceOneADSettingError) => {
												// construct a custom error
												const errorToReport = {
													error: true,
													mongoDBError: true,
													errorCollection: [
														returnAllADDepartmentsFromADUsersByDivisionDepartmentError
															.mongoDBErrorDetails,
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
		}),
	// scheduled
	ProcessADManagersSimple: () =>
		// return a new promise
		new Promise((resolve, reject) => {
			// get a promise to retrieve ad processing status
			module.exports.ReturnADDataProcessingStatus()
				// if the promise is resolved with the setting
				.then((adUsersDataProcessingStatus) => {
					// if it's ok to process ad users
					if (adUsersDataProcessingStatus.dataProcessingStatus === true) {
						// get a promise to set dataProcessingNow to true
						module.exports.ReplaceOneADSetting({
							dataProcessingNow: true,
						})
							// if the promise to set dataProcessingNow to true was resolved
							.then((replaceOneActiveDirectorySettingResult) => {
								// get a promise to get all ad users from csv
								module.exports.ReturnAllADManagersSimpleFromADUsersByDivisionDepartment()
									// if the promise to get all ad users from csv was resolved with the ad users
									.then((returnAllADManagersFromADUsersByDivisionDepartmentResult) => {
										// get a promise to delete all ad depts from the database
										module.exports.DeleteAllADManagersSimpleFromDatabase()
											// if the promise to delete all ad depts from the database was resolved
											.then((deleteAllADManagersFromDatabaseResult) => {
												// extract data (just to keep line length short, really)
												const {
													adManagers,
												} =
													returnAllADManagersFromADUsersByDivisionDepartmentResult;
												// get a promise to add ad users from csv to the database
												module.exports
													.AddAllADManagersSimpleToDatabase(adManagers)
													// if the promise to add ad users from csv to the database was resolved
													.then((addAllActiveDirectoryManagersToDatabaseResult) => {
														// get a promise to set dataProcessingNow to false
														module.exports.ReplaceOneADSetting({
															dataProcessingNow: false,
														})
															// if the promise to set dataProcessingNow 
															//		to false was resolved with the result
															.then((replaceOneActiveDirectorySettingSecondResult) => {
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
													.catch((addAllActiveDirectoryDepartmentsToDatabaseError) => {
														// get a promise to set dataProcessingNow to false
														module.exports.ReplaceOneADSetting({
															dataProcessingNow: false,
														})
															// if the promise to set dataProcessingNow 
															//		to false was resolved with the result
															.then((replaceOneActiveDirectorySettingSecondResult) => {
																// reject this promise with the error
																reject(addAllActiveDirectoryDepartmentsToDatabaseError);
															})
															// if the promise to add ad users from 
															// 		csv to the database was rejected with an error
															.catch((replaceOneADSettingError) => {
																// construct a custom error
																const errorToReport = {
																	error: true,
																	mongoDBError: true,
																	errorCollection: [
																		addAllActiveDirectoryDepartmentsToDatabaseError
																			.mongoDBErrorDetails,
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
											.catch((deleteAllActiveDirectoryDeptsFromDatabaseError) => {
												// get a promise to set dataProcessingNow to false
												module.exports.ReplaceOneADSetting({
													dataProcessingNow: false,
												})
													// if the promise to set dataProcessingNow 
													// 		to false was resolved with the result
													.then((replaceOneActiveDirectorySettingSecondResult) => {
														// reject this promise with the error
														reject(deleteAllActiveDirectoryDeptsFromDatabaseError);
													})
													// if the promise to add ad users from csv 
													// 		to the database was rejected with an error
													.catch((replaceOneADSettingError) => {
														// construct a custom error
														const errorToReport = {
															error: true,
															mongoDBError: true,
															errorCollection: [
																deleteAllActiveDirectoryDeptsFromDatabaseError.mongoDBErrorDetails,
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
									.catch((returnAllADDepartmentsFromADUsersByDivisionDepartmentError) => {
										// get a promise to set dataProcessingNow to false
										module.exports.ReplaceOneADSetting({
											dataProcessingNow: false,
										})
											// if the promise to set dataProcessingNow 
											// 		to false was resolved with the result
											.then((replaceOneActiveDirectorySettingSecondResult) => {
												// reject this promise with the error
												reject(returnAllADDepartmentsFromADUsersByDivisionDepartmentError);
											})
											// if the promise to add ad users from csv 
											// 		to the database was rejected with an error
											.catch((replaceOneADSettingError) => {
												// construct a custom error
												const errorToReport = {
													error: true,
													mongoDBError: true,
													errorCollection: [
														returnAllADDepartmentsFromADUsersByDivisionDepartmentError
															.mongoDBErrorDetails,
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
		}),
	// scheduled
	ProcessADManagersWithFullFlatDownlines: () =>
		// return a new promise
		new Promise((resolve, reject) => {
			// get a promise to retrieve ad processing status
			module.exports.ReturnADDataProcessingStatus()
				// if the promise is resolved with the setting
				.then((adUsersDataProcessingStatus) => {
					// if it's ok to process ad users
					if (adUsersDataProcessingStatus.dataProcessingStatus === true) {
						// get a promise to set dataProcessingNow to true
						module.exports.ReplaceOneADSetting({
							dataProcessingNow: true,
						})
							// if the promise to set dataProcessingNow to true was resolved
							.then((replaceOneActiveDirectorySettingResult) => {
								// get a promise to get all ad users from csv
								module.exports.ReturnAllADManagersWithFullFlatDownlinesFromDBQueries()
									// if the promise to get all ad users from csv was resolved with the ad users
									.then((returnResult) => {
										// get a promise to delete all ad depts from the database
										module.exports.DeleteAllADManagersWithFullFlatDownlinesFromDatabase()
											// if the promise to delete all ad depts from the database was resolved
											.then((deleteResult) => {
												// extract data (just to keep line length short, really)
												const {
													adManagers,
												} =
													returnResult;
												// get a promise to add ad users from csv to the database
												module.exports
													.AddAllADManagersWithFullFlatDownlinesToDatabase(adManagers)
													// if the promise to add ad users from csv to the database was resolved
													.then((addResult) => {
														// get a promise to set dataProcessingNow to false
														module.exports.ReplaceOneADSetting({
															dataProcessingNow: false,
														})
															// if the promise to set dataProcessingNow 
															//		to false was resolved with the result
															.then((replaceOneActiveDirectorySettingSecondResult) => {
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
													.catch((addAllActiveDirectoryDepartmentsToDatabaseError) => {
														// get a promise to set dataProcessingNow to false
														module.exports.ReplaceOneADSetting({
															dataProcessingNow: false,
														})
															// if the promise to set dataProcessingNow 
															//		to false was resolved with the result
															.then((replaceOneActiveDirectorySettingSecondResult) => {
																// reject this promise with the error
																reject(addAllActiveDirectoryDepartmentsToDatabaseError);
															})
															// if the promise to add ad users from 
															// 		csv to the database was rejected with an error
															.catch((replaceOneADSettingError) => {
																// construct a custom error
																const errorToReport = {
																	error: true,
																	mongoDBError: true,
																	errorCollection: [
																		addAllActiveDirectoryDepartmentsToDatabaseError
																			.mongoDBErrorDetails,
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
											.catch((deleteAllActiveDirectoryDeptsFromDatabaseError) => {
												// get a promise to set dataProcessingNow to false
												module.exports.ReplaceOneADSetting({
													dataProcessingNow: false,
												})
													// if the promise to set dataProcessingNow 
													// 		to false was resolved with the result
													.then((replaceOneActiveDirectorySettingSecondResult) => {
														// reject this promise with the error
														reject(deleteAllActiveDirectoryDeptsFromDatabaseError);
													})
													// if the promise to add ad users from csv 
													// 		to the database was rejected with an error
													.catch((replaceOneADSettingError) => {
														// construct a custom error
														const errorToReport = {
															error: true,
															mongoDBError: true,
															errorCollection: [
																deleteAllActiveDirectoryDeptsFromDatabaseError.mongoDBErrorDetails,
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
									.catch((returnAllADDepartmentsFromADUsersByDivisionDepartmentError) => {
										// get a promise to set dataProcessingNow to false
										module.exports.ReplaceOneADSetting({
											dataProcessingNow: false,
										})
											// if the promise to set dataProcessingNow 
											// 		to false was resolved with the result
											.then((replaceOneActiveDirectorySettingSecondResult) => {
												// reject this promise with the error
												reject(returnAllADDepartmentsFromADUsersByDivisionDepartmentError);
											})
											// if the promise to add ad users from csv 
											// 		to the database was rejected with an error
											.catch((replaceOneADSettingError) => {
												// construct a custom error
												const errorToReport = {
													error: true,
													mongoDBError: true,
													errorCollection: [
														returnAllADDepartmentsFromADUsersByDivisionDepartmentError
															.mongoDBErrorDetails,
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
		}),
	// scheduled
	ProcessADManagersWithFullHierarchicalDownlines: () =>
		// return a new promise
		new Promise((resolve, reject) => {
			// get a promise to retrieve ad processing status
			module.exports.ReturnADDataProcessingStatus()
				// if the promise is resolved with the setting
				.then((adUsersDataProcessingStatus) => {
					// if it's ok to process ad users
					if (adUsersDataProcessingStatus.dataProcessingStatus === true) {
						// get a promise to set dataProcessingNow to true
						module.exports.ReplaceOneADSetting({
							dataProcessingNow: true,
						})
							// if the promise to set dataProcessingNow to true was resolved
							.then((replaceOneActiveDirectorySettingResult) => {
								// get a promise to get all ad users from csv
								module.exports.ReturnAllADManagersWithFullHierarchicalDownlinesFromDBQueries()
									// if the promise to get all ad users from csv was resolved with the ad users
									.then((returnAllADManagersWithFullHierarchicalDownlineFromDBQueriesResult) => {
										// get a promise to delete all ad depts from the database
										module.exports.DeleteAllADManagersWithFullHierarchicalDownlinesFromDatabase()
											// if the promise to delete all ad depts from the database was resolved
											.then((deleteResult) => {
												// extract data (just to keep line length short, really)
												const {
													adManagers,
												} =
													returnAllADManagersWithFullHierarchicalDownlineFromDBQueriesResult;
												// get a promise to add ad users from csv to the database
												module.exports
													.AddAllADManagersWithFullHierarchicalDownlinesToDatabase(adManagers)
													// if the promise to add ad users from csv to the database was resolved
													.then((addResult) => {
														// get a promise to set dataProcessingNow to false
														module.exports.ReplaceOneADSetting({
															dataProcessingNow: false,
														})
															// if the promise to set dataProcessingNow 
															//		to false was resolved with the result
															.then((replaceOneActiveDirectorySettingSecondResult) => {
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
													.catch((addAllActiveDirectoryDepartmentsToDatabaseError) => {
														// get a promise to set dataProcessingNow to false
														module.exports.ReplaceOneADSetting({
															dataProcessingNow: false,
														})
															// if the promise to set dataProcessingNow 
															//		to false was resolved with the result
															.then((replaceOneActiveDirectorySettingSecondResult) => {
																// reject this promise with the error
																reject(addAllActiveDirectoryDepartmentsToDatabaseError);
															})
															// if the promise to add ad users from 
															// 		csv to the database was rejected with an error
															.catch((replaceOneADSettingError) => {
																// construct a custom error
																const errorToReport = {
																	error: true,
																	mongoDBError: true,
																	errorCollection: [
																		addAllActiveDirectoryDepartmentsToDatabaseError
																			.mongoDBErrorDetails,
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
											.catch((deleteAllActiveDirectoryDeptsFromDatabaseError) => {
												// get a promise to set dataProcessingNow to false
												module.exports.ReplaceOneADSetting({
													dataProcessingNow: false,
												})
													// if the promise to set dataProcessingNow 
													// 		to false was resolved with the result
													.then((replaceOneActiveDirectorySettingSecondResult) => {
														// reject this promise with the error
														reject(deleteAllActiveDirectoryDeptsFromDatabaseError);
													})
													// if the promise to add ad users from csv 
													// 		to the database was rejected with an error
													.catch((replaceOneADSettingError) => {
														// construct a custom error
														const errorToReport = {
															error: true,
															mongoDBError: true,
															errorCollection: [
																deleteAllActiveDirectoryDeptsFromDatabaseError.mongoDBErrorDetails,
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
									.catch((returnAllADDepartmentsFromADUsersByDivisionDepartmentError) => {
										// get a promise to set dataProcessingNow to false
										module.exports.ReplaceOneADSetting({
											dataProcessingNow: false,
										})
											// if the promise to set dataProcessingNow 
											// 		to false was resolved with the result
											.then((replaceOneActiveDirectorySettingSecondResult) => {
												// reject this promise with the error
												reject(returnAllADDepartmentsFromADUsersByDivisionDepartmentError);
											})
											// if the promise to add ad users from csv 
											// 		to the database was rejected with an error
											.catch((replaceOneADSettingError) => {
												// construct a custom error
												const errorToReport = {
													error: true,
													mongoDBError: true,
													errorCollection: [
														returnAllADDepartmentsFromADUsersByDivisionDepartmentError
															.mongoDBErrorDetails,
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
		}),

	// DATA MANIPULATION

	ReturnAllADUsersFromCSV: () =>
		// return a new promise
		new Promise((resolve, reject) => {
			// get a promise to retrieve excel settings
			module.exports.ReturnADCSVSettings()
				// if the promise to retrieve excel settings is resolved with the settings
				.then((settings) => {
					// try to resolve this promise with the ad users data
					try {
						// make a copy of the file to read
						const newUsersFilePathAndName =
							module.exports.ReturnNewADUsersFilePathAndName(settings.csv.usersFilePathAndName);
						fse
							.copy(settings.csv.usersFilePathAndName, newUsersFilePathAndName, { overwrite: true })
							.then(() => {
								// get data from the csv file
								csv().fromFile(newUsersFilePathAndName)
									// when the data has been parsed
									.on('end_parsed', (adUsersRaw) => {
										// console.log(adUsersRaw);
										// set up an empty array to receive a transformed version of the data
										const adUsersTransformed = [];
										// iterate over raw users array
										adUsersRaw.forEach((adUserRaw, adUserRawIndex) => {
											// ignore any empty results; we test against the value 
											// 		that will be the unique ID because we can't 
											//		use any results without a unique ID anyway
											if (typeof (adUserRaw.userPrincipalName) !== 'undefined') {
												// if this user is in the TrackIt Users or Contractors OU
												const adSPathArray = adUserRaw.ADsPath.split(',');
												if (
													// adSPathArray has multiple elements
													adSPathArray.length > 1 &&
													// adSPathArray[1] is either TrackIt Users or Contractors
													(adSPathArray[1] === 'OU=TrackIt Users' || adSPathArray[1] === 'OU=Contractors')
												) {
													// extract and transform some of the data
													const userAccount = nesoUtilities.StrInStr({
														incomingHaystack: adUserRaw.userPrincipalName.toLowerCase(),
														incomingNeedle: '@mos.org',
														flag: 1,
													});
													// TEMP
													const allGroupsAllDataArray = adUserRaw.memberOf.split(', ');
													const securityGroups = [];
													allGroupsAllDataArray
														.forEach((oneGroupWithAllDataString, oneGroupWithAllDataStringIndex) => {
															const oneGroupWithAllDataArray = oneGroupWithAllDataString.split(',');
															if (
																// oneGroupWithAllDataArray has multiple elements
																oneGroupWithAllDataArray.length > 1 &&
																// oneGroupWithAllDataArray[1] contains 'Groups'
																nesoUtilities.StrInStr({
																	incomingHaystack: oneGroupWithAllDataArray[1],
																	incomingNeedle: 'Groups',
																}) &&
																// oneGroupWithAllDataArray[1] does not contain 'Exchange'
																nesoUtilities.StrInStr({
																	incomingHaystack: oneGroupWithAllDataArray[1],
																	incomingNeedle: 'Exchange',
																}) === false &&
																// oneGroupWithAllDataArray[1] does not contain 'FileMaker'
																nesoUtilities.StrInStr({
																	incomingHaystack: oneGroupWithAllDataArray[1],
																	incomingNeedle: 'FileMaker',
																}) === false
															) {
																securityGroups.push(nesoUtilities.StrInStr({
																	incomingHaystack: oneGroupWithAllDataArray[0],
																	incomingNeedle: 'CN=',
																	flag: 3,
																}));
															}
														});

													// push a transformed user to adUsersTransformed
													adUsersTransformed.push({
														account: userAccount,
														employeeID: adUserRaw.employeeID,
														firstName: adUserRaw.givenName,
														lastName: adUserRaw.sn,
														firstInitial: adUserRaw.givenName.slice(0, 1).toUpperCase(),
														lastInitial: adUserRaw.sn.slice(0, 1).toUpperCase(),
														displayName: adUserRaw.displayName,
														title: adUserRaw.title,
														email: adUserRaw.mail,
														officePhone: adUserRaw.telephoneNumber,
														mobilePhone: adUserRaw.mobile,
														manager: adUserRaw.manager,
														department: adUserRaw.department,
														division: adUserRaw.division,
														securityGroups,
													});
												}
											}
										});

										// resolve this promise with a message
										resolve({
											error: false,
											csvError: false,
											activeDirectoryUsers: adUsersTransformed,
										});
										fse
											.remove(newUsersFilePathAndName)
											.then(() => {
												// console.log('FILE REMOVED');
											})
											.catch((err) => {
												// construct a custom error
												const errorToReport = {
													error: true,
													fileRemovalError: true,
												};
												// process error
												nesoErrors.ProcessError(errorToReport);
												// reject this promise with an error
												reject(errorToReport);
											});
									});
							})
							.catch((err) => {
								// construct a custom error
								const errorToReport = {
									error: true,
									fileCopyError: true,
								};
								// process error
								nesoErrors.ProcessError(errorToReport);
								// reject this promise with an error
								reject(errorToReport);
							});
						// if there was an error
					} catch (exception) {
						// console.log(exception);
						// construct a custom error
						const errorToReport = {
							error: true,
							csvError: true,
						};
						// process error
						nesoErrors.ProcessError(errorToReport);
						// reject this promise with an error
						reject(errorToReport);
					}
				})
				// if the promise is rejected with an error, then reject this promise with an error
				.catch((error) => {
					reject(error);
				});
		}),

	ReturnAllADUsersFromCSVWithLegacyPhoneNumbers: () =>
		// return a new promise
		new Promise((resolve, reject) => {
			// get a promise to retrieve excel settings
			module.exports.ReturnADCSVSettings()
				// if the promise to retrieve excel settings is resolved with the settings
				.then((settings) => {
					// try to resolve this promise with the ad users data
					try {
						// make a copy of the file to read
						const newUsersFilePathAndName =
							module.exports.ReturnNewADUsersFilePathAndName(settings.csv.usersFilePathAndName);
						fse
							.copy(settings.csv.usersFilePathAndName, newUsersFilePathAndName, { overwrite: true })
							.then(() => {
								// get data from the csv file
								csv().fromFile(newUsersFilePathAndName)
									// when the data has been parsed
									.on('end_parsed', (adUsersRaw) => {
										// console.log(adUsersRaw);
										// get a promise to retrieve all documents from the adUsers document collection
										nesoDBQueries.ReturnAllDocsFromCollection('legacyPhoneNumbers')
											// if the promise is resolved with the docs, 
											// 		then resolve this promise with the docs
											.then((result) => {
												const legacyPhoneNumbersArray = result.docs;
												// console.log(legacyPhoneNumbersArray);
												// set up an empty array to receive a transformed version of the data
												const adUsersTransformed = [];
												// iterate over raw users array
												adUsersRaw.forEach((adUserRaw, adUserRawIndex) => {
													// ignore any empty results; we test against the value 
													// 		that will be the unique ID because we can't 
													//		use any results without a unique ID anyway
													if (typeof (adUserRaw.userPrincipalName) !== 'undefined') {
														// if this user is in the TrackIt Users or Contractors OU
														const adSPathArray = adUserRaw.ADsPath.split(',');
														if (
															// adSPathArray has multiple elements
															adSPathArray.length > 1 &&
															// adSPathArray[1] is either TrackIt Users or Contractors
															(adSPathArray[1] === 'OU=TrackIt Users' || adSPathArray[1] === 'OU=Contractors')
														) {
															// extract and transform some of the data
															const userAccount = nesoUtilities.StrInStr({
																incomingHaystack: adUserRaw.userPrincipalName.toLowerCase(),
																incomingNeedle: '@mos.org',
																flag: 1,
															});
															// TEMP
															let userOfficePhone = adUserRaw.telephoneNumber;
															const allGroupsAllDataArray = adUserRaw.memberOf.split(', ');
															const securityGroups = [];
															allGroupsAllDataArray
																.forEach((oneGroupWithAllDataString, oneGroupWithAllDataStringIndex) => {
																	const oneGroupWithAllDataArray = oneGroupWithAllDataString.split(',');
																	if (
																		// oneGroupWithAllDataArray has multiple elements
																		oneGroupWithAllDataArray.length > 1 &&
																		// oneGroupWithAllDataArray[1] contains 'Groups'
																		nesoUtilities.StrInStr({
																			incomingHaystack: oneGroupWithAllDataArray[1],
																			incomingNeedle: 'Groups',
																		}) &&
																		// oneGroupWithAllDataArray[1] does not contain 'Exchange'
																		nesoUtilities.StrInStr({
																			incomingHaystack: oneGroupWithAllDataArray[1],
																			incomingNeedle: 'Exchange',
																		}) === false &&
																		// oneGroupWithAllDataArray[1] does not contain 'FileMaker'
																		nesoUtilities.StrInStr({
																			incomingHaystack: oneGroupWithAllDataArray[1],
																			incomingNeedle: 'FileMaker',
																		}) === false
																	) {
																		securityGroups.push(nesoUtilities.StrInStr({
																			incomingHaystack: oneGroupWithAllDataArray[0],
																			incomingNeedle: 'CN=',
																			flag: 3,
																		}));
																	}
																});
															// if the user doesn't have a proper office phone
															if (userOfficePhone.length < 5) {
																legacyPhoneNumbersArray.forEach((personObject, personIndex) => {
																	if (personObject.account === userAccount) {
																		userOfficePhone = personObject.officePhone;
																	}
																});
															}

															// push a transformed user to adUsersTransformed
															adUsersTransformed.push({
																account: userAccount,
																employeeID: adUserRaw.employeeID,
																firstName: adUserRaw.givenName,
																lastName: adUserRaw.sn,
																firstInitial: adUserRaw.givenName.slice(0, 1).toUpperCase(),
																lastInitial: adUserRaw.sn.slice(0, 1).toUpperCase(),
																displayName: adUserRaw.displayName,
																title: adUserRaw.title,
																email: adUserRaw.mail,
																officePhone: userOfficePhone,
																mobilePhone: adUserRaw.mobile,
																manager: adUserRaw.manager,
																department: adUserRaw.department,
																division: adUserRaw.division,
																securityGroups,
															});
														}
													}
												});

												// resolve this promise with a message
												resolve({
													error: false,
													csvError: false,
													activeDirectoryUsers: adUsersTransformed,
												});
												fse
													.remove(newUsersFilePathAndName)
													.then(() => {
														// console.log('FILE REMOVED');
													})
													.catch((err) => {
														// construct a custom error
														const errorToReport = {
															error: true,
															fileRemovalError: true,
														};
														// process error
														nesoErrors.ProcessError(errorToReport);
														// reject this promise with an error
														reject(errorToReport);
													});
											})
											// if the promise is rejected with an error, 
											// 		then reject this promise with an error
											.catch((error) => {
												// construct a custom error
												const errorToReport = {
													error: true,
													legacyPhoneNumberError: true,
												};
												// process error
												nesoErrors.ProcessError(errorToReport);
												// reject this promise with an error
												reject(errorToReport);
											});
									});
							})
							.catch((err) => {
								// construct a custom error
								const errorToReport = {
									error: true,
									fileCopyError: true,
								};
								// process error
								nesoErrors.ProcessError(errorToReport);
								// reject this promise with an error
								reject(errorToReport);
							});
						// if there was an error
					} catch (exception) {
						// console.log(exception);
						// construct a custom error
						const errorToReport = {
							error: true,
							csvError: true,
						};
						// process error
						nesoErrors.ProcessError(errorToReport);
						// reject this promise with an error
						reject(errorToReport);
					}
				})
				// if the promise is rejected with an error, then reject this promise with an error
				.catch((error) => {
					reject(error);
				});
		}),


	ReturnAllADUsersByDivisionDepartmentFromCSV: () =>
		// return a new promise
		new Promise((resolve, reject) => {
			// get a promise to get all ad users from csv
			module.exports.ReturnAllADUsersFromCSVWithLegacyPhoneNumbers()
				// if the promise to get all ad users from csv was resolved with the ad users
				.then((returnAllActiveDirectoryUsersFromCSVResult) => {
					// extract the data from the result
					const adUsers = returnAllActiveDirectoryUsersFromCSVResult.activeDirectoryUsers;
					// set up empty object to receive the new data
					const adUsersByDivisionDepartment = {};
					// iterate over adUsers
					adUsers.forEach((adUser, adUserIndex) => {
						// if this user has a division and department and manager
						// 		(ReturnAllADUsersFromCSVWithLegacyPhoneNumbers() 
						// 		will not return anyone without an account)
						if (adUser.division && adUser.division !== '' &&
							adUser.department && adUser.department !== '' &&
							adUser.manager && adUser.manager !== '') {
							// get copies of the division and department names without 
							// 		characters that are illegal as MongoDB key names
							const adUserDivision = nesoUtilities.ReplaceAll('\\.', '', adUser.division);
							// console.log(adUserDivision);
							const adUserDepartment = nesoUtilities.ReplaceAll('\\.', '', adUser.department);
							// if this user's division is not already in adUsersByDivisionDepartment
							if (typeof (adUsersByDivisionDepartment[adUserDivision]) === 'undefined') {
								// add it as an empty object
								adUsersByDivisionDepartment[adUserDivision] = {};
							}
							// if this user's department is not already in adUsersByDivisionDepartment
							if (typeof (adUsersByDivisionDepartment[adUserDivision][adUserDepartment]) === 'undefined') {
								// add it as an empty object
								adUsersByDivisionDepartment[adUserDivision][adUserDepartment] = {};
								// and add the empty "managers" array to the department
								adUsersByDivisionDepartment[adUserDivision][adUserDepartment].managers = [];
								// and add the empty "members" array to the department
								adUsersByDivisionDepartment[adUserDivision][adUserDepartment].members = [];
							}
							// add this user to the department
							adUsersByDivisionDepartment[adUserDivision][adUserDepartment]
								.members.push(adUser);
							// determine whether or not this user's manager 
							// 		is already in adUsersByDivisionDepartment
							// set up flag indicating that manager is not already added
							let thisManagerAlreadyAdded = false;
							// iterate over manages already added
							adUsersByDivisionDepartment[adUserDivision][adUserDepartment].managers
								.forEach((manager, managerIndex) => {
									// if this already added manager is the user's manager
									if (manager === adUser.manager) {
										// set flag to indicate that this user's manager was already added
										thisManagerAlreadyAdded = true;
									}
								});
							// if this user's manager is not already added to adUsersByDivisionDepartment
							if (!thisManagerAlreadyAdded) {
								// add this user's manager's account to adUsersByDivisionDepartment
								adUsersByDivisionDepartment[adUserDivision][adUserDepartment]
									.managers.push(adUser.manager);
							}
						}
					});
					// get an array of adUsersByDivisionDepartment's property keys
					const adDivisionKeys = Object.keys(adUsersByDivisionDepartment);
					// set up vars for tracking whether or not all divisions have been processed
					const adDivisionsQuantity = adDivisionKeys.length;
					let adDivisionsProcessedQuantity = 0;
					// effectively, convert department managers from accounts to profiles
					// iterate over the array of adUsersByDivisionDepartment's property keys
					adDivisionKeys.forEach((adDivisionKey) => {
						// increment the number of divisions processed
						adDivisionsProcessedQuantity += 1;
						// get an array of this division's property keys
						const adDepartmentKeys = Object.keys(adUsersByDivisionDepartment[adDivisionKey]);
						// set up vars for tracking whether or not all departments have been processed
						const adDepartmentsQuantity = adDepartmentKeys.length;
						let adDepartmentsProcessedQuantity = 0;
						// iterate over the array of this division object's property keys; 
						// 		these are departments
						adDepartmentKeys.forEach((adDepartmentKey) => {
							// increment the number of departments processed
							adDepartmentsProcessedQuantity += 1;
							// extract a copt of the managers array
							const thisDeptManagerAccounts =
								adUsersByDivisionDepartment[adDivisionKey][adDepartmentKey].managers;
							// delete the managers array
							delete adUsersByDivisionDepartment[adDivisionKey][adDepartmentKey].managers;
							// set up vars for tracking whether or not all departments have been processed
							const thisDeptManagerAccountsQuantity = thisDeptManagerAccounts.length;
							let thisDeptManagerAccountsProcessedQuantity = 0;
							// for each manager account
							thisDeptManagerAccounts.forEach((managerAccount) => {
								// try to look up the corresponding user profile
								nesoDBConnection.get('adUsers').findOne({ account: managerAccount }, {}, (error, doc) => {
									// if there was an error
									if (error || !doc) {
										// log but don't add to the new managers array
										// console.log('error');
										// console.log(error);
										// console.log('doc');
										// console.log(doc);
									} else {
										// if this department doesn't already have a managers array
										if (!adUsersByDivisionDepartment[adDivisionKey][adDepartmentKey].managers) {
											// create a new, empty managers array
											adUsersByDivisionDepartment[adDivisionKey][adDepartmentKey].managers = [];
										}
										// add the returned user profile to the new manager array
										adUsersByDivisionDepartment[adDivisionKey][adDepartmentKey]
											.managers.push(doc);
									}
									// increment the number of this department's manager accounts
									// 		that have been processed
									thisDeptManagerAccountsProcessedQuantity += 1;
									// if we're through processing all manager for all departments 
									// 		for all divisions
									if (
										(adDivisionsQuantity === adDivisionsProcessedQuantity) &&
										(adDepartmentsQuantity === adDepartmentsProcessedQuantity) &&
										(thisDeptManagerAccountsQuantity === thisDeptManagerAccountsProcessedQuantity)
									) {
										// resolve this promise with a message and the data
										resolve({
											error: false,
											csvError: false,
											adUsersByDivisionDepartment,
										});
									}
								});
							});
						});
					});
				})
				// if the promise to get all ad users from csv was rejected with an error
				.catch((returnAllActiveDirectoryUsersFromCSVError) => {
					// reject this promise with the error
					reject(returnAllActiveDirectoryUsersFromCSVError);
				});
		}),

	ReturnAllADDepartmentsFromADUsersByDivisionDepartment: () =>
		// return a new promise
		new Promise((resolve, reject) => {
			// get a promise to get all ad users by division and department from the database
			module.exports.ReturnAllUsersByDivisionDepartment()
				// if the promise to get all ad users by division and department from the database 
				// 		was resolved with the data
				.then((returnADUsersByDivisionDepartmentDataResult) => {
					// extract the data from the result
					const adUsersByDivDept = 
						returnADUsersByDivisionDepartmentDataResult.adUsersByDivisionDepartment[0];
					// set up empty object to receive the new data
					// const adDepartments = {};
					const adDepartments = {
						departments: [],
					};
					// iterate over the array of adUsersByDivDept's property keys
					Object.keys(adUsersByDivDept).forEach((adDivisionKey) => {
						// if this property key is not for the '_id' property
						if (adDivisionKey !== '_id') {
							// iterate over the array of this division object's property keys; 
							// 		these happen to be department names
							Object.keys(adUsersByDivDept[adDivisionKey]).forEach((departmentKey) => {
								adDepartments.departments.push(departmentKey);
							});
						}
					});

					// TO DO - DELETE BELOW HARD-CODING OF DEPARTMENTS ONCE ALGO HAS BETTER DATA TO CRUNCH

					adDepartments.departments.push('Courses');

					// TO DO - DELETE ABOVE HARD-CODING OF DEPARTMENTS ONCE ALGO HAS BETTER DATA TO CRUNCH

					// alphabetize the departments
					adDepartments.departments.sort();
					// resolve this promise with a message and the data
					resolve({
						error: false,
						csvError: false,
						adDepartments,
					});
				})
				// if the promise to get all ad users from csv was rejected with an error
				.catch((returnADUsersByDivisionDepartmentDataError) => {
					// reject this promise with the error
					reject(returnADUsersByDivisionDepartmentDataError);
				});
		}),

	ReturnAllADManagersSimpleFromADUsersByDivisionDepartment: () =>
		// return a new promise
		new Promise((resolve, reject) => {
			// get a promise to get all ad users by division and department from the database
			module.exports.ReturnAllUsersByDivisionDepartment()
				// if the promise to get all ad users by division and department from the database 
				// 		was resolved with the data
				.then((returnADUsersByDivisionDepartmentDataResult) => {
					// extract the data from the result
					const adUsersByDivDept =
						returnADUsersByDivisionDepartmentDataResult.adUsersByDivisionDepartment[0];
					// set up empty array to receive the new data
					const adManagers = [];
					// iterate over the array of adUsersByDivDept's property keys
					Object.keys(adUsersByDivDept).forEach((adDivisionKey) => {
						// if this property key is not for the '_id' property
						if (adDivisionKey !== '_id') {
							// iterate over the array of this division object's property keys; 
							// 		these happen to be department names
							Object.keys(adUsersByDivDept[adDivisionKey]).forEach((departmentKey) => {
								// if this department has managers
								if (adUsersByDivDept[adDivisionKey][departmentKey].managers) {
									adUsersByDivDept[adDivisionKey][departmentKey].managers
										.forEach((managerProfile) => {
											let thisManagerAlreadyAdded = false;
											adManagers.forEach((addedManagerProfile) => {
												if (
													managerProfile && managerProfile.account ===
													addedManagerProfile.account
												) {
													thisManagerAlreadyAdded = true;
												}
											});
											if (!thisManagerAlreadyAdded) {
												adManagers.push(managerProfile);
											}
										});
								}
							});
						}
					});
					// alphabetize the managers
					adManagers.sort(module.exports.ReturnUserNameWeightRelativeToAnother);
					// resolve this promise with a message and the data
					resolve({
						error: false,
						mongoDBError: false,
						adManagers,
					});
				})
				// if the promise to get all ad users from csv was rejected with an error
				.catch((returnADUsersByDivisionDepartmentDataError) => {
					// reject this promise with the error
					reject(returnADUsersByDivisionDepartmentDataError);
				});
		}),

	ReturnAllADManagersWithFullFlatDownlinesFromDBQueries: () =>
		// return a new promise
		new Promise((resolve, reject) => {
			// get promises to retrieve users as division and department hierarchy object
			// 		and as a flat array
			Promise.all([
				module.exports.ReturnAllUsersByDivisionDepartment(),
				module.exports.ReturnAllUsers(),
			])
				// when all promises have resolved
				.then((adUsersResults) => {
					// extract results for convenience
					const adUsersByDivDept = adUsersResults[0].adUsersByDivisionDepartment[0];
					const adUsers = adUsersResults[1].docs;
					// set up empty array to receive the final data
					const adManagers = [];
					// iterate over the array of adUsersByDivDept's property keys
					Object.keys(adUsersByDivDept).forEach((adDivisionKey) => {
						// if this property key is not for the '_id' property
						if (adDivisionKey !== '_id') {
							// iterate over the array of this division object's property keys; 
							// 		these happen to be department names
							Object.keys(adUsersByDivDept[adDivisionKey]).forEach((departmentKey) => {
								// if this department has managers
								if (adUsersByDivDept[adDivisionKey][departmentKey].managers) {
									// for each manager in this department
									adUsersByDivDept[adDivisionKey][departmentKey].managers
										.forEach((managerProfile) => {
											// set flag indicating that this manager hasn't
											// 		already beed added to the final data
											let thisManagerAlreadyAdded = false;
											// iterate over managers already added to the final data
											adManagers.forEach((addedManagerProfile) => {
												// if this already-added manager is the same as 
												// 		this department's manager
												if (
													managerProfile && managerProfile.account ===
													addedManagerProfile.account
												) {
													// modify flag to indicate that 
													// 		this department's manager was 
													// already added
													thisManagerAlreadyAdded = true;
												}
											});
											// if this manager hasn't already been added
											if (!thisManagerAlreadyAdded) {
												// set up vars:
												// empty array to receive everyone 
												// 		who reports to this manager
												const downline = [];
												// array of users for whom to look up reportees
												const lookupsToBeProcessed = [managerProfile.account];
												// array of users for whom we've already 
												// 		looked up reportees
												const lookupsProcessed = [];
												// while there is a difference in 
												// 		lookups to be processed and 
												// 		those already processed
												while (lookupsToBeProcessed.length !== lookupsProcessed.length) {
													// for each users for whom we should look up reportees
													// eslint-disable-next-line no-loop-func
													lookupsToBeProcessed.forEach((lookupToProcess) => {
														// if we haven't already processed this lookup
														if (lookupsProcessed.indexOf(lookupToProcess) === -1) {
															// for each user in the flat list of users
															adUsers.forEach((adUser) => {
																// if this user reports to this manager
																if (adUser.manager === lookupToProcess) {
																	// add this user to downline
																	downline.push(adUser);
																	// add this user to lookupsToBeProcessed, 
																	// 		so that we'll also look up 
																	// 		reportees for this user
																	lookupsToBeProcessed.push(adUser.account);
																}
															});
															// whether or not any reportees were 
															// 		found, signify that we performed 
															// 		the lookup for this manager
															lookupsProcessed.push(lookupToProcess);
														}
													});
												}
												// make a copy of manager function param
												const manager = managerProfile;
												// alphabetize the downline
												downline.sort(module.exports.ReturnUserNameWeightRelativeToAnother);
												// add downline to this manager
												manager.downline = downline;
												// push this manager to the final data
												adManagers.push(manager);
											}
										});
								}
							});
						}
					});
					// alphabetize the managers
					adManagers.sort(module.exports.ReturnUserNameWeightRelativeToAnother);
					// resolve this promise with a message and the data
					resolve({
						error: false,
						mongoDBError: false,
						adManagers,
					});
				})
				// if the promise to get all ad users from csv was rejected with an error
				.catch((returnADUsersByDivisionDepartmentDataError) => {
					// reject this promise with the error
					reject(returnADUsersByDivisionDepartmentDataError);
				});
		}),

	ReturnAllADManagersWithFullHierarchicalDownlinesFromDBQueries: () =>
		// return a new promise
		new Promise((resolve, reject) => {
			// get promises to retrieve users as division and department hierarchy object
			// 		and as a flat array
			Promise.all([
				module.exports.ReturnAllUsersByDivisionDepartment(),
				module.exports.ReturnAllUsers(),
			])
				// when all promises have resolved
				.then((adUsersResults) => {
					// extract results for convenience
					const adUsersByDivDept = adUsersResults[0].adUsersByDivisionDepartment[0];
					const adUsers = adUsersResults[1].docs;
					// set up empty array to receive the final data
					const adManagers = [];
					// iterate over the array of adUsersByDivDept's property keys
					Object.keys(adUsersByDivDept).forEach((adDivisionKey) => {
						// if this property key is not for the '_id' property
						if (adDivisionKey !== '_id') {
							// iterate over the array of this division object's property keys; 
							// 		these happen to be department names
							Object.keys(adUsersByDivDept[adDivisionKey]).forEach((departmentKey) => {
								// if this department has managers
								if (adUsersByDivDept[adDivisionKey][departmentKey].managers) {
									// for each manager in this department
									adUsersByDivDept[adDivisionKey][departmentKey].managers
										.forEach((managerProfile) => {
											// set flag indicating that this manager hasn't
											// 		already beed added to the final data
											let thisManagerAlreadyAdded = false;
											// iterate over managers already added to the final data
											adManagers.forEach((addedManagerProfile) => {
												// if this already-added manager is the same as 
												// 		this department's manager
												if (
													managerProfile && managerProfile.account ===
													addedManagerProfile.account
												) {
													// modify flag to indicate that 
													// 		this department's manager was 
													// already added
													thisManagerAlreadyAdded = true;
												}
											});
											// if this manager hasn't already been added
											if (!thisManagerAlreadyAdded) {
												// set up vars:
												// empty object to receive everyone 
												// 		who reports to this manager, 
												// 		structured by divisions and departments
												const downline = {};
												// array of users for whom to look up reportees
												const lookupsToBeProcessed = [managerProfile.account];
												// array of users for whom we've already 
												// 		looked up reportees
												const lookupsProcessed = [];
												// while there is a difference in 
												// 		lookups to be processed and 
												// 		those already processed
												while (lookupsToBeProcessed.length !== lookupsProcessed.length) {
													// for each users for whom we should look up reportees
													// eslint-disable-next-line no-loop-func
													lookupsToBeProcessed.forEach((lookupToProcess) => {
														// if we haven't already processed this lookup
														if (lookupsProcessed.indexOf(lookupToProcess) === -1) {
															// for each user in the flat list of users
															adUsers.forEach((adUser) => {
																// if this user reports to this manager
																if (adUser.manager === lookupToProcess) {
																	// get copies of the division and department names without 
																	// 		characters that are illegal as MongoDB key names
																	const adUserDivision = nesoUtilities.ReplaceAll('\\.', '', adUser.division);
																	// console.log(adUserDivision);
																	const adUserDepartment = nesoUtilities.ReplaceAll('\\.', '', adUser.department);
																	// if this user's division is not already in downline
																	if (typeof (downline[adUserDivision]) === 'undefined') {
																		// add it as an empty object
																		downline[adUserDivision] = {};
																	}
																	// if this user's department is not already in downline
																	if (typeof (downline[adUserDivision][adUserDepartment]) === 'undefined') {
																		// add it as an empty array
																		downline[adUserDivision][adUserDepartment] = [];
																	}
																	// add this user to the department in downline
																	downline[adUserDivision][adUserDepartment]
																		.push(adUser);
																	// add this user to lookupsToBeProcessed, 
																	// 		so that we'll also look up 
																	// 		reportees for this user
																	lookupsToBeProcessed.push(adUser.account);
																}
															});
															// whether or not any reportees were 
															// 		found, signify that we performed 
															// 		the lookup for this manager
															lookupsProcessed.push(lookupToProcess);
														}
													});
												}
												// make a copy of manager function param
												const manager = managerProfile;
												// alphabetize the downline arrays:
												// iterate over the division keys
												Object.keys(downline).forEach((downlineDivisionKey) => {
													// iterate over the department keys
													Object.keys(downline[downlineDivisionKey])
														.forEach((downlineDepartmentKey) => {
															// alphabetize array
															downline[downlineDivisionKey][downlineDepartmentKey]
																.sort(module.exports.ReturnUserNameWeightRelativeToAnother);
														});
												});
												// add downline to this manager
												manager.downline = downline;
												// push this manager to the final data
												adManagers.push(manager);
											}
										});
								}
							});
						}
					});
					// alphabetize the managers
					adManagers.sort(module.exports.ReturnUserNameWeightRelativeToAnother);
					// resolve this promise with a message and the data
					resolve({
						error: false,
						mongoDBError: false,
						adManagers,
					});
				})
				// if the promise to get all ad users from csv was rejected with an error
				.catch((returnADUsersByDivisionDepartmentDataError) => {
					// reject this promise with the error
					reject(returnADUsersByDivisionDepartmentDataError);
				});
		}),

	// DATA PULLS

	// user
	ReturnAllUsers: () =>
		// return a new promise
		new Promise((resolve, reject) => {
			// get a promise to retrieve all documents from the adUsers document collection
			nesoDBQueries.ReturnAllDocsFromCollection('adUsers')
				// if the promise is resolved with the docs, then resolve this promise with the docs
				.then((result) => {
					resolve(result);
				})
				// if the promise is rejected with an error, then reject this promise with an error
				.catch((error) => {
					reject(error);
				});
		}),
	// user
	ReturnOneUser: account =>
		// return a new promise
		new Promise((resolve, reject) => {
			// get a promise to retrieve one specified document from the adUsers document collection
			// eslint-disable-next-line object-shorthand
			nesoDBQueries.ReturnOneSpecifiedDocFromCollection('adUsers', {
				$and: [{
					account,
				}],
			}, {})
				// if the promise is resolved with the docs, then resolve this promise with the docs
				.then((result) => {
					resolve(result);
				})
				// if the promise is rejected with an error, then reject this promise with an error
				.catch((error) => {
					reject(error);
				});
		}),
	// divisions, departments, users
	ReturnAllUsersByDivisionDepartment: () =>
		// return a new promise
		new Promise((resolve, reject) => {
			// get a promise to retrieve all documents from the adUsers document collection
			nesoDBQueries.ReturnAllDocsFromCollection('adUsersByDivisionDepartment')
				// if the promise is resolved with the docs, then resolve this promise with the docs
				.then((result) => {
					resolve({
						error: false,
						adUsersByDivisionDepartment: result.docs,
					});
				})
				// if the promise is rejected with an error, then reject this promise with an error
				.catch((error) => {
					reject(error);
				});
		}),
	ReturnAllUsersInDepartment: deptName =>
		// return a new promise
		new Promise((resolve, reject) => {
			// get a promise to retrieve all documents from the adUsers document collection
			nesoDBQueries.ReturnAllSpecifiedDocsFromCollection('adUsers', {
				department: deptName,
			}, {})
				// if the promise is resolved with the docs, then resolve this promise with the docs
				.then((result) => {
					resolve(result);
				})
				// if the promise is rejected with an error, then reject this promise with an error
				.catch((error) => {
					reject(error);
				});
		}),
	ReturnAllUsersInDivision: divName =>
		// return a new promise
		new Promise((resolve, reject) => {
			// get a promise to retrieve all documents from the adUsers document collection
			nesoDBQueries.ReturnAllSpecifiedDocsFromCollection('adUsers', {
				division: divName,
			}, {})
				// if the promise is resolved with the docs, then resolve this promise with the docs
				.then((result) => {
					resolve(result);
				})
				// if the promise is rejected with an error, then reject this promise with an error
				.catch((error) => {
					reject(error);
				});
		}),
	// departments
	ReturnAllDepartments: () =>
		// return a new promise
		new Promise((resolve, reject) => {
			// get a promise to retrieve all documents from the adUsers document collection
			nesoDBQueries.ReturnAllDocsFromCollection('adDepartments')
				// if the promise is resolved with the docs, then resolve this promise with the docs
				.then((result) => {
					resolve(result);
				})
				// if the promise is rejected with an error, then reject this promise with an error
				.catch((error) => {
					reject(error);
				});
		}),
	// managers
	ReturnAllADManagersFlat: () =>
		// return a new promise
		new Promise((resolve, reject) => {
			// get a promise to retrieve all documents from the adManagersFlat document collection
			nesoDBQueries.ReturnAllDocsFromCollection('adManagersFlat')
				// if the promise is resolved with the docs, then resolve this promise with the docs
				.then((result) => {
					// TO DO - DELETE BELOW HARD-CODING OF MANAGERS ONCE ALGO HAS BETTER DATA TO CRUNCH

					const hardCodedManagers = [
						{
							_id: '5c1ab151c3ee4111b4d5269e',
							account: 'wtatarouns',
							employeeID: '10726',
							firstName: 'Wendy',
							lastName: 'Tatarouns',
							firstInitial: 'W',
							lastInitial: 'T',
							displayName: 'Wendy Tatarouns',
							title: 'Assistant Manager, Visitor Services',
							email: 'wtatarouns@mos.org',
							officePhone: '617-589-0213',
							mobilePhone: '617-275-3166',
							manager: 'ahile',
							department: 'Visitor Services',
							division: 'Visitor Experience & Operations',
							securityGroups: [
								'Tessitura Training',
								'VS Closing',
								'Redboard_viewers',
								'VS_Mgmt',
								'VS_Training',
								'mos.org',
								'SaleWizard Maintenance Users',
								'TrackIT Users',
								'LSI_Admits',
								'DSS Audio Tour Inventory',
								'Visitor Services',
								'BoxOffice - Less Restricted Users',
								'Kiosk Access',
								'Box Office FAQs',
								'CSI Project Team',
								'MOSAccess Admin Users',
								'VS_MembershipSales',
								'SP_Staff',
								"Box Office FAQ - Don''t Use_See Pierre",
								'Tessitura Ticketing',
								'MaxFlight',
								'Box Office FAQs Modify',
								'PA System Project',
								'Lockers',
								'SP_Dept_Write_Volunteer_Supervisors',
								'BOI',
								'WWV',
								'WiFi Access',
								'Lobby Training',
								'Shift-Leaders',
								'SP_Dept_HR_ManagersHandbook',
								'Digital Signage',
								'Crystal Enterprise',
								'SP_Team_Write_Safety',
								'VS_SW',
								'4D Theater Operations',
								'VS_PassDonation',
								'GSW Scripts and Slides',
								'VS_Staff',
								'Box Office Admin',
								'PompeiiOps',
								'Admits',
							],
						}, {
							_id: '5c38bd819e68540958b2816d',
							account: 'jpeeler',
							employeeID: '14861',
							firstName: 'Jackie',
							lastName: 'Peeler',
							firstInitial: 'J',
							lastInitial: 'P',
							displayName: 'Jackie Peeler',
							title: 'Manager, Living Collections',
							email: 'jpeeler@mos.org',
							officePhone: '',
							mobilePhone: '',
							manager: 'bharvey',
							department: 'Living Collections',
							division: 'Education',
							securityGroups: ['mos.org', 'SP_Staff', 'Butterfly Garden', 'OS X Users', 'Web VPN Access', 'Living Collections', 'WiFi Access'],
						},
					];

					hardCodedManagers.forEach((hardCodedManager) => {
						result.docs.push(hardCodedManager);
					});

					// alphabetize the managers
					result.docs.sort(module.exports.ReturnUserNameWeightRelativeToAnother);

					// TO DO - DELETE ABOVE HARD-CODING OF MANAGERS ONCE ALGO HAS BETTER DATA TO CRUNCH

					resolve(result);
				})
				// if the promise is rejected with an error, then reject this promise with an error
				.catch((error) => { reject(error); });
		}),
	// downline, upline
	ReturnDirectReportsForOneManager: mgrAccount =>
		// return a new promise
		new Promise((resolve, reject) => {
			// get a promise to retrieve all documents from the adUsers document collection
			nesoDBQueries.ReturnAllSpecifiedDocsFromCollection('adUsers', {
				manager: mgrAccount,
			}, {})
				// if the promise is resolved with the docs, then resolve this promise with the docs
				.then((result) => {
					resolve(result);
				})
				// if the promise is rejected with an error, then reject this promise with an error
				.catch((error) => {
					reject(error);
				});
		}),
	// downline, upline
	ReturnAllManagersWithFlatDownline: () =>
		// return a new promise
		new Promise((resolve, reject) => {
			// get a promise to retrieve all documents from the 
			// 		adManagersWithFullFlatDownlines document collection
			nesoDBQueries.ReturnAllDocsFromCollection('adManagersWithFullFlatDownlines')
				// if the promise is resolved with the docs, then resolve this promise with the docs
				.then((result) => { resolve(result); })
				// if the promise is rejected with an error, then reject this promise with an error
				.catch((error) => { reject(error); });
		}),
	// downline, upline
	ReturnAllManagersWithHierarchicalDownline: () =>
		// return a new promise
		new Promise((resolve, reject) => {
			// get a promise to retrieve all documents from the 
			// 		adManagersWithFullFlatDownlines document collection
			nesoDBQueries.ReturnAllDocsFromCollection('adManagersWithFullHierarchicalDownlines')
				// if the promise is resolved with the docs, then resolve this promise with the docs
				.then((result) => { resolve(result); })
				// if the promise is rejected with an error, then reject this promise with an error
				.catch((error) => { reject(error); });
		}),
	// downline, upline
	ReturnOneManagerWithFlatDownline: mgrAccount =>
		// return a new promise
		new Promise((resolve, reject) => {
			// get a promise to retrieve all documents from the adUsers document collection
			nesoDBQueries.ReturnAllSpecifiedDocsFromCollection('adManagersWithFullFlatDownlines', {
				account: mgrAccount,
			}, {})
				// if the promise is resolved with the docs, then resolve this promise with the docs
				.then((result) => {
					resolve(result);
				})
				// if the promise is rejected with an error, then reject this promise with an error
				.catch((error) => {
					reject(error);
				});
		}),
	// downline, upline
	ReturnOneManagerWithWithHierarchicalDownline: mgrAccount =>
		// return a new promise
		new Promise((resolve, reject) => {
			// get a promise to retrieve all documents from the adUsers document collection
			nesoDBQueries.ReturnAllSpecifiedDocsFromCollection('adManagersWithFullHierarchicalDownlines', {
				account: mgrAccount,
			}, {})
				// if the promise is resolved with the docs, then resolve this promise with the docs
				.then((result) => {
					resolve(result);
				})
				// if the promise is rejected with an error, then reject this promise with an error
				.catch((error) => {
					reject(error);
				});
		}),
	// downline, upline
	ReturnFullFlatUplineForOneUser: account =>
		// return a new promise
		new Promise((resolve, reject) => {
			// get a promise to get the user's manager, her manger, and so on, using a graph lookup
			nesoDBConnection.get('adUsers')
				.aggregate([
					{ $match: { account } },
					{
						$graphLookup: {
							from: 'adUsers',
							startWith: '$manager',
							connectFromField: 'manager',
							connectToField: 'account',
							as: 'upline',
						},
					},
				])
				// if the promise is resolved with the docs, then resolve this promise with the docs
				.then((result) => {
					// result[0].upline.forEach((uplineMember) => {
					// 	console.log(uplineMember);
					// });
					resolve(result[0].upline);
				})
				// if the promise is rejected with an error, then reject this promise with an error
				.catch((error) => {
					reject(error);
				});
		}),
};
