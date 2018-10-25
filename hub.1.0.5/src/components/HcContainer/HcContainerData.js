
// ----- IMPORTS

import pnp, { Web } from 'sp-pnp-js';
import EnvironmentDetector from '../../services/EnvironmentDetector';
import MOSUtilities from '../../services/MOSUtilities';
import NesoHTTPClient from '../../services/NesoHTTPClient';


// ----- DATA

export default class HcContainerData {
	static ReturnGSEConfig() {
		const gseConfigWeb = new Web('https://bmos.sharepoint.com/sites/hr-service-config');
		return gseConfigWeb.lists.getByTitle('SWFList').items
			.select('AllRequestData')
			.get();
	}
	static ReturnUData() {
		// return a new promise
		return new Promise(((resolve, reject) => {
			// if environment is sharepoint
			if (EnvironmentDetector.ReturnIsSPO()) {
				// collect data async from multiple sources
				const userDataQueryPromises = [
					pnp.sp.web.currentUser.get(),
					NesoHTTPClient
						.ReturnNesoData('https://neso.mos.org/activeDirectory/managers'),
					this.ReturnGSEConfig(),
				];
				// wait for all queries to be completed
				Promise.all(userDataQueryPromises)
					// if the queries returned the data
					.then((resultsArray) => {
						console.log('resultsArray');
						console.log(resultsArray);
						// extract data from responses
						const uData = {
							email: resultsArray[0].Email,
							displayName: resultsArray[0].Title,
							result3: resultsArray[2],
						};
						uData.account =
							MOSUtilities.ReplaceAll('i:0#.f\\|membership\\|', '', MOSUtilities.ReplaceAll('@mos.org', '', resultsArray[0].LoginName.toLowerCase()));
						uData.roles = [];
						if (uData.account === 'sp1') {
							uData.roles.push('gseHRAdmin');
						} else if (uData.account === 'sp2') {
							uData.roles.push('gseJobAdmin');
						} else if (uData.account === 'sp3') {
							uData.roles.push('gseManager');
							uData.roles.push('manager');
						} else {
							// for each manager returned
							resultsArray[1].forEach((manager) => {
								// if the manager's account is the current user's account
								if (manager.account === uData.account) {
									// push manager role to uData
									uData.roles.push('manager');
								}
							});
							let gseConfigString = resultsArray[2][0].AllRequestData;
							const regexOne = new RegExp('\r', 'g');
							const regexTwo = new RegExp('\n', 'g');
							gseConfigString = gseConfigString.replace(regexOne, "'");
							gseConfigString = gseConfigString.replace(regexTwo, "'");

							console.log('gseConfigString');
							console.log(gseConfigString);
							const gseConfig = eval(gseConfigString);

							// eval(`const gseConfig=${gseConfigString}`);
							console.log('gseConfig');
							console.log(gseConfig);
						}
						// resolve this promise with the user data
						resolve(uData);
					})
					// if 1+ queries returned an error, reject this promise with the error
					.catch((error) => { reject(error); });
			} else {
				const user = {
					account: 'jbaker',
					displayName: 'James Baker',
					email: 'jbaker@mos.org',
					roles: [],
				};
				resolve(user);
			}
		}));
	}
}
