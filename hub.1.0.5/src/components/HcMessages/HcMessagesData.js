
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
	static ReturnHcMessagesTags() {
		// return a new promise
		return new Promise((resolve, reject) => {
			// if environment is sharepoint
			if (EnvironmentDetector.ReturnIsSPO()) {
				// get a promise to retrieve the settings
				NesoHTTPClient
					.ReturnNesoData('https://neso.mos.org/hcMessages/settings')
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
	static ReturnHcMessagesAllMessages() {
		// return a new promise
		return new Promise(((resolve, reject) => {
			// if environment is sharepoint
			if (EnvironmentDetector.ReturnIsSPO()) {
				// get a promise to retrieve the settings
				NesoHTTPClient
					.ReturnNesoData('https://neso.mos.org/hcMessages/descending')
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
								messageFormatted.images = [];
								messageFormatted.expiration = messageValues.messageExpiration;

								messageFormatted.key = shortid.generate();

								messageValues.messageImages.forEach((imageValue) => {
									const imageValueCopy = imageValue;
									imageValueCopy.imageKey = shortid.generate();
									imageValueCopy.previewKey = shortid.generate();
									messageFormatted.images.push(imageValueCopy);
								});

								allMessagesMessages.push(messageFormatted);
							}
						});
						console.log('allMessagesMessages');
						console.log(allMessagesMessages);
						// resolve this promise with the requested items
						resolve(allMessagesMessages);
					});
			} else {
				// resolve the promise with mock data
				resolve([
					{
						tags: [
							'Announcements',
						],
						subject: 'Message Subject 1',
						created: '2018-04-05',
						modified: '2018-04-05',
						creator: {
							displayName: 'Sheryl White Vincent',
							account: 'swvincent',
						},
						body: 'This is a great messageBody 1. This is a great messageBody 2. This is a great messageBody 3. This is a great messageBody 4. This is a great messageBody 5. This is a great messageBody 6. This is a great messageBody 7. This is a great messageBody 8. This is a great messageBody 9.',
						images: [
							{
								name: 'pic1.jpg',
								size: '65 kb',
								key: '1-pic1',
								url: '/img/1/pic1.jpg',
							},
							{
								name: 'pic7.jpg',
								size: '65 kb',
								key: '1-pic7',
								url: '/img/1/pic7.jpg',
							},
						],
						expiration: '2018-10-05',
						key: 'BkgttssTf',
					},
					{
						tags: [
							'Events',
						],
						subject: 'This is a great Message Subject 2',
						created: '2018-04-05',
						modified: '2018-04-05',
						creator: {
							displayName: 'James Baker',
							account: 'jbaker',
						},
						body: 'This is a great messageBody 1. This is a great messageBody 2. This is a great messageBody 3. This is a great messageBody 4. This is a great messageBody 5. This is a great messageBody 6. This is a great messageBody 7. This is a great messageBody 8. This is a great messageBody 9.',
						images: [
							{
								name: 'pic2.jpg',
								size: '65 kb',
								key: '2-pic2',
								url: '/img/2/pic2.jpg',
							},
						],
						expiration: '2018-10-05',
						key: 'BygeKYjjaM',
					},
					{
						tags: [
							'Announcements',
						],
						subject: 'What an even better Message Subject 3',
						created: '2018-04-05',
						modified: '2018-04-05',
						creator: {
							displayName: 'Jeannette Amazeen-Thomas',
							account: 'jthomas',
						},
						body: 'This is a great messageBody 1. This is a great messageBody 2. This is a great messageBody 3. This is a great messageBody 4. This is a great messageBody 5. This is a great messageBody 6. This is a great messageBody 7. This is a great messageBody 8. This is a great messageBody 9.',
						images: [
							{
								name: 'pic3.jpg',
								size: '65 kb',
								key: '3-pic3',
								url: '/img/3/pic3.jpg',
							},
						],
						expiration: '2018-10-05',
						key: 'SyWgKFiiTf',
					},
					{
						tags: [
							'Events',
						],
						subject: 'Message Subject 4',
						created: '2018-04-05',
						modified: '2018-04-05',
						creator: {
							displayName: 'Kathryn Bartholomew',
							account: 'kbartholomew',
						},
						body: 'This is a great messageBody 1. This is a great messageBody 2. This is a great messageBody 3. This is a great messageBody 4. This is a great messageBody 5. This is a great messageBody 6. This is a great messageBody 7. This is a great messageBody 8. This is a great messageBody 9.',
						expiration: '2018-10-05',
						key: 'rkzgtKisTM',
					},
					{
						tags: [
							'Announcements',
						],
						subject: 'This is a great Message Subject 5',
						created: '2018-04-05',
						modified: '2018-04-05',
						creator: {
							displayName: 'Jason Barone-Cichocki',
							account: 'jbcichocki',
						},
						body: 'This is a great messageBody 1. This is a great messageBody 2. This is a great messageBody 3. This is a great messageBody 4. This is a great messageBody 5. This is a great messageBody 6. This is a great messageBody 7. This is a great messageBody 8. This is a great messageBody 9.',
						images: [
							{
								name: 'pic5.jpg',
								size: '65 kb',
								key: '5-pic5',
								url: '/img/5/pic5.jpg',
							},
						],
						expiration: '2018-10-05',
						key: 'SymgKYoopz',
					},
					{
						tags: [
							'Events',
						],
						subject: 'What an even better Message Subject 6',
						created: '2018-04-05',
						modified: '2018-04-05',
						creator: {
							displayName: 'Jason Barone-Cichocki',
							account: 'jbcichocki',
						},
						body: 'This is a great messageBody 1. This is a great messageBody 2. This is a great messageBody 3. This is a great messageBody 4. This is a great messageBody 5. This is a great messageBody 6. This is a great messageBody 7. This is a great messageBody 8. This is a great messageBody 9.',
						expiration: '2018-10-05',
						key: 'HyNgKFjoaf',
					},
					{
						tags: [
							'Announcements',
						],
						subject: 'Message Subject 7',
						created: '2018-04-05',
						modified: '2018-04-05',
						creator: {
							displayName: 'Kathryn Bartholomew',
							account: 'kbartholomew',
						},
						body: 'This is a great messageBody 1. This is a great messageBody 2. This is a great messageBody 3. This is a great messageBody 4. This is a great messageBody 5. This is a great messageBody 6. This is a great messageBody 7. This is a great messageBody 8. This is a great messageBody 9.',
						expiration: '2018-10-05',
						key: 'SkrltFioaf',
					},
					{
						tags: [
							'Events',
						],
						subject: 'This is a great Message Subject 8',
						created: '2018-04-05',
						modified: '2018-04-05',
						creator: {
							displayName: 'Jeannette Amazeen-Thomas',
							account: 'jthomas',
						},
						body: 'This is a great messageBody 1. This is a great messageBody 2. This is a great messageBody 3. This is a great messageBody 4. This is a great messageBody 5. This is a great messageBody 6. This is a great messageBody 7. This is a great messageBody 8. This is a great messageBody 9.',
						expiration: '2018-10-05',
						key: 'BkUlYYjoaG',
					},
					{
						tags: [
							'Announcements',
						],
						subject: 'What an even better Message Subject 9',
						created: '2018-04-05',
						modified: '2018-04-05',
						creator: {
							displayName: 'James Baker',
							account: 'jbaker',
						},
						body: 'This is a great messageBody 1. This is a great messageBody 2. This is a great messageBody 3. This is a great messageBody 4. This is a great messageBody 5. This is a great messageBody 6. This is a great messageBody 7. This is a great messageBody 8. This is a great messageBody 9.',
						expiration: '2018-10-05',
						key: 'HywxFYji6f',
					},
					{
						tags: [
							'Events',
						],
						subject: 'Message Subject 10',
						created: '2018-04-05',
						modified: '2018-04-05',
						creator: {
							displayName: 'Sheryl White Vincent',
							account: 'swvincent',
						},
						body: 'This is a great messageBody 1. This is a great messageBody 2. This is a great messageBody 3. This is a great messageBody 4. This is a great messageBody 5. This is a great messageBody 6. This is a great messageBody 7. This is a great messageBody 8. This is a great messageBody 9.',
						expiration: '2018-10-05',
						key: 'HyuxttsjTf',
					},
				]);
			}
		}));
	}
	static ReturnHcMessagesTopMessages() {
		// return a new promise
		return new Promise(((resolve, reject) => {
			// if environment is sharepoint
			if (EnvironmentDetector.ReturnIsSPO()) {
				// get a promise to retrieve the settings
				NesoHTTPClient
					.ReturnNesoData('https://neso.mos.org/hcMessages/descending/limit3')
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
						tags: [
							'Announcements',
						],
						subject: 'Message Subject 1',
						created: '2018-04-05',
						modified: '2018-04-05',
						creator: {
							displayName: 'Sheryl White Vincent',
							account: 'swvincent',
						},
						body: 'This is a great messageBody 1. This is a great messageBody 2. This is a great messageBody 3. This is a great messageBody 4. This is a great messageBody 5. This is a great messageBody 6. This is a great messageBody 7. This is a great messageBody 8. This is a great messageBody 9.',
						images: [
							{
								name: 'pic1.jpg',
								size: '65 kb',
								key: '1-pic1',
								url: '/img/1/pic1.jpg',
							},
							{
								name: 'pic7.jpg',
								size: '65 kb',
								key: '1-pic7',
								url: '/img/1/pic7.jpg',
							},
						],
						expiration: '2018-10-05',
						key: 'BkgttssTf',
					},
					{
						tags: [
							'Events',
						],
						subject: 'This is a great Message Subject 2',
						created: '2018-04-05',
						modified: '2018-04-05',
						creator: {
							displayName: 'James Baker',
							account: 'jbaker',
						},
						body: 'This is a great messageBody 1. This is a great messageBody 2. This is a great messageBody 3. This is a great messageBody 4. This is a great messageBody 5. This is a great messageBody 6. This is a great messageBody 7. This is a great messageBody 8. This is a great messageBody 9.',
						images: [
							{
								name: 'pic2.jpg',
								size: '65 kb',
								key: '2-pic2',
								url: '/img/2/pic2.jpg',
							},
						],
						expiration: '2018-10-05',
						key: 'BygeKYjjaM',
					},
					{
						tags: [
							'Announcements',
						],
						subject: 'What an even better Message Subject 3',
						created: '2018-04-05',
						modified: '2018-04-05',
						creator: {
							displayName: 'Jeannette Amazeen-Thomas',
							account: 'jthomas',
						},
						body: 'This is a great messageBody 1. This is a great messageBody 2. This is a great messageBody 3. This is a great messageBody 4. This is a great messageBody 5. This is a great messageBody 6. This is a great messageBody 7. This is a great messageBody 8. This is a great messageBody 9.',
						images: [
							{
								name: 'pic3.jpg',
								size: '65 kb',
								key: '3-pic3',
								url: '/img/3/pic3.jpg',
							},
						],
						expiration: '2018-10-05',
						key: 'SyWgKFiiTf',
					},
				]);
			}
		}));
	}
	static ReturnHcMessagesAllMessagesWSpecifiedTag(tag) {
		// return a new promise
		return new Promise(((resolve, reject) => {
			// if environment is sharepoint
			if (EnvironmentDetector.ReturnIsSPO()) {
				// get a promise to retrieve the settings
				NesoHTTPClient
					.ReturnNesoData(`https://neso.mos.org/hcMessages/descending/tagged/${tag}`)
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
						tags: [
							'Announcements',
						],
						subject: 'Message Subject 1',
						created: '2018-04-05',
						modified: '2018-04-05',
						creator: {
							displayName: 'Sheryl White Vincent',
							account: 'swvincent',
						},
						body: 'This is a great messageBody 1. This is a great messageBody 2. This is a great messageBody 3. This is a great messageBody 4. This is a great messageBody 5. This is a great messageBody 6. This is a great messageBody 7. This is a great messageBody 8. This is a great messageBody 9.',
						images: [
							{
								name: 'pic1.jpg',
								size: '65 kb',
								key: '1-pic1',
								url: '/img/1/pic1.jpg',
							},
							{
								name: 'pic7.jpg',
								size: '65 kb',
								key: '1-pic7',
								url: '/img/1/pic7.jpg',
							},
						],
						expiration: '2018-10-05',
						key: 'BkgttssTf',
					},
					{
						tags: [
							'Events',
						],
						subject: 'This is a great Message Subject 2',
						created: '2018-04-05',
						modified: '2018-04-05',
						creator: {
							displayName: 'James Baker',
							account: 'jbaker',
						},
						body: 'This is a great messageBody 1. This is a great messageBody 2. This is a great messageBody 3. This is a great messageBody 4. This is a great messageBody 5. This is a great messageBody 6. This is a great messageBody 7. This is a great messageBody 8. This is a great messageBody 9.',
						images: [
							{
								name: 'pic2.jpg',
								size: '65 kb',
								key: '2-pic2',
								url: '/img/2/pic2.jpg',
							},
						],
						expiration: '2018-10-05',
						key: 'BygeKYjjaM',
					},
					{
						tags: [
							'Announcements',
						],
						subject: 'What an even better Message Subject 3',
						created: '2018-04-05',
						modified: '2018-04-05',
						creator: {
							displayName: 'Jeannette Amazeen-Thomas',
							account: 'jthomas',
						},
						body: 'This is a great messageBody 1. This is a great messageBody 2. This is a great messageBody 3. This is a great messageBody 4. This is a great messageBody 5. This is a great messageBody 6. This is a great messageBody 7. This is a great messageBody 8. This is a great messageBody 9.',
						images: [
							{
								name: 'pic3.jpg',
								size: '65 kb',
								key: '3-pic3',
								url: '/img/3/pic3.jpg',
							},
						],
						expiration: '2018-10-05',
						key: 'SyWgKFiiTf',
					},
					{
						tags: [
							'Events',
						],
						subject: 'Message Subject 4',
						created: '2018-04-05',
						modified: '2018-04-05',
						creator: {
							displayName: 'Kathryn Bartholomew',
							account: 'kbartholomew',
						},
						body: 'This is a great messageBody 1. This is a great messageBody 2. This is a great messageBody 3. This is a great messageBody 4. This is a great messageBody 5. This is a great messageBody 6. This is a great messageBody 7. This is a great messageBody 8. This is a great messageBody 9.',
						expiration: '2018-10-05',
						key: 'rkzgtKisTM',
					},
					{
						tags: [
							'Announcements',
						],
						subject: 'This is a great Message Subject 5',
						created: '2018-04-05',
						modified: '2018-04-05',
						creator: {
							displayName: 'Jason Barone-Cichocki',
							account: 'jbcichocki',
						},
						body: 'This is a great messageBody 1. This is a great messageBody 2. This is a great messageBody 3. This is a great messageBody 4. This is a great messageBody 5. This is a great messageBody 6. This is a great messageBody 7. This is a great messageBody 8. This is a great messageBody 9.',
						images: [
							{
								name: 'pic5.jpg',
								size: '65 kb',
								key: '5-pic5',
								url: '/img/5/pic5.jpg',
							},
						],
						expiration: '2018-10-05',
						key: 'SymgKYoopz',
					},
					{
						tags: [
							'Events',
						],
						subject: 'What an even better Message Subject 6',
						created: '2018-04-05',
						modified: '2018-04-05',
						creator: {
							displayName: 'Jason Barone-Cichocki',
							account: 'jbcichocki',
						},
						body: 'This is a great messageBody 1. This is a great messageBody 2. This is a great messageBody 3. This is a great messageBody 4. This is a great messageBody 5. This is a great messageBody 6. This is a great messageBody 7. This is a great messageBody 8. This is a great messageBody 9.',
						expiration: '2018-10-05',
						key: 'HyNgKFjoaf',
					},
					{
						tags: [
							'Announcements',
						],
						subject: 'Message Subject 7',
						created: '2018-04-05',
						modified: '2018-04-05',
						creator: {
							displayName: 'Kathryn Bartholomew',
							account: 'kbartholomew',
						},
						body: 'This is a great messageBody 1. This is a great messageBody 2. This is a great messageBody 3. This is a great messageBody 4. This is a great messageBody 5. This is a great messageBody 6. This is a great messageBody 7. This is a great messageBody 8. This is a great messageBody 9.',
						expiration: '2018-10-05',
						key: 'SkrltFioaf',
					},
					{
						tags: [
							'Events',
						],
						subject: 'This is a great Message Subject 8',
						created: '2018-04-05',
						modified: '2018-04-05',
						creator: {
							displayName: 'Jeannette Amazeen-Thomas',
							account: 'jthomas',
						},
						body: 'This is a great messageBody 1. This is a great messageBody 2. This is a great messageBody 3. This is a great messageBody 4. This is a great messageBody 5. This is a great messageBody 6. This is a great messageBody 7. This is a great messageBody 8. This is a great messageBody 9.',
						expiration: '2018-10-05',
						key: 'BkUlYYjoaG',
					},
					{
						tags: [
							'Announcements',
						],
						subject: 'What an even better Message Subject 9',
						created: '2018-04-05',
						modified: '2018-04-05',
						creator: {
							displayName: 'James Baker',
							account: 'jbaker',
						},
						body: 'This is a great messageBody 1. This is a great messageBody 2. This is a great messageBody 3. This is a great messageBody 4. This is a great messageBody 5. This is a great messageBody 6. This is a great messageBody 7. This is a great messageBody 8. This is a great messageBody 9.',
						expiration: '2018-10-05',
						key: 'HywxFYji6f',
					},
					{
						tags: [
							'Events',
						],
						subject: 'Message Subject 10',
						created: '2018-04-05',
						modified: '2018-04-05',
						creator: {
							displayName: 'Sheryl White Vincent',
							account: 'swvincent',
						},
						body: 'This is a great messageBody 1. This is a great messageBody 2. This is a great messageBody 3. This is a great messageBody 4. This is a great messageBody 5. This is a great messageBody 6. This is a great messageBody 7. This is a great messageBody 8. This is a great messageBody 9.',
						expiration: '2018-10-05',
						key: 'HyuxttsjTf',
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
					'https://neso.mos.org/email/send',
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
					'https://neso.mos.org/hcMessages/addMessage',
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
					.ReturnNesoData('https://neso.mos.org/hcMessages/nextMessageID')
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
