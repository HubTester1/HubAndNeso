

/* eslint class-methods-use-this: 0 */
/* eslint no-underscore-dangle: 0 */
/* eslint max-len: 0 */

// ----- IMPORTS

import { HttpClient } from 'sp-pnp-js';

// ----- DATA

export default class HcStaffLookupData {
	constructor() {
		this.ReturnPeoplePickerOptions = this.ReturnPeoplePickerOptions.bind(this);
	}
	ReturnPeoplePickerOptions() {
		return new Promise((resolve, reject) => {
			const client = new HttpClient();
			const searchString = 'andrew';
			const endpointUrl = `${_spPageContextInfo.webServerRelativeUrl}${ 
				'https://bmos.sharepoint.com/_api/SP.UI.ApplicationPages.ClientPeoplePickerWebServiceInterface.clientPeoplePickerSearchUser'
					.replace(/\/\//g, '/')}`;

			client.post(endpointUrl, {
				headers: {
					Accept: 'application/json; odata=verbose',
				},
				body: JSON.stringify({
					queryParams: {
						__metadata: {
							type: 'SP.UI.ApplicationPages.ClientPeoplePickerQueryParameters',
						},
						AllowEmailAddresses: true,
						AllowMultipleEntities: false,
						AllUrlZones: false,
						MaximumEntitySuggestions: 50,
						PrincipalSource: 15,
						PrincipalType: 15,
						QueryString: searchString,
					},
				}),
			})
				.then(response => response.json())
				.then((data) => {
					console.log(JSON.parse(data.d.ClientPeoplePickerSearchUser));
					resolve(JSON.parse(data.d.ClientPeoplePickerSearchUser));
				});
		});
	}
}
