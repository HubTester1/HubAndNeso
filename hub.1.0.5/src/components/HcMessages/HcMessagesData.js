
// ----- IMPORTS

import EnvironmentDetector from '../../services/EnvironmentDetector';
import NesoHTTPClient from '../../services/NesoHTTPClient';

const shortid = require('shortid');

// ----- DATA

export default class HcMessagesData {
	static ReturnNesoMessagesCategoriesForHcMessages() {
		// return a new promise
		return new Promise(((resolve, reject) => {
			// if environment is sharepoint
			if (EnvironmentDetector.ReturnIsSPO()) {
				// get a promise to retrieve the settings
				NesoHTTPClient
					.ReturnNesoData('https://neso.mos.org/hcMessages/settings')
					// if the promise is resolved with the settings
					.then((settingsResults) => {
						// set up var to receive all categories
						const allMessagesCategories = [];
						// iterate over the results and push them to allListItems
						settingsResults[0].categories.forEach((categoryValue) => {
							const categoryFormatted = {
								name: '',
								camlName: '',
								key: '',
							};
							if (categoryValue.name) {
								categoryFormatted.name = categoryValue.name;
								categoryFormatted.camlName = categoryValue.camlName;
								categoryFormatted.key = shortid.generate();

								allMessagesCategories.push(categoryFormatted);
							}
						});
						// sort allListItems by name properties
						allMessagesCategories.sort((a, b) => {
							if (a.name < b.name) return -1;
							if (a.name > b.name) return 1;
							return 0;
						});
						// resolve this promise with the requested items
						resolve(allMessagesCategories);
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
		}));
	}

	static ReturnNesoMessagesMessagesForHcMessages() {
		// return a new promise
		return new Promise(((resolve, reject) => {
			// if environment is sharepoint
			if (EnvironmentDetector.ReturnIsSPO()) {
				// get a promise to retrieve the settings
				NesoHTTPClient
					.ReturnNesoData('https://neso.mos.org/hcMessages/messages')
					// if the promise is resolved with the settings
					.then((messagesResults) => {
						// set up var to receive all categories
						const allMessagesMessages = [];
						// iterate over the results and push them to allListItems
						messagesResults.forEach((messageValues) => {
							const messageFormatted = {
								category: '',
								subject: '',
								created: '',
								modified: '',
								creator: '',
								body: '',
								image: '',
								expiration: '',

								key: '',
							};
							if (messageValues.messageBody) {
								messageFormatted.category = messageValues.messageCategory;
								messageFormatted.subject = messageValues.messageSubject;
								messageFormatted.created = messageValues.messageCreated;
								messageFormatted.modified = messageValues.messageModified;
								messageFormatted.creator = messageValues.messageCreator;
								messageFormatted.body = messageValues.messageBody;
								messageFormatted.image = messageValues.messageImage;
								messageFormatted.expiration = messageValues.messageExpiration;

								messageFormatted.key = shortid.generate();

								allMessagesMessages.push(messageFormatted);
							}
						});
						// sort allListItems by name properties
						allMessagesMessages.sort((a, b) => {
							if (a.name < b.name) return -1;
							if (a.name > b.name) return 1;
							return 0;
						});
						// resolve this promise with the requested items
						resolve(allMessagesMessages);
					});
			} else {
				// resolve the promise with mock data
				resolve([
					{
						category: 'Announcements',
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
						category: 'Events',
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
						category: 'Announcements',
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
						category: 'Events',
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
						category: 'Announcements',
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
						category: 'Events',
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
						category: 'Announcements',
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
						category: 'Events',
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
						category: 'Announcements',
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
						category: 'Events',
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
}
