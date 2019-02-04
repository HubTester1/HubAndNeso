
// ----- IMPORTS

import { Web } from 'sp-pnp-js';
import shortID from 'shortid';
import NesoHTTPClient from '../../services/NesoHTTPClient';
import MOSUtilities from '../../services/MOSUtilities';
import AccessControl from '../../services/AccessControl';

// ----- DATA

export default class HcGetItDoneData {
	static ReturnHRDocsForHcGetItDone() {
		const hrDocsWeb = new Web('https://bmos.sharepoint.com');
		return hrDocsWeb.lists.getByTitle('HR Docs').items
			.select('File/ServerRelativeUrl', 'FileLeafRef', 'ServerRedirectedEmbedUrl', 'Title')
			.expand('File')
			.filter("Category eq 'Request Forms'")
			.get();
	}

	static ReturnNesoDataForHcGetItDone() {
		return NesoHTTPClient
			.ReturnNesoData('https://neso.mos.org/hcGetItDone/allItems');
	}

	static ReturnAllGetItDoneData(uData) {
		// return a new promise
		return new Promise(((resolve, reject) => {
			// collect data async from multiple sources
			const listItemQueryPromises = [
				this.ReturnHRDocsForHcGetItDone(),
				this.ReturnNesoDataForHcGetItDone(),
			];
				// wait for all queries to be completed
			Promise.all(listItemQueryPromises)
			// if the promise is resolved with the settings
				.then((resultsReturnArray) => {
					// console.log('resultsReturnArray');
					// console.log(resultsReturnArray);
					// set up var to receive all list items
					const allListItemsAlpha = [];
					const allListItemsGroupedTempHolder = {};
					let allListItemsGroupedTempHolderKeys;
					const allListItemsGrouped = [];
					// iterate over the results and push them to allListItemsAlpha
					resultsReturnArray.forEach((listValue) => {
						listValue.forEach((itemValue) => {
							let userHasPermission = false;
							if (!itemValue.restrictedToRoles) {
								userHasPermission = true;
							} else {
								userHasPermission = AccessControl
									.UserRolesAllowAccess(uData.roles, itemValue.restrictedToRoles, itemValue.restrictedFromRoles);
							}
							if (userHasPermission) {
								const itemFormatted = {
									url: '',
									anchorText: '',
									type: '',
								};
								if (itemValue.ServerRedirectedEmbedUrl) {
									itemFormatted.url = itemValue.File.ServerRelativeUrl;
									// itemFormatted.url = itemValue.ServerRedirectedEmbedUrl;
									itemFormatted.anchorText =
										MOSUtilities.ReplaceAll('.pdf', '', MOSUtilities.ReplaceAll('.docx', '', itemValue.FileLeafRef.toString()));
									itemFormatted.description = itemValue.Title;
									itemFormatted.groups = ['HR'];
									itemFormatted.type = 'file';
									itemFormatted.key = shortID.generate();
								}
								if (itemValue.URL) {
									itemFormatted.url = itemValue.URL;
									itemFormatted.anchorText = itemValue.Name;
									itemFormatted.description = itemValue.Description;
									itemFormatted.groups = itemValue.Groups;
									itemFormatted.type = 'swf';
									itemFormatted.key = shortID.generate();
								}
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
					});
				})
				.catch((queryError) => {
					reject({
						error: true,
						queryError,
					});
				});
		}));
	}
}
