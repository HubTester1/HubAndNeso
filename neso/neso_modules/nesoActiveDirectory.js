// ----- PULL IN MODULES

const fse = require('fs-extra');
const csv = require('csvtojson');

const nesoDBQueries = require('./nesoDBQueries');
const nesoUtilities = require('./nesoUtilities');
const nesoErrors = require('./nesoErrors');
const nesoDBConnection = require('./nesoDBConnection');


// ----- DEFINE ACTIVE DIRECTORY FUNCTIONS

module.exports = {

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

	ReturnAllADDepartmentsFromADUsersByDivisionDepartment: () =>
		// return a new promise
		new Promise((resolve, reject) => {
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
		}),

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

	ReturnAllADManagersSimpleFromADUsersByDivisionDepartment: () =>
		// return a new promise
		new Promise((resolve, reject) => {
			// get a promise to get all ad users by division and department from the database
			module.exports.ReturnADUsersByDivisionDepartmentData()
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

	ReturnAllADUsersByDivisionDepartmentFromCSV: () =>
		// return a new promise
		new Promise((resolve, reject) => {
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
						// if this user has a division and department and manager
						// 		(ReturnAllADUsersFromCSV() will not return anyone without an account)
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

	DeleteAllADUsersFromDatabase: () =>
		// return a new promise
		new Promise((resolve, reject) => {
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
		}),

	DeleteAllADManagersSimpleFromDatabase: () =>
		// return a new promise
		new Promise((resolve, reject) => {
			// get a promise to retrieve all documents from the adDepartments document collection
			nesoDBQueries.DeleteAllDocsFromCollection('adManagersSimple')
				// if the promise is resolved with the docs, then resolve this promise with the docs
				.then((result) => {
					resolve(result);
				})
				// if the promise is rejected with an error, then reject this promise with an error
				.catch((error) => {
					reject(error);
				});
		}),
	
	DeleteAllADManagersWithFullHierarchicalDownlineFromDatabase: () =>
		// return a new promise
		new Promise((resolve, reject) => {
			// get a promise to retrieve all documents from the 
			// 		adManagersWithFullHierarchicalDownline document collection
			nesoDBQueries.DeleteAllDocsFromCollection('adManagersWithFullHierarchicalDownline')
				// if the promise is resolved with the docs, then resolve this promise with the docs
				.then((result) => {
					resolve(result);
				})
				// if the promise is rejected with an error, then reject this promise with an error
				.catch((error) => {
					reject(error);
				});
		}),

	DeleteAllADUsersWithUplinesFromDatabase: () =>
		// return a new promise
		new Promise((resolve, reject) => {
			// get a promise to retrieve all documents from the adDepartments document collection
			nesoDBQueries.DeleteAllDocsFromCollection('adUsersWithUplines')
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
			nesoDBQueries.InsertDocIntoCollection(adManagers, 'adManagersSimple')
				// if the promise is resolved with the result, then resolve this promise with the result
				.then((result) => {
					resolve(result);
				})
				// if the promise is rejected with an error, then reject this promise with an error
				.catch((error) => {
					reject(error);
				});
		}),

	AddAllADManagersManagersWithFullHierarchicalDownlineToDatabase: adManagers =>
		// return a new promise
		new Promise((resolve, reject) => {
			// get a promise to insert all documents into the 
			// 		adManagersWithFullHierarchicalDownline document collection
			nesoDBQueries.InsertDocIntoCollection(adManagers, 'adManagersWithFullHierarchicalDownline')
				// if the promise is resolved with the result, then resolve this promise with the result
				.then((result) => {
					resolve(result);
				})
				// if the promise is rejected with an error, then reject this promise with an error
				.catch((error) => {
					reject(error);
				});
		}),

	AddAllADUsersWithUplinesToDatabase: adUsersWithUplines =>
		// return a new promise
		new Promise((resolve, reject) => {
			// get a promise to retrieve all documents from the emailQueue document collection
			nesoDBQueries.InsertDocIntoCollection(adUsersWithUplines, 'adUsersWithUplines')
				// if the promise is resolved with the result, then resolve this promise with the result
				.then((result) => {
					resolve(result);
				})
				// if the promise is rejected with an error, then reject this promise with an error
				.catch((error) => {
					reject(error);
				});
		}),

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

	ProcessADManagersWithFullHierarchicalDownline: () =>
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
								module.exports.ReturnAllADManagersWithFullHierarchicalDownlineFromDBQueries()
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

	ProcessADUsersWithUplines: () =>
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
								module.exports.ReturnAllADUsersWithUplines()
									// if the promise to get all ad users from csv was resolved with the ad users
									.then((returnAllADUsersWithUplinesResult) => {
										// console.log('returnAllADUsersWithUplinesResult.docs');
										// console.log(returnAllADUsersWithUplinesResult.docs);
										// get a promise to delete all ad depts from the database
										module.exports.DeleteAllADUsersWithUplinesFromDatabase()
											// if the promise to delete all ad depts from the database was resolved
											.then((deleteAllADManagersFromDatabaseResult) => {
												// extract data (just to keep line length short, really)
												// back here
												const adUsersWithUplines = returnAllADUsersWithUplinesResult.docs;
												// const {
												// 	adUsersWithUplines,
												// } =
												// 	returnAllADUsersWithUplinesResult;
												// get a promise to add ad users from csv to the database
												module.exports
													.AddAllADUsersWithUplinesToDatabase(adUsersWithUplines)
													// if the promise to add ad users from csv to the database was resolved
													.then((addAllADUsersWithUplinesToDatabaseResult) => {
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
													.catch((addAllADUsersWithUplinesToDatabaseError) => {
														// get a promise to set dataProcessingNow to false
														module.exports.ReplaceOneADSetting({
															dataProcessingNow: false,
														})
															// if the promise to set dataProcessingNow 
															//		to false was resolved with the result
															.then((replaceOneActiveDirectorySettingSecondResult) => {
																// reject this promise with the error
																reject(addAllADUsersWithUplinesToDatabaseError);
															})
															// if the promise to add ad users from 
															// 		csv to the database was rejected with an error
															.catch((replaceOneADSettingError) => {
																// construct a custom error
																const errorToReport = {
																	error: true,
																	mongoDBError: true,
																	errorCollection: [
																		addAllADUsersWithUplinesToDatabaseError
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
									.catch((returnAllADUsersError) => {
										// get a promise to set dataProcessingNow to false
										module.exports.ReplaceOneADSetting({
											dataProcessingNow: false,
										})
											// if the promise to set dataProcessingNow 
											// 		to false was resolved with the result
											.then((replaceOneActiveDirectorySettingSecondResult) => {
												// reject this promise with the error
												reject(returnAllADUsersError);
											})
											// if the promise to add ad users from csv 
											// 		to the database was rejected with an error
											.catch((replaceOneADSettingError) => {
												// construct a custom error
												const errorToReport = {
													error: true,
													mongoDBError: true,
													errorCollection: [
														returnAllADUsersError
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
		}),

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

	ReturnADUsersData: () =>
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

	ReturnOneSpecifiedUser: account =>
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

	ReturnADUsersByDivisionDepartmentData: () =>
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

	ReturnADDepartments: () =>
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

	ReturnOneADUserByUserID: userID =>
		// return a new promise
		new Promise((resolve, reject) => {
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
		}),

	ReturnAllADUsersWithSpecifiedManager: mgrUserID =>
		// return a new promise
		new Promise((resolve, reject) => {
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
		}),

	ReturnFullUplineForOneUser: userAccount =>
		// return a new promise
		new Promise((resolve, reject) => {
			nesoDBConnection.get('adUsers')
				.aggregate([
					// starting with specified user
					{ $match: { account: userAccount } },
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
					result[0].upline.forEach((uplineMember) => {
						console.log(uplineMember);
					});

					resolve(result[0].upline);
				})
				// if the promise is rejected with an error, then reject this promise with an error
				.catch((error) => {
					reject(error);
				});
		}),

	ReturnAllADManagersSimple: () => 
		// return a new promise
		new Promise((resolve, reject) => {
			// get a promise to retrieve all documents from the adManagersSimple document collection
			nesoDBQueries.ReturnAllDocsFromCollection('adManagersSimple')
				// if the promise is resolved with the docs, then resolve this promise with the docs
				.then((result) => { resolve(result); })
				// if the promise is rejected with an error, then reject this promise with an error
				.catch((error) => { reject(error); });
		}),

	ReturnAllADUsersWithUplines: () =>
		// return a new promise
		new Promise((resolve, reject) => {
			// back here
			// get a promise to retrieve all documents from the adUsers document collection
			module.exports.ReturnADUsersData()
				// if the promise is resolved with the docs, then resolve this promise with the docs
				.then((adUsersBase) => {
					/* // set up var to receive users
					adUsersWithUplines = [];
					// for 
					adUsersBase.docs.forEach((adUserBase) => {
						
						module.exports.ReturnFullUplineForOneUser()
						adUserBase
					}); */
				})
				// if the promise is rejected with an error, then reject this promise with an error
				.catch((error) => { reject(error); });
		}),

	ReturnFullFlatDownlineForOneManager: mgrUserID =>
		// return a new promise
		new Promise((resolve, reject) => {
			// get a promise to get all adUsers from the db
			module.exports.ReturnADUsersData()
				// if the promise was resolved with the user data
				.then((result) => {
					const adUsers = result.docs;
					// back here
					// eslint-disable-next-line prefer-const
					let downline = [];
					const lookupsToBeProcessed = [mgrUserID];
					const lookupsProcessed = [];
					while (lookupsToBeProcessed.length !== lookupsProcessed.length) {
						lookupsToBeProcessed.forEach((lookupToProcess) => {
							if (lookupsProcessed.indexOf(lookupToProcess) === -1) {
								adUsers.forEach((adUser) => {
									if (adUser.manager === lookupToProcess) {
										downline.push(adUser);
										lookupsToBeProcessed.push(adUser.account);
									}
								});
								lookupsProcessed.push(lookupToProcess);
							}
						});
					}
					console.log('downline');
					console.log(downline);
					resolve(downline);
				})
				// if the promise was rejected with an error, reject this promise with the error
				.catch((error) => { reject(error); });
		}),

	ReturnFullHierarchicalDownlineForOneManager: mgrUserID =>
		// return a new promise
		new Promise((resolve, reject) => {
			// get a promise to get all adUsers from the db
			module.exports.ReturnADUsersData()
				// if the promise was resolved with the user data
				.then((result) => {
					const adUsers = result.docs;
					// eslint-disable-next-line prefer-const
					// back here
					const downline = {};
					const lookupsToBeProcessed = [mgrUserID];
					const lookupsProcessed = [];
					while (lookupsToBeProcessed.length !== lookupsProcessed.length) {
						// eslint-disable-next-line no-loop-func
						lookupsToBeProcessed.forEach((lookupToProcess) => {
							if (lookupsProcessed.indexOf(lookupToProcess) === -1) {
								adUsers.forEach((adUser) => {
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
										// add this user to the department
										downline[adUserDivision][adUserDepartment]
											.push(adUser);
										lookupsToBeProcessed.push(adUser.account);
									}
								});
								lookupsProcessed.push(lookupToProcess);
							}
						});
					}
					resolve(downline);
				})
				// if the promise was rejected with an error, reject this promise with the error
				.catch((error) => { reject(error); });
		}),

	ReturnAllADManagersWithFullHierarchicalDownlineFromDBQueries: () =>
		// return a new promise
		new Promise((resolve, reject) => {
			// back here
			// get promises to async delete email from queue and async add email to archive
			Promise.all([
				module.exports.ReturnADUsersByDivisionDepartmentData(),
				module.exports.ReturnADUsersData(),
			])
				// when all promises have resolved
				.then((adUsersResults) => {
					// extract results for convenience
					const adUsersByDivDept = adUsersResults[0].adUsersByDivisionDepartment[0];
					const adUsers = adUsersResults[1].docs;
					// set up empty array to receive the new data
					const adManagers = [];
					// iterate over the array of adUsersByDivDept's property keys
					Object.keys(adUsersByDivDept).forEach((adDivisionKey) => {
						// if this property key is not for the '_id' property
						if (adDivisionKey !== '_id') {
							// iterate over the array of this division object's property keys; 
							// 		these happen to be department names
							Object.keys(adUsersByDivDept[adDivisionKey]).forEach((departmentKey) => {
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
											// eslint-disable-next-line prefer-const
												let downline = {};
												const lookupsToBeProcessed = [managerProfile.account];
												const lookupsProcessed = [];
												while (lookupsToBeProcessed.length !== lookupsProcessed.length) {
												// eslint-disable-next-line no-loop-func
													lookupsToBeProcessed.forEach((lookupToProcess) => {
														if (lookupsProcessed.indexOf(lookupToProcess) === -1) {
															adUsers.forEach((adUser) => {
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
																	// add this user to the department
																	downline[adUserDivision][adUserDepartment]
																		.push(adUser);
																	lookupsToBeProcessed.push(adUser.account);
																}
															});
															lookupsProcessed.push(lookupToProcess);
														}
													});
												}
												const manager = managerProfile;
												manager.downline = downline;
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
};
