
// ----- IMPORTS

import * as React from 'react';
import { Environment, EnvironmentType } from '@microsoft/sp-core-library';
import MockHttpClient from '../data/MockHttpClient';
import NesoHTTPClient from '../../../helpers/NesoHTTPClient';
import { IHcStaffLookupProps } from './IHcStaffLookupProps';
import { escape } from '@microsoft/sp-lodash-subset';


// ----- DEFINE INTERFACES



// ----- COMPONENT

export default class HcStaffLookup extends React.Component<any, any> {

/* 
	public componentDidMount() {
		// if we're in the local environment
		if (Environment.type === EnvironmentType.Local) {

			// get a promise to get mock list data
			MockHttpClient.getMessages()
				// if the promise is resolved with the data
				.then((getMessagesResponse) => {
					// use the data to set state
					this.setState(() => ({
						messagesArray: getMessagesResponse,
					}));
				});

			// get a promise to get mock list data
			MockHttpClient.getMessagesSettings()
				// if the promise is resolved with the data
				.then((getMessagesSettingsResponse) => {
					// use the data to set state
					this.setState(() => ({
						categoriesArray: getMessagesSettingsResponse,
					}));
				});
			// if we're in the SPO environment
		} else if (Environment.type == EnvironmentType.SharePoint ||
			Environment.type == EnvironmentType.ClassicSharePoint) {

			// get a promise to get Neso data
			NesoHTTPClient.GetNesoData('https://neso.mos.org/hcMessages/settings')
				// if the promise is resolved with the docs, then resolve this promise with the docs
				.then((result) => {
					this.setState(() => ({
						categoriesArray: result['data']['docs'][0]['categories'],
					}));
				})
				// if the promise is rejected with an error, then reject this promise with an error
				.catch((error) => {
					// do nothing
				});

			// get a promise to get Neso data
			NesoHTTPClient.GetNesoData('https://neso.mos.org/hcMessages/messages')
				// if the promise is resolved with the docs, then resolve this promise with the docs
				.then((result) => {
					this.setState(() => ({
						messagesArray: result['data']['docs'],
					}));
				})
				// if the promise is rejected with an error, then reject this promise with an error
				.catch((error) => {
					// do nothing
				});
		}
	}

 */


	public render() {
		return (
			<div id="hc-staff-lookup" className="mos-react-component-root">
			</div>
		);
	}
}
