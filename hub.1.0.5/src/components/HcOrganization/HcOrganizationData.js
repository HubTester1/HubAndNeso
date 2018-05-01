
// ----- IMPORTS

import { Web } from 'sp-pnp-js';
// import shortID from 'shortid';
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
						const finalReturn = [];
						let orgChartsReturn;
						let divDeptReturn;
						let teamsReturn;
						let otherContactsReturn;
						let missionReturn;
						let divisionKeys;
						let deptKeys;
						
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
							finalReturn[divisionKey] = {};
							finalReturn[divisionKey].depts = [];
							// if there's an org chart for this division
							orgChartsReturn.forEach((orgChart) => {
								if (orgChart.HRISKey === divisionKey) {
									finalReturn[divisionKey].orgChart = 
										orgChart.ServerRedirectedEmbedUrl;
								}
							});
							// if this division has a presence on The Hub
							teamsReturn.forEach((team) => {
								if (team.adKey === divisionKey) {
									finalReturn[divisionKey].hubPageToken = team.pageToken;
								}
							});
							// extract an array of the departments in this division
							deptKeys = Object.keys(divDeptReturn[divisionKey]);
							// for each department in this division
							deptKeys.forEach((deptKey) => {
								// add department to final
								finalReturn[divisionKey].depts[deptKey] = {};
								// if this department has a presence on The Hub
								teamsReturn.forEach((team) => {
									if (typeof (team.adKey) === 'string') {
										if (team.adKey === deptKey) {
											finalReturn[divisionKey].depts[deptKey].hubPageToken =
												team.pageToken;
										}
									}
									if (typeof (team.adKey) === 'object') {
										team.adKey.forEach((adKeyElement) => {
											if (team.adKeyElement === deptKey) {
												finalReturn[divisionKey].depts[deptKey].hubPageToken =
													team.pageToken;
											}
										});
									}
								});
								// add members to department
								finalReturn[divisionKey].depts[deptKey].members = 
									divDeptReturn[divisionKey][deptKey].members;
							});
						});

						console.log('finalReturn');
						console.log(finalReturn);

						/* // set up var to receive all list items
						const allListItemsAlpha = [];
						const allListItemsGroupedTempHolder = {};
						let allListItemsGroupedTempHolderKeys;
						const allListItemsGrouped = [];
						// iterate over the results and push them to allListItemsAlpha
						resultsReturnArray.forEach((listValue) => {
							listValue.forEach((itemValue) => {
								const itemFormatted = {
									url: '',
									anchorText: '',
									type: '',
								};
								if (itemValue.ServerRedirectedEmbedUrl) {
									itemFormatted.url = itemValue.ServerRedirectedEmbedUrl;
									itemFormatted.anchorText = itemValue.FileLeafRef.toString();
									itemFormatted.description = itemValue.Title;
									itemFormatted.groups = ['HR'];
									itemFormatted.type = 'file';
									itemFormatted.key = shortID.generate();

									allListItemsAlpha.push(itemFormatted);
								}
								if (itemValue.URL) {
									itemFormatted.url = itemValue.URL;
									itemFormatted.anchorText = itemValue.Name;
									itemFormatted.description = itemValue.Description;
									itemFormatted.groups = itemValue.Groups;
									itemFormatted.type = 'swf';
									itemFormatted.key = shortID.generate();

									allListItemsAlpha.push(itemFormatted);
								}
							});
						});

						// sort allListItemsAlpha by anchorText properties
						allListItemsAlpha.sort((a, b) => {
							if (a.anchorText < b.anchorText) return -1;
							if (a.anchorText > b.anchorText) return 1;
							return 0;
						});

						// for each item in allListItemsAlpha
						allListItemsAlpha.forEach((itemValue) => {
							// for each group in the item
							itemValue.groups.forEach((groupValue) => {
								// if this group isn't already in the container, add it with 
								// 		a key and an empty items array
								if (!allListItemsGroupedTempHolder[groupValue]) {
									allListItemsGroupedTempHolder[groupValue] = {};
									allListItemsGroupedTempHolder[groupValue].key = shortID.generate();
									allListItemsGroupedTempHolder[groupValue].items = [];
								}
								// add the item to the group
								allListItemsGroupedTempHolder[groupValue].items.push(itemValue);
							});
						});

						// note: what we're doing next is essentially converting an object to an array

						// extract into array from object its "child" / first level keys;
						// 		these keys correspond to group names
						// eslint-disable-next-line
						allListItemsGroupedTempHolderKeys = Object.keys(allListItemsGroupedTempHolder);
						// sort groups key alphabetically
						allListItemsGroupedTempHolderKeys.sort();
						// for each group key
						allListItemsGroupedTempHolderKeys.forEach((keyValue) => {
							allListItemsGrouped.push({
								name: keyValue,
								key: allListItemsGroupedTempHolder[keyValue].key,
								items: allListItemsGroupedTempHolder[keyValue].items,
							});
						});
						// resolve this promise with the requested items
						resolve({
							allListItemsAlpha,
							allListItemsGrouped,
						}); */
						resolve(resultsReturnArray);
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
