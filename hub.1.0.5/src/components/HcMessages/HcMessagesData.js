
// ----- IMPORTS

import { Web } from 'sp-pnp-js';
import EnvironmentDetector from '../../services/EnvironmentDetector';
import NesoHTTPClient from '../../services/NesoHTTPClient';

const shortid = require('shortid');

// ----- DATA

export default class HcMessagesData {
	constructor() {
		this.UploadMessagesFiles = this.UploadMessagesFiles.bind(this);
	}
	static ReturnNesoMessagesTagsForHcMessages() {
		// return a new promise
		return new Promise((resolve, reject) => {
			// if environment is sharepoint
			if (EnvironmentDetector.ReturnIsSPO()) {
				// get a promise to retrieve the settings
				NesoHTTPClient
					.ReturnNesoData('https://neso.mos.org:3001/hcMessages/settings')
					// if the promise is resolved with the settings
					.then((settingsResults) => {
						// set up var to receive all tags
						const allMessageTags = [];
						// iterate over the results and push them to allListItems
						settingsResults[0].tags.forEach((tagValue) => {
							const tagFormatted = {
								name: '',
								camlName: '',
								key: '',
							};
							if (tagValue.name) {
								tagFormatted.name = tagValue.name;
								tagFormatted.camlName = tagValue.camlName;
								tagFormatted.key = shortid.generate();

								allMessageTags.push(tagFormatted);
							}
						});
						// sort allListItems by name properties
						allMessageTags.sort((a, b) => {
							if (a.name < b.name) return -1;
							if (a.name > b.name) return 1;
							return 0;
						});
						// resolve this promise with the requested items
						resolve(allMessageTags);
					});
			} else {
				// resolve the promise with mock data
				resolve([
					{
						name: 'Announcements',
						camlName: 'announcements',
						key: 'ByjqATO2M',
					},
					{
						name: 'Classifieds',
						camlName: 'classifieds',
						key: 'rkdi5Rpd2z',
					},
					{
						name: 'Cool Science',
						camlName: 'coolScience',
						key: 'BkwoqCTuhf',
					},
					{
						name: 'Department News',
						camlName: 'departmentNews',
						key: 'SJxocApOhf',
					},
					{
						name: 'Events',
						camlName: 'events',
						key: 'rJbj50adhz',
					},
					{
						name: 'Good Ideas',
						camlName: 'goodIdeas',
						key: 'HyXjqA6O2M',
					},
					{
						name: 'Kudos',
						camlName: 'kudos',
						key: 'rkNi50pO2z',
					},
					{
						name: 'Lost & Found',
						camlName: 'lostAndFound',
						key: 'BkIi9Cpu2z',
					},
					{
						name: 'Museum in the News',
						camlName: 'museumInTheNews',
						key: 'BkqjcRT_nz',
					},
					{
						name: 'Q & A',
						camlName: 'qAndA',
						key: 'Bkrs5CTd2G',
					},
					{
						name: 'Reports from the Outside',
						camlName: 'reportsFromTheOutside',
						key: 'H1fi90p_hG',
					},
					{
						name: 'Welcome Mat',
						camlName: 'welcomeMat',
						key: 'HJFicA6_nG',
					},
				]);
			}
		});
	}
	static ReturnNesoMessagesMessagesForHcMessages() {
		// return a new promise
		return new Promise(((resolve, reject) => {
			// if environment is sharepoint
			if (EnvironmentDetector.ReturnIsSPO()) {
				// get a promise to retrieve the settings
				NesoHTTPClient
					.ReturnNesoData('https://neso.mos.org:3001/hcMessages/descending')
					// if the promise is resolved with the settings
					.then((messagesResults) => {
						// set up var to receive all messages
						const allMessagesMessages = [];
						// iterate over the results and push them to allListItems
						messagesResults.forEach((messageValues) => {
							const messageFormatted = {
								tags: [],
								subject: '',
								created: '',
								modified: '',
								creator: '',
								body: '',
								images: [],
								expiration: '',

								key: '',
							};
							if (messageValues.messageBody) {
								messageFormatted.tags = messageValues.messageTags;
								messageFormatted.subject = messageValues.messageSubject;
								messageFormatted.created = messageValues.messageCreated;
								messageFormatted.modified = messageValues.messageModified;
								messageFormatted.creator = messageValues.messageCreator;
								messageFormatted.body = messageValues.messageBody;
								messageFormatted.images = messageValues.messageImages;
								messageFormatted.expiration = messageValues.messageExpiration;

								messageFormatted.key = shortid.generate();

								allMessagesMessages.push(messageFormatted);
							}
						});
						// resolve this promise with the requested items
						resolve(allMessagesMessages);
					});
			} else {
				// resolve the promise with mock data
				resolve([
					{
						tags: ['Announcements'],
						subject: 'Message Subject 1',
						created: '2018-04-05',
						modified: '2018-04-05',
						creator: {
							displayName: 'Sheryl White Vincent',
							account: 'swvincent',
						},
						body: 'This is a great messageBody 1. This is a great messageBody 2. This is a great messageBody 3. This is a great messageBody 4. This is a great messageBody 5. This is a great messageBody 6. This is a great messageBody 7. This is a great messageBody 8. This is a great messageBody 9.',
						image: 'https://images.unsplash.com/photo-1518495230660-7ae273cd1366?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=12731bebedfafc5e9c8957292b387103&auto=format&fit=crop&w=400&q=80',
						expiration: '2018-10-05',
						key: 'SknGU_zCOnz',
					},
					{
						tags: ['Events'],
						subject: 'This is a great Message Subject 2',
						created: '2018-04-05',
						modified: '2018-04-05',
						creator: {
							displayName: 'James Baker',
							account: 'jbaker',
						},
						body: 'This is a great messageBody 1. This is a great messageBody 2. This is a great messageBody 3. This is a great messageBody 4. This is a great messageBody 5. This is a great messageBody 6. This is a great messageBody 7. This is a great messageBody 8. This is a great messageBody 9.',
						image: 'https://images.unsplash.com/photo-1471513671800-b09c87e1497c?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=263d1948dcd0e71c59c4929e8fcf3f46&auto=format&fit=crop&w=400&q=80',
						expiration: '2018-10-05',
						key: 'ry6M8_MCunz',
					},
					{
						tags: ['Announcements'],
						subject: 'What an even better Message Subject 3',
						created: '2018-04-05',
						modified: '2018-04-05',
						creator: {
							displayName: 'Jeannette Amazeen-Thomas',
							account: 'jthomas',
						},
						body: 'This is a great messageBody 1. This is a great messageBody 2. This is a great messageBody 3. This is a great messageBody 4. This is a great messageBody 5. This is a great messageBody 6. This is a great messageBody 7. This is a great messageBody 8. This is a great messageBody 9.',
						image: 'https://images.unsplash.com/photo-1444465693019-aa0b6392460d?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=f085fc9ac3af45f1498607ab047305c0&auto=format&fit=crop&w=400&q=80',
						expiration: '2018-10-05',
						key: 'rJRGUuGROnz',
					},
					{
						tags: ['Events'],
						subject: 'Message Subject 4',
						created: '2018-04-05',
						modified: '2018-04-05',
						creator: {
							displayName: 'Kathryn Bartholomew',
							account: 'kbartholomew',
						},
						body: 'This is a great messageBody 1. This is a great messageBody 2. This is a great messageBody 3. This is a great messageBody 4. This is a great messageBody 5. This is a great messageBody 6. This is a great messageBody 7. This is a great messageBody 8. This is a great messageBody 9.',
						image: 'https://images.unsplash.com/photo-1446080501695-8e929f879f2b?ixlib=rb-0.3.5&s=86ca1d4b7444404d412fb12a4f25c5de&auto=format&fit=crop&w=400&q=80',
						expiration: '2018-10-05',
						key: 'HykXUOGCunG',
					},
					{
						tags: ['Announcements'],
						subject: 'This is a great Message Subject 5',
						created: '2018-04-05',
						modified: '2018-04-05',
						creator: {
							displayName: 'Jason Barone-Cichocki',
							account: 'jbcichocki',
						},
						body: 'This is a great messageBody 1. This is a great messageBody 2. This is a great messageBody 3. This is a great messageBody 4. This is a great messageBody 5. This is a great messageBody 6. This is a great messageBody 7. This is a great messageBody 8. This is a great messageBody 9.',
						expiration: '2018-10-05',
						key: 'HklmIufAOhz',
					},
					{
						tags: ['Events'],
						subject: 'What an even better Message Subject 6',
						created: '2018-04-05',
						modified: '2018-04-05',
						creator: {
							displayName: 'Jason Barone-Cichocki',
							account: 'jbcichocki',
						},
						body: 'This is a great messageBody 1. This is a great messageBody 2. This is a great messageBody 3. This is a great messageBody 4. This is a great messageBody 5. This is a great messageBody 6. This is a great messageBody 7. This is a great messageBody 8. This is a great messageBody 9.',
						expiration: '2018-10-05',
						key: 'Skbm8OzAunf',
					},
					{
						tags: ['Announcements'],
						subject: 'Message Subject 7',
						created: '2018-04-05',
						modified: '2018-04-05',
						creator: {
							displayName: 'Kathryn Bartholomew',
							account: 'kbartholomew',
						},
						body: 'This is a great messageBody 1. This is a great messageBody 2. This is a great messageBody 3. This is a great messageBody 4. This is a great messageBody 5. This is a great messageBody 6. This is a great messageBody 7. This is a great messageBody 8. This is a great messageBody 9.',
						expiration: '2018-10-05',
						key: 'ryG7L_GCd2M',
					},
					{
						tags: ['Events'],
						subject: 'This is a great Message Subject 8',
						created: '2018-04-05',
						modified: '2018-04-05',
						creator: {
							displayName: 'Jeannette Amazeen-Thomas',
							account: 'jthomas',
						},
						body: 'This is a great messageBody 1. This is a great messageBody 2. This is a great messageBody 3. This is a great messageBody 4. This is a great messageBody 5. This is a great messageBody 6. This is a great messageBody 7. This is a great messageBody 8. This is a great messageBody 9.',
						expiration: '2018-10-05',
						key: 'BJXQ8OG0dhz',
					},
					{
						tags: ['Announcements'],
						subject: 'What an even better Message Subject 9',
						created: '2018-04-05',
						modified: '2018-04-05',
						creator: {
							displayName: 'James Baker',
							account: 'jbaker',
						},
						body: 'This is a great messageBody 1. This is a great messageBody 2. This is a great messageBody 3. This is a great messageBody 4. This is a great messageBody 5. This is a great messageBody 6. This is a great messageBody 7. This is a great messageBody 8. This is a great messageBody 9.',
						expiration: '2018-10-05',
						key: 'SJNQUdfROnf',
					},
					{
						tags: ['Events'],
						subject: 'Message Subject 10',
						created: '2018-04-05',
						modified: '2018-04-05',
						creator: {
							displayName: 'Sheryl White Vincent',
							account: 'swvincent',
						},
						body: 'This is a great messageBody 1. This is a great messageBody 2. This is a great messageBody 3. This is a great messageBody 4. This is a great messageBody 5. This is a great messageBody 6. This is a great messageBody 7. This is a great messageBody 8. This is a great messageBody 9.',
						expiration: '2018-10-05',
						key: 'BJHQL_G0O2M',
					},
				]);
			}
		}));
	}
	static ReturnNesoMessagesMessagesWithSpecifiedTagForHcMessages(tag) {
		// return a new promise
		return new Promise(((resolve, reject) => {
			// if environment is sharepoint
			if (EnvironmentDetector.ReturnIsSPO()) {
				// get a promise to retrieve the settings
				NesoHTTPClient
					.ReturnNesoData(`https://neso.mos.org:3001/hcMessages/descending/tagged/${tag}`)
					// if the promise is resolved with the settings
					.then((messagesResults) => {
						// set up var to receive all messages
						const allMessagesMessages = [];
						// iterate over the results and push them to allListItems
						messagesResults.forEach((messageValues) => {
							const messageFormatted = {
								tags: [],
								subject: '',
								created: '',
								modified: '',
								creator: '',
								body: '',
								images: [],
								expiration: '',

								key: '',
							};
							if (messageValues.messageBody) {
								messageFormatted.tags = messageValues.messageTags;
								messageFormatted.subject = messageValues.messageSubject;
								messageFormatted.created = messageValues.messageCreated;
								messageFormatted.modified = messageValues.messageModified;
								messageFormatted.creator = messageValues.messageCreator;
								messageFormatted.body = messageValues.messageBody;
								messageFormatted.images = messageValues.messageImages;
								messageFormatted.expiration = messageValues.messageExpiration;

								messageFormatted.key = shortid.generate();

								allMessagesMessages.push(messageFormatted);
							}
						});
						// resolve this promise with the requested items
						resolve(allMessagesMessages);
					});
			} else {
				// resolve the promise with mock data
				resolve([
					{
						tags: ['Announcements'],
						subject: 'Message Subject 1',
						created: '2018-04-05',
						modified: '2018-04-05',
						creator: {
							displayName: 'Sheryl White Vincent',
							account: 'swvincent',
						},
						body: 'This is a great messageBody 1. This is a great messageBody 2. This is a great messageBody 3. This is a great messageBody 4. This is a great messageBody 5. This is a great messageBody 6. This is a great messageBody 7. This is a great messageBody 8. This is a great messageBody 9.',
						image: 'https://images.unsplash.com/photo-1518495230660-7ae273cd1366?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=12731bebedfafc5e9c8957292b387103&auto=format&fit=crop&w=400&q=80',
						expiration: '2018-10-05',
						key: 'SknGU_zCOnz',
					},
					{
						tags: ['Events'],
						subject: 'This is a great Message Subject 2',
						created: '2018-04-05',
						modified: '2018-04-05',
						creator: {
							displayName: 'James Baker',
							account: 'jbaker',
						},
						body: 'This is a great messageBody 1. This is a great messageBody 2. This is a great messageBody 3. This is a great messageBody 4. This is a great messageBody 5. This is a great messageBody 6. This is a great messageBody 7. This is a great messageBody 8. This is a great messageBody 9.',
						image: 'https://images.unsplash.com/photo-1471513671800-b09c87e1497c?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=263d1948dcd0e71c59c4929e8fcf3f46&auto=format&fit=crop&w=400&q=80',
						expiration: '2018-10-05',
						key: 'ry6M8_MCunz',
					},
					{
						tags: ['Announcements'],
						subject: 'What an even better Message Subject 3',
						created: '2018-04-05',
						modified: '2018-04-05',
						creator: {
							displayName: 'Jeannette Amazeen-Thomas',
							account: 'jthomas',
						},
						body: 'This is a great messageBody 1. This is a great messageBody 2. This is a great messageBody 3. This is a great messageBody 4. This is a great messageBody 5. This is a great messageBody 6. This is a great messageBody 7. This is a great messageBody 8. This is a great messageBody 9.',
						image: 'https://images.unsplash.com/photo-1444465693019-aa0b6392460d?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=f085fc9ac3af45f1498607ab047305c0&auto=format&fit=crop&w=400&q=80',
						expiration: '2018-10-05',
						key: 'rJRGUuGROnz',
					},
					{
						tags: ['Events'],
						subject: 'Message Subject 4',
						created: '2018-04-05',
						modified: '2018-04-05',
						creator: {
							displayName: 'Kathryn Bartholomew',
							account: 'kbartholomew',
						},
						body: 'This is a great messageBody 1. This is a great messageBody 2. This is a great messageBody 3. This is a great messageBody 4. This is a great messageBody 5. This is a great messageBody 6. This is a great messageBody 7. This is a great messageBody 8. This is a great messageBody 9.',
						image: 'https://images.unsplash.com/photo-1446080501695-8e929f879f2b?ixlib=rb-0.3.5&s=86ca1d4b7444404d412fb12a4f25c5de&auto=format&fit=crop&w=400&q=80',
						expiration: '2018-10-05',
						key: 'HykXUOGCunG',
					},
					{
						tags: ['Announcements'],
						subject: 'This is a great Message Subject 5',
						created: '2018-04-05',
						modified: '2018-04-05',
						creator: {
							displayName: 'Jason Barone-Cichocki',
							account: 'jbcichocki',
						},
						body: 'This is a great messageBody 1. This is a great messageBody 2. This is a great messageBody 3. This is a great messageBody 4. This is a great messageBody 5. This is a great messageBody 6. This is a great messageBody 7. This is a great messageBody 8. This is a great messageBody 9.',
						expiration: '2018-10-05',
						key: 'HklmIufAOhz',
					},
					{
						tags: ['Events'],
						subject: 'What an even better Message Subject 6',
						created: '2018-04-05',
						modified: '2018-04-05',
						creator: {
							displayName: 'Jason Barone-Cichocki',
							account: 'jbcichocki',
						},
						body: 'This is a great messageBody 1. This is a great messageBody 2. This is a great messageBody 3. This is a great messageBody 4. This is a great messageBody 5. This is a great messageBody 6. This is a great messageBody 7. This is a great messageBody 8. This is a great messageBody 9.',
						expiration: '2018-10-05',
						key: 'Skbm8OzAunf',
					},
					{
						tags: ['Announcements'],
						subject: 'Message Subject 7',
						created: '2018-04-05',
						modified: '2018-04-05',
						creator: {
							displayName: 'Kathryn Bartholomew',
							account: 'kbartholomew',
						},
						body: 'This is a great messageBody 1. This is a great messageBody 2. This is a great messageBody 3. This is a great messageBody 4. This is a great messageBody 5. This is a great messageBody 6. This is a great messageBody 7. This is a great messageBody 8. This is a great messageBody 9.',
						expiration: '2018-10-05',
						key: 'ryG7L_GCd2M',
					},
					{
						tags: ['Events'],
						subject: 'This is a great Message Subject 8',
						created: '2018-04-05',
						modified: '2018-04-05',
						creator: {
							displayName: 'Jeannette Amazeen-Thomas',
							account: 'jthomas',
						},
						body: 'This is a great messageBody 1. This is a great messageBody 2. This is a great messageBody 3. This is a great messageBody 4. This is a great messageBody 5. This is a great messageBody 6. This is a great messageBody 7. This is a great messageBody 8. This is a great messageBody 9.',
						expiration: '2018-10-05',
						key: 'BJXQ8OG0dhz',
					},
					{
						tags: ['Announcements'],
						subject: 'What an even better Message Subject 9',
						created: '2018-04-05',
						modified: '2018-04-05',
						creator: {
							displayName: 'James Baker',
							account: 'jbaker',
						},
						body: 'This is a great messageBody 1. This is a great messageBody 2. This is a great messageBody 3. This is a great messageBody 4. This is a great messageBody 5. This is a great messageBody 6. This is a great messageBody 7. This is a great messageBody 8. This is a great messageBody 9.',
						expiration: '2018-10-05',
						key: 'SJNQUdfROnf',
					},
					{
						tags: ['Events'],
						subject: 'Message Subject 10',
						created: '2018-04-05',
						modified: '2018-04-05',
						creator: {
							displayName: 'Sheryl White Vincent',
							account: 'swvincent',
						},
						body: 'This is a great messageBody 1. This is a great messageBody 2. This is a great messageBody 3. This is a great messageBody 4. This is a great messageBody 5. This is a great messageBody 6. This is a great messageBody 7. This is a great messageBody 8. This is a great messageBody 9.',
						expiration: '2018-10-05',
						key: 'BJHQL_G0O2M',
					},
				]);
			}
		}));
	}
	static SendSaveErrorEmail(stateData) {
		// return a new promise
		return new Promise(((resolve, reject) => {
			// if environment is sharepoint
			if (EnvironmentDetector.ReturnIsSPO()) {
				// get a promise to send the email
				NesoHTTPClient.SendNesoJSONAndReceiveResponse(
					'https://neso.mos.org:3001/email/send',
					{
						to: 'hubhelp@mos.org',
						from: 'The Hub <noreply@mos.org>',
						subject: 'HcMessages Save Error',
						html: JSON.stringify(stateData),
						system: 'hub',
						type: 'HcMessages Save Error',
						event: 'HcMessages Save Error',
					},
				)
					.then((response) => {
						resolve(response);
					})
					.catch((error) => {
						reject(error);
					});
			} else {
				// resolve the promise with mock data
				resolve({ name: 'mock response', data: { error: false } });
			}
		}));
	}
	static SendNesoMessagesMessage(newMessageProperties) {
		// return a new promise
		return new Promise(((resolve, reject) => {
			// if environment is sharepoint
			if (EnvironmentDetector.ReturnIsSPO()) {
				// get a promise to send the email
				NesoHTTPClient.SendNesoJSONAndReceiveResponse(
					'https://neso.mos.org:3001/hcMessages/addMessage',
					newMessageProperties,
				)
					.then((response) => {
						resolve(response);
					})
					.catch((error) => {
						reject(error);
					});
			} else {
				// resolve the promise with mock data
				resolve({ name: 'mock response', data: { error: false } });
			}
		}));
	}
	static ReturnNesoNextMessageID() {
		// return a new promise
		return new Promise((resolve, reject) => {
			// if environment is sharepoint
			if (EnvironmentDetector.ReturnIsSPO()) {
				// get a promise to retrieve the settings
				NesoHTTPClient
					.ReturnNesoData('https://neso.mos.org:3001/hcMessages/nextMessageID')
					// if the promise is resolved with the ID
					.then((nextMessageIDResults) => {
						// resolve this promise with the requested items
						resolve(nextMessageIDResults);
					})
					.catch((nesoAxiosError) => {
						reject(nesoAxiosError); 
					});
			} else {
				resolve({ nextMessageID: 37 });
			}
		});
	}
	static UploadMessagesFiles(messageID, filesArray) {
		// return a promise to upload the fies
		return new Promise((resolve, reject) => {
			// if environment is sharepoint
			if (EnvironmentDetector.ReturnIsSPO()) {
				// get promise to create new folder named for the message ID
				const spWeb = new Web('https://bmos.sharepoint.com');
				spWeb.lists.getByTitle('HcMessagesFiles').rootFolder.folders.add(messageID)
					// if the folder was created
					.then((folderResponse) => {
						// set up file upload promise container
						const fileUploadPromises = [];
						// for each file in filesArray
						filesArray.forEach((fileValue) => {
							// push an upload promise to the container
							fileUploadPromises.push(this.UploadOneMessageFile(messageID, fileValue));
						});
						// when all of the upload promises have been resolved
						Promise.all(fileUploadPromises)
							.then((fileUploadResults) => {
								// resolve the top level promise with the file upload results
								resolve({
									error: 'check',
									fileUploadResults,
								});
							});
					})
					// if the folder was not created
					.catch((error) => {
						// reject the top level promise with 
						reject({
							error: true,
							spFileCreationError: true,
						});
					});
			} else {
				// set up file upload promise container
				const fileUploadPromises = [];
				// for each file in filesArray
				filesArray.forEach((fileValue) => {
					// push an upload promise to the container
					fileUploadPromises.push(this.UploadOneMessageFile(messageID, fileValue));
				});
				// when all of the upload promises have been resolved
				Promise.all(fileUploadPromises)
					.then((fileUploadResults) => {
						// resolve the top level promise with the file upload results
						resolve({
							error: 'check',
							fileUploadResults,
						});
					});
			}
		});
	}
	static UploadOneMessageFile(folder, file) {
		// return a promise to upload the single fie
		return new Promise((resolve, reject) => {
			// if environment is sharepoint
			if (EnvironmentDetector.ReturnIsSPO()) {
				// upload the file
				const spWeb = new Web('https://bmos.sharepoint.com');
				spWeb.getFolderByServerRelativeUrl(`/HcMessagesFiles/${folder}`)
					.files.add(file.name, file, true)
					// if the upload was successful
					.then((fileResponse) => {
						// resolve the top level promise with info about the file and its upload
						resolve({
							name: file.name,
							size: file.size,
							url: fileResponse.data.ServerRelativeUrl,
							error: false,
							key: shortid.generate(),
						});
					})
					// if there was an error
					.catch((fileError) => {
						// then resolve the top level promise with info about the file and its upload
						reject({
							name: file.name,
							error: true,
							key: shortid.generate(),
						});
					});
			} else {
				resolve({
					name: file.name,
					size: file.size,
					url: 'https://bmos.sharepoint.com/HcMessagesFiles/1/pic1.jpg',
					error: false,
					key: shortid.generate(),
				});
			}
		});
	}
}
