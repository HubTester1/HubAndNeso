
// ----- IMPORTS

import pnp, { Web } from 'sp-pnp-js';
import EnvironmentDetector from './EnvironmentDetector';
import MOSUtilities from './MOSUtilities';
import NesoHTTPClient from './NesoHTTPClient';


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
					// extract data from responses
					const uData = {
						email: resultsArray[0].Email,
						displayName: resultsArray[0].Title,
						result3: resultsArray[2],
					};
					uData.account =
							MOSUtilities.ReplaceAll('i:0#.f\\|membership\\|', '', MOSUtilities.ReplaceAll('@mos.org', '', resultsArray[0].LoginName.toLowerCase()));
					/* uData.accountLong = resultsArray[0].LoginName.toLowerCase(); */

					uData.roles = [];
					/* if (uData.account === 'sp1') {
							uData.roles.push('gseHRAdmin');
						} else if (uData.account === 'sp2') {
							uData.roles.push('gseJobAdmin');
						} else if (uData.account === 'sp3') {
							uData.roles.push('gseManager');
							uData.roles.push('manager'); */

					if (uData.account === 'sp3') {
						uData.roles.push('manager');
					} else {
						// for each manager returned
						resultsArray[1].forEach((manager) => {
							// if the manager's account is the current user's account
							if (manager.account === uData.account) {
								// push manager and gseManager roles to uData
								uData.roles.push('manager');
								// uData.roles.push('gseManager');
							}
						});

						/* // extract GSE config data
							let gseConfigString = resultsArray[2][0].AllRequestData;
							const regexOne = new RegExp('\r', 'g');
							const regexTwo = new RegExp('\n', 'g');
							gseConfigString = gseConfigString.replace(regexOne, "'");
							gseConfigString = gseConfigString.replace(regexTwo, "'");
							const gseConfig = JSON.parse(gseConfigString);
							
							// for each hr admin returned
							gseConfig['HR-Admins'].forEach((hrAdmin) => {
								// if the hr admins's account is the current user's account
								if (hrAdmin.account === uData.accountLong) {
									// push gseHRAdmin role to uData
									uData.roles.push('gseHRAdmin');
								}
							});

							// for each job admin returned
							gseConfig['Job-Admins'].forEach((hrAdmin) => {
								// if the job admins's account is the current user's account
								if (hrAdmin.account === uData.accountLong) {
									// push gseJobAdmin role to uData
									uData.roles.push('gseJobAdmin');
								}
							}); */
					}
					// resolve this promise with the user data
					resolve(uData);
				})
			// if 1+ queries returned an error, reject this promise with the error
				.catch((error) => { reject(error); });
		}));
	}
}
