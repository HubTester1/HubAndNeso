
// ----- IMPORTS

import pnp, { Web } from 'sp-pnp-js';
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
	static SetComponentGroupID() {
		// set component group ID
		if (window.mData && window.mData.axle && window.mData.axle === 1) {
			window.mData.componentGroupID = 1;
		}
		if (window.mData && window.mData.community && window.mData.community === 1) {
			window.mData.componentGroupID = 2;
		}
		if (window.mData && window.mData.swf && window.mData.swf === 1) {
			window.mData.componentGroupID = 3;
		}
		if (window.mData && window.mData.visualization && window.mData.visualization === 1) {
			window.mData.componentGroupID = 4;
		}
	}
	static ReturnComponentGroupAdminData() {
		// set component group ID
		this.SetComponentGroupID();
		// get and retrieve the data
		const gseComponentGroupLogWeb = new Web('https://bmos.sharepoint.com/sites/hubprod/');
		return gseComponentGroupLogWeb.lists.getByTitle('Component Group Log').items
			// .select('GroupAdminAccess')
			.select('GroupAdminAccess/Name')
			.expand('GroupAdminAccess')
			.filter(`ComponentGroupID eq '${window.mData.componentGroupID}'`)
			.get();
	}
	static ReturnThisUserIsComponentGroupAdmin() {
		// return a new promise
		return new Promise((resolve, reject) => {
			// get a promise to retrieve the component group admin data
			this.ReturnComponentGroupAdminData()
				// if the promise was resolved with the data
				.then((result) => {
					const groupAdminAccess = []; 
					result[0].GroupAdminAccess.forEach((user) => {
						groupAdminAccess.push(user.Name);
					});
					resolve(groupAdminAccess);
				})
				// if the promise was rejected with an error
				.catch((error) => {
					reject(error);
				});
		});
	}


	static ReturnUData() {
		// return a new promise
		return new Promise(((resolve, reject) => {
			// collect data async from multiple sources
			const userDataQueryPromises = [
				pnp.sp.web.currentUser.get(),
				NesoHTTPClient
					.ReturnNesoData('https://neso.mos.org/activeDirectory/managers'),
				this.ReturnThisUserIsComponentGroupAdmin(),
				// this.ReturnGSEConfig(),
			];
				// wait for all queries to be completed
			Promise.all(userDataQueryPromises)
			// if the queries returned the data
				.then((resultsArray) => {
					// extract data from responses
					const uData = {
						email: resultsArray[0].Email,
						displayName: resultsArray[0].Title,
					};
					uData.account =
							MOSUtilities.ReplaceAll('i:0#.f\\|membership\\|', '', MOSUtilities.ReplaceAll('@mos.org', '', resultsArray[0].LoginName.toLowerCase()));
					uData.accountLong = resultsArray[0].LoginName.toLowerCase();

					/* const uData = {
						email: 'tfarrand@mos.org',
						account: 'tfarrand',
						accountLong: 'i:0#.f|membership|tfarrand@mos.org',
						displayName: 'Tony Farrand',
					}; */


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
						console.log('user service managers');
						console.log(resultsArray[1]);
						console.log('user service comp admins');
						console.log(resultsArray[2]);
						// for each manager returned
						resultsArray[1].forEach((manager) => {
							// if the manager's account is the current user's account
							if (manager.account === uData.account) {
								// push manager and gseManager roles to uData
								uData.roles.push('manager');
								// uData.roles.push('gseManager');
							}
						});
						resultsArray[2].forEach((componentAdmin) => {
							if (componentAdmin === uData.accountLong) {
								// push admin and componentGrpAdmin roles to uData
								uData.roles.push('admin');
								uData.roles.push('componentGrpAdmin');
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
					console.log('user service uData');
					console.log(uData);
					resolve(uData);
				})
			// if 1+ queries returned an error, reject this promise with the error
				.catch((error) => { reject(error); });
		}));
	}
}
