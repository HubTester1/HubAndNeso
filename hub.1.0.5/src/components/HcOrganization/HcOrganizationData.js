
// ----- IMPORTS

import { Web } from 'sp-pnp-js';
import shortID from 'shortid';
import EnvironmentDetector from '../../services/EnvironmentDetector';
import NesoHTTPClient from '../../services/NesoHTTPClient';

// ----- DATA

export default class HcGetItDoneData {
	static ReturnHRDocsForHcOrganization() {
		const hrDocsWeb = new Web('https://bmos.sharepoint.com');
		return hrDocsWeb.lists.getByTitle('HR Docs').items
			.select('FileLeafRef', 'ServerRedirectedEmbedUrl', 'Title', 'HRISKey')
			.filter('HRISKey ne null')
			.get();
	}

	static ReturnNesoDataForADUsersByDivDept() {
		return new Promise((resolve, reject) => {
			NesoHTTPClient
				.ReturnNesoData('https://neso.mos.org:3001/activeDirectory/divDept')
				.then((response) => {
					resolve(response);
				})
				.catch((error) => {
					reject(error);
				});
		});
	}

	static ReturnNesoDataForTeams() {
		return new Promise((resolve, reject) => {
			NesoHTTPClient
				.ReturnNesoData('https://neso.mos.org:3001/activeDirectory/teams')
				.then((response) => {
					resolve(response);
				})
				.catch((error) => {
					reject(error);
				});
		});
	}

	static ReturnAllOrganizationData() {
		// return a new promise
		return new Promise(((resolve, reject) => {
			// if environment is sharepoint
			if (EnvironmentDetector.ReturnIsSPO()) {
				// collect data async from multiple sources
				const listItemQueryPromises = [
					this.ReturnHRDocsForHcOrganization(),
					this.ReturnNesoDataForADUsersByDivDept(),
					this.ReturnNesoDataForTeams(),
				];
				// wait for all queries to be completed
				Promise.all(listItemQueryPromises)
					// if the promise is resolved with the settings
					.then((resultsReturnArray) => {
						console.log(resultsReturnArray);
						let orgChartsReturn;
						let divDeptReturn;
						let teamsReturn;
						let otherContactsReturn;
						let missionReturn;
						let divisionKeys;
						let deptKeys;

						const divDeptTempHolder = {};
						let divDeptTempHolderDivKeys;
						let divDeptTempHolderDeptKeys;
						let divDeptFinal;

						const finalResolution = {
							divDept: [],
							otherContacts: [],
							mission: '',
						};

						
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
						});

						console.log('orgChartsReturn');
						console.log(orgChartsReturn);
						console.log('divDeptReturn');
						console.log(divDeptReturn);
						console.log('teamsReturn');
						console.log(teamsReturn);

						// extract an array of all divisions
						divisionKeys = Object.keys(divDeptReturn);

						divisionKeys.forEach((divisionKey) => {
							// add division to final
							divDeptTempHolder[divisionKey] = {};
							divDeptTempHolder[divisionKey].depts = {};
							// if there's an org chart for this division
							orgChartsReturn.forEach((orgChart) => {
								if (orgChart.HRISKey === divisionKey) {
									divDeptTempHolder[divisionKey].orgChart = 
										orgChart.ServerRedirectedEmbedUrl;
								}
							});
							// if this division has a presence on The Hub
							teamsReturn.forEach((team) => {
								if (team.adKey) {
									team.adKey.forEach((adKeyElement) => {
										if (adKeyElement.trim() === divisionKey.trim()) {
											divDeptTempHolder[divisionKey].hubScreenToken =
												team.pageToken;
										}
									});
								}
							});
							// extract an array of the departments in this division
							deptKeys = Object.keys(divDeptReturn[divisionKey]);
							// for each department in this division
							deptKeys.forEach((deptKey) => {
								// add department to final
								divDeptTempHolder[divisionKey].depts[deptKey] = {};
								// if this department has a presence on The Hub
								teamsReturn.forEach((team) => {
									if (team.adKey) {
										team.adKey.forEach((adKeyElement) => {
											if (adKeyElement.trim() === deptKey.trim()) {
												divDeptTempHolder[divisionKey].depts[deptKey].hubScreenToken =
													team.pageToken;
											}
										});
									}
								});
								// add members to department
								divDeptTempHolder[divisionKey].depts[deptKey].members = 
									divDeptReturn[divisionKey][deptKey].members;
							});
						});

						console.log('divDeptTempHolder');
						console.log(divDeptTempHolder);


						// note: what we're doing next is essentially converting an object to an array

						// extract into array from object its "child" / first level keys;
						// 		these keys correspond to division names
						// eslint-disable-next-line
						divDeptTempHolderDivKeys = Object.keys(divDeptTempHolder);
						// sort division key alphabetically
						divDeptTempHolderDivKeys.sort();
						// for each division key
						divDeptTempHolderDivKeys.forEach((divKeyValue) => {
							// if it's not the mongo id (i.e., it's actually a division)
							if (divKeyValue !== '_id') {
								// create a division object with name and react key and empty depts array
								const divObject = {
									name: divKeyValue,
									key: shortID.generate(),
									depts: [],
								};
								// is this division has a hubScreenToken
								if (divDeptTempHolder[divKeyValue].hubScreenToken) {
									// add it to the division object
									divObject.hubScreenToken = divDeptTempHolder[divKeyValue].hubScreenToken;
								}
								// if this division has an orgChart
								if (divDeptTempHolder[divKeyValue].orgChart) {
									// add it to the division object
									divObject.orgChart = divDeptTempHolder[divKeyValue].orgChart;
								}
								// extract into array from object its "child" / first level keys;
								// 		these keys correspond to department names
								divDeptTempHolderDeptKeys = Object.keys(divDeptTempHolder[divKeyValue].depts);
								// for each department key
								divDeptTempHolderDeptKeys.forEach((deptKeyValue) => {
									// create a department object with name and react key and an empty members array
									const deptObject = {
										name: deptKeyValue,
										key: shortID.generate(),
										members: [],
									};
									// is this department has a hubScreenToken
									if (divDeptTempHolder[divKeyValue].depts[deptKeyValue].hubScreenToken) {
									// add it to the department object
										deptObject.hubScreenToken =
											divDeptTempHolder[divKeyValue].depts[deptKeyValue].hubScreenToken;
									}
									// for each member in this department
									divDeptTempHolder[divKeyValue].depts[deptKeyValue]
										.members.forEach((member) => {
											// create a member object
											const memberObject = {
												account: member.account,
												displayName: member.displayName,
												title: member.title,
												email: member.email,
												officePhone: member.officePhone,
												mobilePhone: member.mobilePhone,
											};
											deptObject.members.push(memberObject);
										});
									// push the department object to the depts array of the division object
									divObject.depts.push(deptObject);
								});
								// push the division object to the finalResolution divDept array
								finalResolution.divDept.push(divObject);
							}
						});

						console.log('finalResolution');
						console.log(finalResolution);


						resolve(divDeptReturn);
					})
					.catch((queryError) => {
						console.log(queryError);
						reject({
							error: true,
							queryError,
						});
					});
			} else {
				// resolve the promise with mock data
				resolve({});
			}
		}));
	}
}
