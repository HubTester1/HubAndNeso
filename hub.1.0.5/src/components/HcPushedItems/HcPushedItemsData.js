
// ----- IMPORTS

import { Web } from 'sp-pnp-js';
import EnvironmentDetector from '../../services/EnvironmentDetector';

const shortid = require('shortid');

// ----- DATA

export default class HcPushedItemsData {
	static ReturnHubDocsForHcPushedDocs() {
		const hubDocsWeb = new Web('https://bmos.sharepoint.com');
		return hubDocsWeb.lists.getByTitle('HubDocs').items
			.select('FileLeafRef', 'ServerRedirectedEmbedUrl', 'PushToHCName')
			.filter("PushToHC eq '1'")
			.get();
	}

	static ReturnHRDocsForHcPushedDocs() {
		const hrDocsWeb = new Web('https://bmos.sharepoint.com');
		return hrDocsWeb.lists.getByTitle('HR Docs').items
			.select('FileLeafRef', 'ServerRedirectedEmbedUrl', 'PushToHCName')
			.filter("PushToHC eq '1'")
			.get();
	}

	static ReturnPublicSafetyDocsForHcPushedDocs() {
		const psDocsWeb = new Web('https://bmos.sharepoint.com');
		return psDocsWeb.lists.getByTitle('PublicSafetyDocs').items
			.select('FileLeafRef', 'ServerRedirectedEmbedUrl', 'PushToHCName')
			.filter("PushToHC eq '1'").get();
	}

	static ReturnHcPushedLinksForHcPushedDocs() {
		const pushedLinksWeb = new Web('https://bmos.sharepoint.com');
		return pushedLinksWeb.lists.getByTitle('HCPushedLinks').items.get();
	}

	static ReturnAllPushedItemsData() {
		// return a new promise
		return new Promise(((resolve, reject) => {
			// if environment is sharepoint
			if (EnvironmentDetector.ReturnIsSPO()) {
				// collect data async from multiple sources
				const listItemQueryPromises = [
					this.ReturnHubDocsForHcPushedDocs(),
					this.ReturnHRDocsForHcPushedDocs(),
					this.ReturnPublicSafetyDocsForHcPushedDocs(),
					this.ReturnHcPushedLinksForHcPushedDocs(),
				];
				// wait for all queries to be completed
				Promise.all(listItemQueryPromises)
					// if the promise is resolved with the settings
					.then((resultsReturnArray) => {
						// set up var to receive all list items
						const alllistItems = [];
						// iterate over the results and push them to allListItems
						resultsReturnArray.forEach((listValue) => {
							listValue.forEach((itemValue) => {
								const itemFormatted = {
									url: '',
									anchorText: '',
									type: '',
								};
								if (itemValue.ServerRedirectedEmbedUrl) {
									itemFormatted.url = itemValue.ServerRedirectedEmbedUrl;
									itemFormatted.anchorText = itemValue.PushToHCName;
									itemFormatted.type = 'file';
									itemFormatted.key = shortid.generate();

									alllistItems.push(itemFormatted);
								}
								if (itemValue.URL) {
									itemFormatted.url = itemValue.URL.Url;
									itemFormatted.anchorText = itemValue.URL.Description;
									itemFormatted.type = 'page';
									itemFormatted.key = shortid.generate();

									alllistItems.push(itemFormatted);
								}
							});
						});

						// sort allListItems by anchorText properties
						alllistItems.sort((a, b) => {
							if (a.anchorText < b.anchorText) return -1;
							if (a.anchorText > b.anchorText) return 1;
							return 0;
						});
						// resolve this promise with the requested items
						resolve(alllistItems);
					});
			} else {
				// resolve the promise with mock data
				resolve([
					{
						url: 'https://bmos.sharepoint.com/_layouts/15/WopiFrame.aspx?sourcedoc={07444958-497b-49cc-80bd-1aa92ae1093c}&action=interactivepreview',
						anchorText: '2018 Hours of Operation',
						type: 'file',
						key: 'HkXuKjn_hM',
					},
					{
						url: 'https://bmos.sharepoint.com/_layouts/15/WopiFrame.aspx?sourcedoc={1d4e79dc-8e87-497b-8846-6d2311dc92a2}&action=interactivepreview',
						anchorText: '2018 Staff Calendar',
						type: 'file',
						key: 'BkfOYihd2f',
					},
					{
						url: 'https://bmos.sharepoint.com/SitePages/Wellness.aspx',
						anchorText: 'Be Well: Wellness Initiative',
						type: 'page',
						key: 'B1Y_Kin_3f',
					},
					{
						url: 'https://bmos.sharepoint.com/_layouts/15/WopiFrame.aspx?sourcedoc={32511e54-5231-4742-a92e-b77d4e233023}&action=interactivepreview',
						anchorText: 'Early Close Policy',
						type: 'file',
						key: 'Bkuti2_2G',
					},
					{
						url: 'https://bmos.sharepoint.com/_layouts/15/Doc.aspx?sourcedoc={c7f264f1-6d48-446a-9e9a-93124d97ecdf}&action=interactivepreview',
						anchorText: 'Emergency Preparedness & Management Plan',
						type: 'file',
						key: 'B1B_Fo3unz',
					},
					{
						url: 'https://bmos.sharepoint.com/_layouts/15/WopiFrame.aspx?sourcedoc={3a12331d-140f-4bed-ac0e-2053a7365e97}&action=interactivepreview',
						anchorText: 'Employee Handbook',
						type: 'file',
						key: 'SJVOFj2Onz',
					},
					{
						url: 'https://bmos.sharepoint.com/_layouts/15/Doc.aspx?sourcedoc={0f070d10-1cf9-4671-9195-0c22a4bdeb24}&action=interactivepreview',
						anchorText: 'Guest Service Amenities',
						type: 'file',
						key: 'HJl_Kohu2f',
					},
					{
						url: 'http://mosinternships.applicantpro.com/internaljobs/',
						anchorText: 'Internal Internship Listings',
						type: 'page',
						key: 'rkPuYi2_nG',
					},
					{
						url: 'https://mos.applicantpro.com/internaljobs/',
						anchorText: 'Internal Job Listings',
						type: 'page',
						key: 'H18dFo2_3M',
					},
					{
						url: 'https://bmos.sharepoint.com/SitePages/MOScars.aspx',
						anchorText: 'MOScars Recognition and Reward Program',
						type: 'page',
						key: 'HJuOtih_hf',
					},
					{
						url: 'https://bmos.sharepoint.com/sites/mwec/SitePages/Museum-wide%20Event%20Calendar.aspx',
						anchorText: 'Museumwide Event Calendar',
						type: 'page',
						key: 'HJuOtih_hf1',
					},
					{
						url: 'https://bmos.sharepoint.com/sites/pt/SitePages/Product%20Timeline.aspx',
						anchorText: 'Product Timeline',
						type: 'page',
						key: 'HJuOtih_hf2',
					},
					{
						url: 'https://bmos.sharepoint.com/sites/wpc-cafe/SitePages/Riverview%20Caf%C3%A9.aspx',
						anchorText: 'Riverview Café',
						type: 'page',
						key: 'HJuOtih_hf3',
					},
					{
						url: 'https://bmos.sharepoint.com/_layouts/15/Doc.aspx?sourcedoc={d6a0d37f-74aa-4559-9d4b-0dd4132dc44a}&action=interactivepreview',
						anchorText: 'Schedule an Appointment with the Info Desk',
						type: 'file',
						key: 'B1bdtj2OnG',
					},
					
				]);
			}
		}));
	}
}
