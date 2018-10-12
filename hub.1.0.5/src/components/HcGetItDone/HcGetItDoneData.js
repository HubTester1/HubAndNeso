
// ----- IMPORTS

import { Web } from 'sp-pnp-js';
import shortID from 'shortid';
import EnvironmentDetector from '../../services/EnvironmentDetector';
import NesoHTTPClient from '../../services/NesoHTTPClient';
import MOSUtilities from '../../services/MOSUtilities';

// ----- DATA

export default class HcGetItDoneData {
	static ReturnHRDocsForHcGetItDone() {
		const hrDocsWeb = new Web('https://bmos.sharepoint.com');
		return hrDocsWeb.lists.getByTitle('HR Docs').items
			.select('FileLeafRef', 'ServerRedirectedEmbedUrl', 'Title')
			.filter("Category eq 'Request Forms'")
			.get();
	}

	static ReturnNesoDataForHcGetItDone() {
		return NesoHTTPClient
			.ReturnNesoData('https://neso.mos.org/hcGetItDone/allItems');
	}

	static ReturnAllGetItDoneData() {
		// return a new promise
		return new Promise(((resolve, reject) => {
			// if environment is sharepoint
			if (EnvironmentDetector.ReturnIsSPO()) {
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
								const itemFormatted = {
									url: '',
									anchorText: '',
									type: '',
								};
								if (itemValue.ServerRedirectedEmbedUrl) {
									itemFormatted.url = itemValue.ServerRedirectedEmbedUrl;
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
								if (itemValue.restrictedToRoles) {
									itemFormatted.restrictedToRoles = itemValue.restrictedToRoles;
								}
								allListItemsAlpha.push(itemFormatted);
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
			} else {
				// resolve the promise with mock data
				resolve({
					allListItemsAlpha: [
						{
							url: 'https://bmos.sharepoint.com/sites/mea-interpreter/SitePages/My%20ASL%20Interpreter%20Requests.aspx',
							anchorText: 'ASL Interpreter Request',
							type: 'swf',
							description: 'Request an ASL interpreter to aid visitors.',
							groups: [
								'Accessibility',
							],
							key: 'SkDWDK6MSTG',
						},
						{
							url: 'https://bmos.sharepoint.com/_layouts/15/WopiFrame.aspx?sourcedoc={dc9895f3-4cd2-4293-8250-158820a90511}&action=interactivepreview',
							anchorText: 'Accident Report Form.pdf',
							type: 'file',
							description: null,
							groups: [
								'HR',
							],
							key: 'SJ8lPYpGSTf',
						},
						{
							url: 'https://bmos.sharepoint.com/sites/iit-vpn-access/SitePages/My%20VPN%20Access%20Requests.aspx',
							anchorText: 'VPN Access Request',
							type: 'swf',
							description: 'Request access to the Museum network from other locations.',
							groups: [
								'IIT',
							],
							key: 'rkYMDFpzBaz',
						},
					],
					allListItemsGrouped: [
						{
							name: 'Accessibility',
							key: 'HyO7DFTMSTM',
							items: [
								{
									url: 'https://bmos.sharepoint.com/sites/mea-interpreter/SitePages/My%20ASL%20Interpreter%20Requests.aspx',
									anchorText: 'ASL Interpreter Request',
									type: 'swf',
									description: 'Request an ASL interpreter to aid visitors.',
									groups: [
										'Accessibility',
									],
									key: 'SkDWDK6MSTG',
								},
							],
						},
						{
							name: 'Advancement',
							key: 'r1WVvY6zr6M',
							items: [
								{
									url: 'https://bmos.sharepoint.com/AdvDMSFiles/In-Kind-Donation-Report.docx',
									anchorText: 'In-Kind Gift Report',
									type: 'swf',
									description: 'Report donations of goods or services from individuals, vendors, and other organizations.',
									groups: [
										'Advancement',
									],
									key: 'Bk_-wKpGraf',
								},
							],
						},
						{
							name: 'Collections',
							key: 'Hks7vFTMBpf',
							items: [
								{
									url: 'https://bmos.sharepoint.com/sites/ed-archives-use/SitePages/My%20Archives%20Use%20Requests.aspx',
									anchorText: 'Archives Use Request',
									type: 'swf',
									description: "Request access, use, or reproduction of materials from the Museum's archives.",
									groups: [
										'Collections',
									],
									key: 'HJYWDtTGSTG',
								},
								{
									url: 'https://bmos.sharepoint.com/sites/ed-incoming-loan/SitePages/My%20Incoming%20Loan%20Requests.aspx',
									anchorText: 'Incoming Loan Request',
									type: 'swf',
									description: 'Request a loan of objects from outside individuals or institutions for program or exhibit use.',
									groups: [
										'Collections',
									],
									key: 'HyqWwFazB6f',
								},
								{
									url: 'https://bmos.sharepoint.com/sites/ed-interdepartmental-loan/SitePages/My%20Interdepartmental%20Loan%20Requests.aspx',
									anchorText: 'Interdepartmental Loan Request',
									type: 'swf',
									description: 'Request use of Collections objects for programs or lectures.',
									groups: [
										'Collections',
									],
									key: 'HysZDKpzSaf',
								},
							],
						},
					],
				});
			}
		}));
	}
}
