// ----- PULL IN MODULES

const fse = require('fs-extra');
const csv = require('csvtojson');

const nesoDBQueries = require('./nesoDBQueries');
const nesoUtilities = require('./nesoUtilities');
const nesoErrors = require('./nesoErrors');

// ----- DEFINE ACTIVE DIRECTORY FUNCTIONS

module.exports = {

	ReturnADSettings: () =>
		// return a new promise
		new Promise(((resolve, reject) => {
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
		})),


	ReturnADDataProcessingStatus: () =>
		// return a new promise
		new Promise(((resolve, reject) => {
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
		})),


	ReturnADDataProcessingNow: () =>
		// return a new promise
		new Promise(((resolve, reject) => {
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
		})),


	ReturnADCSVSettings: () =>
		// return a new promise
		new Promise(((resolve, reject) => {
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
		})),


	ReturnADWhitelistedDomains: () =>
		// return a new promise
		new Promise(((resolve, reject) => {
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
		})),


	ReplaceAllADSettings: newSettings =>
		// return a new promise
		new Promise(((resolve, reject) => {
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
		})),


	ReplaceOneADSetting: newSingleSettingObject =>
		// return a new promise
		new Promise(((resolve, reject) => {
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
		})),

	ReturnNewADUsersFilePathAndName: currentFilePathAndName =>
		`${currentFilePathAndName.slice(0, currentFilePathAndName.length - 4)}Copy.csv`,

	ReturnAllADUsersFromCSV: () =>
		// return a new promise
		new Promise(((resolve, reject) => {
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
												console.log('FILE REMOVED');
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
		})),


	ReturnAllADDepartmentsFromADUsersByDivisionDepartment: () =>
		// return a new promise
		new Promise(((resolve, reject) => {
			// get a promise to get all ad users by division and department from the database
			module.exports.ReturnADUsersByDivisionDepartmentData()
				// if the promise to get all ad users by division and department from the database 
				// 		was resolved with the data
				.then((returnADUsersByDivisionDepartmentDataResult) => {
					// extract the data from the result
					const adUsersByDivDept = returnADUsersByDivisionDepartmentDataResult.docs[0];
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
		})),


	ReturnAllADUsersByDivisionDepartmentFromADUsers: () =>
		// return a new promise
		new Promise(((resolve, reject) => {
			// get a promise to get all ad users from csv
			module.exports.ReturnAllADUsersFromCSV()
				// if the promise to get all ad users from csv was resolved with the ad users
				.then((returnAllActiveDirectoryUsersFromCSVResult) => {
					// extract the data from the result
					const adUsers = returnAllActiveDirectoryUsersFromCSVResult.activeDirectoryUsers;
					// set up empty object to receive the new data
					const adUsersByDivisionDepartment = {};
					// iterate over adUsers
					adUsers.forEach((adUser, adUserIndex) => {
						// if this user has a division and department 
						// 		(ReturnAllADUsersFromCSV() will not return anyone without an account)
						if (typeof (adUser.division) !== 'undefined' && adUser.division !== '' &&
							typeof (adUser.department) !== 'undefined' && adUser.department !== '') {
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
								// add it as an empty array
								adUsersByDivisionDepartment[adUserDivision][adUserDepartment] = {};
								// and add the empty "managers" array to the department
								adUsersByDivisionDepartment[adUserDivision][adUserDepartment].managers = [];
								// and add the empty "members" array to the department
								adUsersByDivisionDepartment[adUserDivision][adUserDepartment].members = [];
							}
							// determine whether or not this user's manager 
							// 		is already in adUsersByDivisionDepartment
							if (adUser.manager !== undefined && adUser.manager !== '') {
								let thisManagerAlreadyAdded = 0;
								adUsersByDivisionDepartment[adUserDivision][adUserDepartment].managers
									.forEach((manager, managerIndex) => {
										if (manager === adUser.manager) {
											thisManagerAlreadyAdded = 1;
										}
									});
								// if this user's manager is not already in adUsersByDivisionDepartment
								if (thisManagerAlreadyAdded === 0) {
									// get a promise to get this manager's data
									module.exports.ReturnOneSpecifiedUser(adUser.manager)
										// if the promise to get all ad users from csv was resolved with the ad users
										.then((returnManagersUserDataResult) => {
											// add this user's manager's user data to adUsersByDivisionDepartment
											adUsersByDivisionDepartment[adUserDivision][adUserDepartment]
												.managers.push(returnManagersUserDataResult.docs);
										})
										// if the promise to get all ad users from csv was rejected with an error
										.catch((returnManagersUserDataError) => {
											// add this user's manager's account to adUsersByDivisionDepartment; 
											// 		an account is better than nothing, and not having the 
											// 		full data shouldn't be a deal breaker
											adUsersByDivisionDepartment[adUserDivision][adUserDepartment]
												.managers.push(adUser.manager);
										});
								}
							}
							// add this user to the department
							adUsersByDivisionDepartment[adUserDivision][adUserDepartment].members.push(adUser);
						}
					});
					// resolve this promise with a message and the data
					resolve({
						error: false,
						csvError: false,
						adUsersByDivisionDepartment,
					});
				})
				// if the promise to get all ad users from csv was rejected with an error
				.catch((returnAllActiveDirectoryUsersFromCSVError) => {
					// reject this promise with the error
					reject(returnAllActiveDirectoryUsersFromCSVError);
				});
		})),


	DeleteAllADUsersFromDatabase: () =>
		// return a new promise
		new Promise(((resolve, reject) => {
			// get a promise to retrieve all documents from the adDepartments document collection
			nesoDBQueries.DeleteAllDocsFromCollection('adUsers')
				// if the promise is resolved with the docs, then resolve this promise with the docs
				.then((result) => {
					resolve(result);
				})
				// if the promise is rejected with an error, then reject this promise with an error
				.catch((error) => {
					reject(error);
				});
		})),

	DeleteAllADDepartmentsFromDatabase: () =>
		// return a new promise
		new Promise(((resolve, reject) => {
			// get a promise to retrieve all documents from the adUsers document collection
			nesoDBQueries.DeleteAllDocsFromCollection('adDepartments')
				// if the promise is resolved with the docs, then resolve this promise with the docs
				.then((result) => {
					resolve(result);
				})
				// if the promise is rejected with an error, then reject this promise with an error
				.catch((error) => {
					reject(error);
				});
		})),

	DeleteAllADUsersByDivisionDepartmentFromDatabase: () =>
		// return a new promise
		new Promise(((resolve, reject) => {
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
		})),


	AddAllADUsersToDatabase: adUsers =>
		// return a new promise
		new Promise(((resolve, reject) => {
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
		})),


	AddAllADUsersByDivisionDepartmentToDatabase: adUsersByDivisionDepartment =>
		// return a new promise
		new Promise(((resolve, reject) => {
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
		})),


	AddAllADDepartmentsToDatabase: adDepartments =>
		// return a new promise
		new Promise(((resolve, reject) => {
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
		})),

	ProcessADDepartments: () =>
		// return a new promise
		new Promise(((resolve, reject) => {
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
		})),

	ProcessADUsersData: () =>
		// return a new promise
		new Promise(((resolve, reject) => {
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
								module.exports.ReturnAllADUsersFromCSV()
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
		})),


	ProcessADUsersByDivisionDepartmentData: () =>
		// return a new promise
		new Promise(((resolve, reject) => {
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
								module.exports.ReturnAllADUsersByDivisionDepartmentFromADUsers()
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
		})),


	ReturnADUsersData: () =>
		// return a new promise
		new Promise(((resolve, reject) => {
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
		})),


	ReturnOneSpecifiedUser: account =>
		// return a new promise
		new Promise(((resolve, reject) => {
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
		})),


	ReturnADUsersByDivisionDepartmentData: () =>
		// return a new promise
		new Promise(((resolve, reject) => {
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
		})),

	ReturnADDepartments: () =>
		// return a new promise
		new Promise(((resolve, reject) => {
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
		})),

	ReturnOneADUserByUserID: userID =>
		// return a new promise
		new Promise(((resolve, reject) => {
			// get a promise to retrieve all documents from the adUsers document collection
			nesoDBQueries.ReturnOneSpecifiedDocFromCollection('adUsers', {
				account: userID,
			}, {})
				// if the promise is resolved with the docs, then resolve this promise with the docs
				.then((result) => {
					resolve(result);
				})
				// if the promise is rejected with an error, then reject this promise with an error
				.catch((error) => {
					reject(error);
				});
		})),

	ReturnAllADUsersWithSpecifiedManager: mgrUserID =>
		// return a new promise
		new Promise(((resolve, reject) => {
			// get a promise to retrieve all documents from the adUsers document collection
			nesoDBQueries.ReturnAllSpecifiedDocsFromCollection('adUsers', {
				manager: mgrUserID,
			}, {})
				// if the promise is resolved with the docs, then resolve this promise with the docs
				.then((result) => {
					resolve(result);
				})
				// if the promise is rejected with an error, then reject this promise with an error
				.catch((error) => {
					reject(error);
				});
		})),

};
