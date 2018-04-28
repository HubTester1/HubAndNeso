
// ----- IMPORTS

import pnp from 'sp-pnp-js';
import EnvironmentDetector from './services/EnvironmentDetector';

// ----- DATA

export default class HcContainerData {
	static ReturnUData() {
		// return a new promise
		return new Promise(((resolve, reject) => {
			// if environment is sharepoint
			if (EnvironmentDetector.ReturnIsSPO()) {
				resolve(pnp.sp.web.currentUser.get());
			} else {
				resolve({
					'odata.metadata': 'https://bmos.sharepoint.com/sites/HC6/_api/$metadata#SP.ApiData.Users1/@Element',
					'odata.type': 'SP.User',
					'odata.id': 'https://bmos.sharepoint.com/sites/HC6/_api/Web/GetUserById(8)',
					'odata.editLink': 'Web/GetUserById(8)',
					Id: 8,
					IsHiddenInUI: false,
					LoginName: 'i:0#.f|membership|jbaker@mos.org',
					Title: 'James Baker',
					PrincipalType: 1,
					Email: 'jbaker@mos.org',
					IsEmailAuthenticationGuestUser: false,
					IsShareByEmailGuestUser: false,
					IsSiteAdmin: true,
					UserId: {
						NameId: '1003000080a073fc',
						NameIdIssuer: 'urn:federation:microsoftonline',
					},
				});
			}
		}));
	}
	static ReturnUserDataUsingAccount(email) {
		// return a new promise
		return new Promise(((resolve, reject) => {
			// if environment is sharepoint
			if (EnvironmentDetector.ReturnIsSPO()) {
				resolve(pnp.sp.web.siteUsers.getByEmail(email).get());
			} else {
				resolve({
					'odata.metadata': 'https://bmos.sharepoint.com/sites/HC6/_api/$metadata#SP.ApiData.Users1/@Element',
					'odata.type': 'SP.User',
					'odata.id': 'https://bmos.sharepoint.com/sites/HC6/_api/Web/GetUserById(8)',
					'odata.editLink': 'Web/GetUserById(8)',
					Id: 8,
					IsHiddenInUI: false,
					LoginName: 'i:0#.f|membership|jbaker@mos.org',
					Title: 'James Baker',
					PrincipalType: 1,
					Email: 'jbaker@mos.org',
					IsEmailAuthenticationGuestUser: false,
					IsShareByEmailGuestUser: false,
					IsSiteAdmin: true,
					UserId: {
						NameId: '1003000080a073fc',
						NameIdIssuer: 'urn:federation:microsoftonline',
					},
				});
			}
		}));
	}
}
