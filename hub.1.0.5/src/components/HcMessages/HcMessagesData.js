
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
								allMessagesMessages
									.push(this.ReturnFormattedMessage(messageValues, messageFormatted));
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
								url: '/img/1/pic1.jpg',
								imageKey: 'H1jz0w3jazasd',
								previewKey: 'ry3GCP3s6Gdg',
							},
							{
								name: 'pic7.jpg',
								size: '65 kb',
								url: '/img/1/pic7.jpg',
								imageKey: 'r1TzRD3jTfsdgf',
								previewKey: 'Hk0fAD2oaMsdgf',
							},
						],
						expiration: '2018-10-05',
						key: 'B19f0P3spfasdf',
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
								url: '/img/2/pic2.jpg',
								imageKey: 'B1llMADhipzsdgf',
								previewKey: 'SkZlGCv3saMsdgf',
							},
						],
						expiration: '2018-10-05',
						key: 'H1JgfRPhiTzasdf',
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
								url: '/img/3/pic3.jpg',
								imageKey: 'rymxf0P3jpMsdgf',
								previewKey: 'H14gf0w3sTGsgf',
							},
						],
						expiration: '2018-10-05',
						key: 'ByMxf0P2ipMasdf',
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
						images: [],
						expiration: '2018-10-05',
						key: 'ryHxGCDhjaMasdf',
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
						images: [],
						expiration: '2018-10-05',
						key: 'H1IlGCwhoaMasdf',
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
						images: [],
						expiration: '2018-10-05',
						key: 'HyPgM0whj6fasdf',
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
						images: [],
						expiration: '2018-10-05',
						key: 'Sk_eGAv2jaMsdfbfg',
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
						images: [],
						expiration: '2018-10-05',
						key: 'SytefCPnjpGasdf',
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
						images: [],
						expiration: '2018-10-05',
						key: 'S19gG0w2jafasdf',
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
						images: [],
						expiration: '2018-10-05',
						key: 'SyixM0vniazasdf',
					},
					{
						tags: [
							'Announcements',
						],
						subject: 'Message Subject 11',
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
								url: '/img/1/pic1.jpg',
								imageKey: 'H1jz0w3jazdfhg',
								previewKey: 'ry3GCP3s6Gfghj',
							},
							{
								name: 'pic7.jpg',
								size: '65 kb',
								url: '/img/1/pic7.jpg',
								imageKey: 'r1TzRD3jTffghj',
								previewKey: 'Hk0fAD2oaMfghj',
							},
						],
						expiration: '2018-10-05',
						key: 'B19f0P3spf654654',
					},
					{
						tags: [
							'Events',
						],
						subject: 'This is a great Message Subject 12',
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
								url: '/img/2/pic2.jpg',
								imageKey: 'B1llMADhipzfghj',
								previewKey: 'SkZlGCv3saMfgh',
							},
						],
						expiration: '2018-10-05',
						key: 'H1JgfRPhiTz654654',
					},
					{
						tags: [
							'Announcements',
						],
						subject: 'What an even better Message Subject 13',
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
								url: '/img/3/pic3.jpg',
								imageKey: 'rymxf0P3jpMfgh',
								previewKey: 'H14gf0w3sTGfghj',
							},
						],
						expiration: '2018-10-05',
						key: 'ByMxf0P2ipM654654',
					},
					{
						tags: [
							'Events',
						],
						subject: 'Message Subject 14',
						created: '2018-04-05',
						modified: '2018-04-05',
						creator: {
							displayName: 'Kathryn Bartholomew',
							account: 'kbartholomew',
						},
						body: 'This is a great messageBody 1. This is a great messageBody 2. This is a great messageBody 3. This is a great messageBody 4. This is a great messageBody 5. This is a great messageBody 6. This is a great messageBody 7. This is a great messageBody 8. This is a great messageBody 9.',
						images: [],
						expiration: '2018-10-05',
						key: 'ryHxGCDhjaM654654',
					},
					{
						tags: [
							'Announcements',
						],
						subject: 'This is a great Message Subject 15',
						created: '2018-04-05',
						modified: '2018-04-05',
						creator: {
							displayName: 'Jason Barone-Cichocki',
							account: 'jbcichocki',
						},
						body: 'This is a great messageBody 1. This is a great messageBody 2. This is a great messageBody 3. This is a great messageBody 4. This is a great messageBody 5. This is a great messageBody 6. This is a great messageBody 7. This is a great messageBody 8. This is a great messageBody 9.',
						images: [],
						expiration: '2018-10-05',
						key: 'H1IlGCwhoaM654654',
					},
					{
						tags: [
							'Events',
						],
						subject: 'What an even better Message Subject 16',
						created: '2018-04-05',
						modified: '2018-04-05',
						creator: {
							displayName: 'Jason Barone-Cichocki',
							account: 'jbcichocki',
						},
						body: 'This is a great messageBody 1. This is a great messageBody 2. This is a great messageBody 3. This is a great messageBody 4. This is a great messageBody 5. This is a great messageBody 6. This is a great messageBody 7. This is a great messageBody 8. This is a great messageBody 9.',
						images: [],
						expiration: '2018-10-05',
						key: 'HyPgM0whj6f654654',
					},
					{
						tags: [
							'Announcements',
						],
						subject: 'Message Subject 17',
						created: '2018-04-05',
						modified: '2018-04-05',
						creator: {
							displayName: 'Kathryn Bartholomew',
							account: 'kbartholomew',
						},
						body: 'This is a great messageBody 1. This is a great messageBody 2. This is a great messageBody 3. This is a great messageBody 4. This is a great messageBody 5. This is a great messageBody 6. This is a great messageBody 7. This is a great messageBody 8. This is a great messageBody 9.',
						images: [],
						expiration: '2018-10-05',
						key: 'Sk_eGAv2jaMgfhjgfh',
					},
					{
						tags: [
							'Events',
						],
						subject: 'This is a great Message Subject 18',
						created: '2018-04-05',
						modified: '2018-04-05',
						creator: {
							displayName: 'Jeannette Amazeen-Thomas',
							account: 'jthomas',
						},
						body: 'This is a great messageBody 1. This is a great messageBody 2. This is a great messageBody 3. This is a great messageBody 4. This is a great messageBody 5. This is a great messageBody 6. This is a great messageBody 7. This is a great messageBody 8. This is a great messageBody 9.',
						images: [],
						expiration: '2018-10-05',
						key: 'SytefCPnjpG654654',
					},
					{
						tags: [
							'Announcements',
						],
						subject: 'What an even better Message Subject 19',
						created: '2018-04-05',
						modified: '2018-04-05',
						creator: {
							displayName: 'James Baker',
							account: 'jbaker',
						},
						body: 'This is a great messageBody 1. This is a great messageBody 2. This is a great messageBody 3. This is a great messageBody 4. This is a great messageBody 5. This is a great messageBody 6. This is a great messageBody 7. This is a great messageBody 8. This is a great messageBody 9.',
						images: [],
						expiration: '2018-10-05',
						key: 'S19gG0w2jafdrtggt',
					},
					{
						tags: [
							'Events',
						],
						subject: 'Message Subject 20',
						created: '2018-04-05',
						modified: '2018-04-05',
						creator: {
							displayName: 'Sheryl White Vincent',
							account: 'swvincent',
						},
						body: 'This is a great messageBody 1. This is a great messageBody 2. This is a great messageBody 3. This is a great messageBody 4. This is a great messageBody 5. This is a great messageBody 6. This is a great messageBody 7. This is a great messageBody 8. This is a great messageBody 9.',
						images: [],
						expiration: '2018-10-05',
						key: 'SyixM0vniazdrtggt',
					},
					{
						tags: [
							'Announcements',
						],
						subject: 'Message Subject 21',
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
								url: '/img/1/pic1.jpg',
								imageKey: 'H1jz0w3jazzxcv',
								previewKey: 'ry3GCP3s6Gzxcv',
							},
							{
								name: 'pic7.jpg',
								size: '65 kb',
								url: '/img/1/pic7.jpg',
								imageKey: 'r1TzRD3jTfzxcv',
								previewKey: 'Hk0fAD2oaMzxcv',
							},
						],
						expiration: '2018-10-05',
						key: 'B19f0P3spfdrtggt',
					},
					{
						tags: [
							'Events',
						],
						subject: 'This is a great Message Subject 22',
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
								url: '/img/2/pic2.jpg',
								imageKey: 'B1llMADhipzzxcv',
								previewKey: 'SkZlGCv3saMzxcv',
							},
						],
						expiration: '2018-10-05',
						key: 'H1JgfRPhiTzdrtggt',
					},
					{
						tags: [
							'Announcements',
						],
						subject: 'What an even better Message Subject 23',
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
								url: '/img/3/pic3.jpg',
								imageKey: 'rymxf0P3jpMzxcv',
								previewKey: 'H14gf0w3sTGzxcv',
							},
						],
						expiration: '2018-10-05',
						key: 'ByMxf0P2ipMdrtggt',
					},
					{
						tags: [
							'Events',
						],
						subject: 'Message Subject 24',
						created: '2018-04-05',
						modified: '2018-04-05',
						creator: {
							displayName: 'Kathryn Bartholomew',
							account: 'kbartholomew',
						},
						body: 'This is a great messageBody 1. This is a great messageBody 2. This is a great messageBody 3. This is a great messageBody 4. This is a great messageBody 5. This is a great messageBody 6. This is a great messageBody 7. This is a great messageBody 8. This is a great messageBody 9.',
						images: [],
						expiration: '2018-10-05',
						key: 'ryHxGCDhjaMdrtggt',
					},
					{
						tags: [
							'Announcements',
						],
						subject: 'This is a great Message Subject 25',
						created: '2018-04-05',
						modified: '2018-04-05',
						creator: {
							displayName: 'Jason Barone-Cichocki',
							account: 'jbcichocki',
						},
						body: 'This is a great messageBody 1. This is a great messageBody 2. This is a great messageBody 3. This is a great messageBody 4. This is a great messageBody 5. This is a great messageBody 6. This is a great messageBody 7. This is a great messageBody 8. This is a great messageBody 9.',
						images: [],
						expiration: '2018-10-05',
						key: 'H1IlGCwhoaMdrtggt',
					},
					{
						tags: [
							'Events',
						],
						subject: 'What an even better Message Subject 26',
						created: '2018-04-05',
						modified: '2018-04-05',
						creator: {
							displayName: 'Jason Barone-Cichocki',
							account: 'jbcichocki',
						},
						body: 'This is a great messageBody 1. This is a great messageBody 2. This is a great messageBody 3. This is a great messageBody 4. This is a great messageBody 5. This is a great messageBody 6. This is a great messageBody 7. This is a great messageBody 8. This is a great messageBody 9.',
						images: [],
						expiration: '2018-10-05',
						key: 'HyPgM0whj6fdrtggt',
					},
					{
						tags: [
							'Announcements',
						],
						subject: 'Message Subject 27',
						created: '2018-04-05',
						modified: '2018-04-05',
						creator: {
							displayName: 'Kathryn Bartholomew',
							account: 'kbartholomew',
						},
						body: 'This is a great messageBody 1. This is a great messageBody 2. This is a great messageBody 3. This is a great messageBody 4. This is a great messageBody 5. This is a great messageBody 6. This is a great messageBody 7. This is a great messageBody 8. This is a great messageBody 9.',
						images: [],
						expiration: '2018-10-05',
						key: 'Sk_eGAv2jaMvbn',
					},
					{
						tags: [
							'Events',
						],
						subject: 'This is a great Message Subject 28',
						created: '2018-04-05',
						modified: '2018-04-05',
						creator: {
							displayName: 'Jeannette Amazeen-Thomas',
							account: 'jthomas',
						},
						body: 'This is a great messageBody 1. This is a great messageBody 2. This is a great messageBody 3. This is a great messageBody 4. This is a great messageBody 5. This is a great messageBody 6. This is a great messageBody 7. This is a great messageBody 8. This is a great messageBody 9.',
						images: [],
						expiration: '2018-10-05',
						key: 'SytefCPnjpGdrtggt',
					},
					{
						tags: [
							'Announcements',
						],
						subject: 'What an even better Message Subject 29',
						created: '2018-04-05',
						modified: '2018-04-05',
						creator: {
							displayName: 'James Baker',
							account: 'jbaker',
						},
						body: 'This is a great messageBody 1. This is a great messageBody 2. This is a great messageBody 3. This is a great messageBody 4. This is a great messageBody 5. This is a great messageBody 6. This is a great messageBody 7. This is a great messageBody 8. This is a great messageBody 9.',
						images: [],
						expiration: '2018-10-05',
						key: 'S19gG0w2jafvbnm',
					},
					{
						tags: [
							'Events',
						],
						subject: 'Message Subject 30',
						created: '2018-04-05',
						modified: '2018-04-05',
						creator: {
							displayName: 'Sheryl White Vincent',
							account: 'swvincent',
						},
						body: 'This is a great messageBody 1. This is a great messageBody 2. This is a great messageBody 3. This is a great messageBody 4. This is a great messageBody 5. This is a great messageBody 6. This is a great messageBody 7. This is a great messageBody 8. This is a great messageBody 9.',
						images: [],
						expiration: '2018-10-05',
						key: 'SyixM0vniazvbnm',
					},
					{
						tags: [
							'Announcements',
						],
						subject: 'Message Subject 31',
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
								url: '/img/1/pic1.jpg',
								imageKey: 'H1jz0w3jaz2345',
								previewKey: 'ry3GCP3s6G2345',
							},
							{
								name: 'pic7.jpg',
								size: '65 kb',
								url: '/img/1/pic7.jpg',
								imageKey: 'r1TzRD3jTf2345',
								previewKey: 'Hk0fAD2oaM2345',
							},
						],
						expiration: '2018-10-05',
						key: 'B19f0P3spfvbnm',
					},
					{
						tags: [
							'Events',
						],
						subject: 'This is a great Message Subject 32',
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
								url: '/img/2/pic2.jpg',
								imageKey: 'B1llMADhipz2345',
								previewKey: 'SkZlGCv3saM2345',
							},
						],
						expiration: '2018-10-05',
						key: 'H1JgfRPhiTzvbnm',
					},
					{
						tags: [
							'Announcements',
						],
						subject: 'What an even better Message Subject 33',
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
								url: '/img/3/pic3.jpg',
								imageKey: 'rymxf0P3jpM2345',
								previewKey: 'H14gf0w3sTG2345',
							},
						],
						expiration: '2018-10-05',
						key: 'ByMxf0P2ipMvbnm',
					},
					{
						tags: [
							'Events',
						],
						subject: 'Message Subject 34',
						created: '2018-04-05',
						modified: '2018-04-05',
						creator: {
							displayName: 'Kathryn Bartholomew',
							account: 'kbartholomew',
						},
						body: 'This is a great messageBody 1. This is a great messageBody 2. This is a great messageBody 3. This is a great messageBody 4. This is a great messageBody 5. This is a great messageBody 6. This is a great messageBody 7. This is a great messageBody 8. This is a great messageBody 9.',
						images: [],
						expiration: '2018-10-05',
						key: 'ryHxGCDhjaMvbnm',
					},
					{
						tags: [
							'Announcements',
						],
						subject: 'This is a great Message Subject 35',
						created: '2018-04-05',
						modified: '2018-04-05',
						creator: {
							displayName: 'Jason Barone-Cichocki',
							account: 'jbcichocki',
						},
						body: 'This is a great messageBody 1. This is a great messageBody 2. This is a great messageBody 3. This is a great messageBody 4. This is a great messageBody 5. This is a great messageBody 6. This is a great messageBody 7. This is a great messageBody 8. This is a great messageBody 9.',
						images: [],
						expiration: '2018-10-05',
						key: 'H1IlGCwhoaMvbnm',
					},
					{
						tags: [
							'Events',
						],
						subject: 'What an even better Message Subject 36',
						created: '2018-04-05',
						modified: '2018-04-05',
						creator: {
							displayName: 'Jason Barone-Cichocki',
							account: 'jbcichocki',
						},
						body: 'This is a great messageBody 1. This is a great messageBody 2. This is a great messageBody 3. This is a great messageBody 4. This is a great messageBody 5. This is a great messageBody 6. This is a great messageBody 7. This is a great messageBody 8. This is a great messageBody 9.',
						images: [],
						expiration: '2018-10-05',
						key: 'HyPgM0whj6fvbnyyyyy',
					},
					{
						tags: [
							'Announcements',
						],
						subject: 'Message Subject 37',
						created: '2018-04-05',
						modified: '2018-04-05',
						creator: {
							displayName: 'Kathryn Bartholomew',
							account: 'kbartholomew',
						},
						body: 'This is a great messageBody 1. This is a great messageBody 2. This is a great messageBody 3. This is a great messageBody 4. This is a great messageBody 5. This is a great messageBody 6. This is a great messageBody 7. This is a great messageBody 8. This is a great messageBody 9.',
						images: [],
						expiration: '2018-10-05',
						key: 'Sk_eGAv2jaM4r567',
					},
					{
						tags: [
							'Events',
						],
						subject: 'This is a great Message Subject 38',
						created: '2018-04-05',
						modified: '2018-04-05',
						creator: {
							displayName: 'Jeannette Amazeen-Thomas',
							account: 'jthomas',
						},
						body: 'This is a great messageBody 1. This is a great messageBody 2. This is a great messageBody 3. This is a great messageBody 4. This is a great messageBody 5. This is a great messageBody 6. This is a great messageBody 7. This is a great messageBody 8. This is a great messageBody 9.',
						images: [],
						expiration: '2018-10-05',
						key: 'SytefCPnjpGvbnyyyyy',
					},
					{
						tags: [
							'Announcements',
						],
						subject: 'What an even better Message Subject 39',
						created: '2018-04-05',
						modified: '2018-04-05',
						creator: {
							displayName: 'James Baker',
							account: 'jbaker',
						},
						body: 'This is a great messageBody 1. This is a great messageBody 2. This is a great messageBody 3. This is a great messageBody 4. This is a great messageBody 5. This is a great messageBody 6. This is a great messageBody 7. This is a great messageBody 8. This is a great messageBody 9.',
						images: [],
						expiration: '2018-10-05',
						key: 'S19gG0w2jafvbnyyyyy',
					},
					{
						tags: [
							'Events',
						],
						subject: 'Message Subject 40',
						created: '2018-04-05',
						modified: '2018-04-05',
						creator: {
							displayName: 'Sheryl White Vincent',
							account: 'swvincent',
						},
						body: 'This is a great messageBody 1. This is a great messageBody 2. This is a great messageBody 3. This is a great messageBody 4. This is a great messageBody 5. This is a great messageBody 6. This is a great messageBody 7. This is a great messageBody 8. This is a great messageBody 9.',
						images: [],
						expiration: '2018-10-05',
						key: 'SyixM0vniazvbnyyyyy',
					},
					{
						tags: [
							'Announcements',
						],
						subject: 'Message Subject 41',
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
								url: '/img/1/pic1.jpg',
								imageKey: 'H1jz0w3jazasd',
								previewKey: 'ry3GCP3s6Gdg',
							},
							{
								name: 'pic7.jpg',
								size: '65 kb',
								url: '/img/1/pic7.jpg',
								imageKey: 'r1TzRD3jTfsdgf',
								previewKey: 'Hk0fAD2oaMsdgf',
							},
						],
						expiration: '2018-10-05',
						key: 'B19f0P3spfasdf',
					},
					{
						tags: [
							'Events',
						],
						subject: 'This is a great Message Subject 42',
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
								url: '/img/2/pic2.jpg',
								imageKey: 'B1llMADhipzsdgf',
								previewKey: 'SkZlGCv3saMsdgf',
							},
						],
						expiration: '2018-10-05',
						key: 'H1JgfRPhiTzasdf',
					},
				]);
			}
		}));
	}
	static ReturnFormattedMessage(messageValues, messageFormatted) {
		const messageFormattedCopy = messageFormatted;
		messageFormattedCopy.tags = messageValues.messageTags;
		messageFormattedCopy.subject = messageValues.messageSubject;
		messageFormattedCopy.created = messageValues.messageCreated;
		messageFormattedCopy.modified = messageValues.messageModified;
		messageFormattedCopy.creator = messageValues.messageCreator;
		messageFormattedCopy.body = messageValues.messageBody;
		messageFormattedCopy.expiration = messageValues.messageExpiration;

		messageFormattedCopy.key = shortid.generate();

		if (messageValues.messageImages && messageValues.messageImages[0]) {
			messageValues.messageImages.forEach((imageValue) => {
				const imageValueCopy = imageValue;
				imageValueCopy.imageKey = shortid.generate();
				imageValueCopy.previewKey = shortid.generate();
				messageFormattedCopy.images.push(imageValueCopy);
			});
		}
		return messageFormattedCopy;
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
								allMessagesMessages
									.push(this.ReturnFormattedMessage(messageValues, messageFormatted));
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
								url: '/img/1/pic1.jpg',
								imageKey: 'H1jz0w3jaz',
								previewKey: 'ry3GCP3s6G',
							},
							{
								name: 'pic7.jpg',
								size: '65 kb',
								url: '/img/1/pic7.jpg',
								imageKey: 'r1TzRD3jTf',
								previewKey: 'Hk0fAD2oaM',
							},
						],
						expiration: '2018-10-05',
						key: 'B19f0P3spf',
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
								url: '/img/2/pic2.jpg',
								imageKey: 'B1llMADhipz',
								previewKey: 'SkZlGCv3saM',
							},
						],
						expiration: '2018-10-05',
						key: 'H1JgfRPhiTz',
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
								url: '/img/3/pic3.jpg',
								imageKey: 'rymxf0P3jpM',
								previewKey: 'H14gf0w3sTG',
							},
						],
						expiration: '2018-10-05',
						key: 'ByMxf0P2ipM',
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
								allMessagesMessages
									.push(this.ReturnFormattedMessage(messageValues, messageFormatted));
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
								url: '/img/1/pic1.jpg',
								imageKey: 'H1jz0w3jazasd',
								previewKey: 'ry3GCP3s6Gdg',
							},
							{
								name: 'pic7.jpg',
								size: '65 kb',
								url: '/img/1/pic7.jpg',
								imageKey: 'r1TzRD3jTfsdgf',
								previewKey: 'Hk0fAD2oaMsdgf',
							},
						],
						expiration: '2018-10-05',
						key: 'B19f0P3spfasdf',
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
								url: '/img/2/pic2.jpg',
								imageKey: 'B1llMADhipzsdgf',
								previewKey: 'SkZlGCv3saMsdgf',
							},
						],
						expiration: '2018-10-05',
						key: 'H1JgfRPhiTzasdf',
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
								url: '/img/3/pic3.jpg',
								imageKey: 'rymxf0P3jpMsdgf',
								previewKey: 'H14gf0w3sTGsgf',
							},
						],
						expiration: '2018-10-05',
						key: 'ByMxf0P2ipMasdf',
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
						images: [],
						expiration: '2018-10-05',
						key: 'ryHxGCDhjaMasdf',
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
						images: [],
						expiration: '2018-10-05',
						key: 'H1IlGCwhoaMasdf',
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
						images: [],
						expiration: '2018-10-05',
						key: 'HyPgM0whj6fasdf',
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
						images: [],
						expiration: '2018-10-05',
						key: 'Sk_eGAv2jaMsdfbfg',
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
						images: [],
						expiration: '2018-10-05',
						key: 'SytefCPnjpGasdf',
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
						images: [],
						expiration: '2018-10-05',
						key: 'S19gG0w2jafasdf',
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
						images: [],
						expiration: '2018-10-05',
						key: 'SyixM0vniazasdf',
					},
					{
						tags: [
							'Announcements',
						],
						subject: 'Message Subject 11',
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
								url: '/img/1/pic1.jpg',
								imageKey: 'H1jz0w3jazdfhg',
								previewKey: 'ry3GCP3s6Gfghj',
							},
							{
								name: 'pic7.jpg',
								size: '65 kb',
								url: '/img/1/pic7.jpg',
								imageKey: 'r1TzRD3jTffghj',
								previewKey: 'Hk0fAD2oaMfghj',
							},
						],
						expiration: '2018-10-05',
						key: 'B19f0P3spf654654',
					},
					{
						tags: [
							'Events',
						],
						subject: 'This is a great Message Subject 12',
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
								url: '/img/2/pic2.jpg',
								imageKey: 'B1llMADhipzfghj',
								previewKey: 'SkZlGCv3saMfgh',
							},
						],
						expiration: '2018-10-05',
						key: 'H1JgfRPhiTz654654',
					},
					{
						tags: [
							'Announcements',
						],
						subject: 'What an even better Message Subject 13',
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
								url: '/img/3/pic3.jpg',
								imageKey: 'rymxf0P3jpMfgh',
								previewKey: 'H14gf0w3sTGfghj',
							},
						],
						expiration: '2018-10-05',
						key: 'ByMxf0P2ipM654654',
					},
					{
						tags: [
							'Events',
						],
						subject: 'Message Subject 14',
						created: '2018-04-05',
						modified: '2018-04-05',
						creator: {
							displayName: 'Kathryn Bartholomew',
							account: 'kbartholomew',
						},
						body: 'This is a great messageBody 1. This is a great messageBody 2. This is a great messageBody 3. This is a great messageBody 4. This is a great messageBody 5. This is a great messageBody 6. This is a great messageBody 7. This is a great messageBody 8. This is a great messageBody 9.',
						images: [],
						expiration: '2018-10-05',
						key: 'ryHxGCDhjaM654654',
					},
					{
						tags: [
							'Announcements',
						],
						subject: 'This is a great Message Subject 15',
						created: '2018-04-05',
						modified: '2018-04-05',
						creator: {
							displayName: 'Jason Barone-Cichocki',
							account: 'jbcichocki',
						},
						body: 'This is a great messageBody 1. This is a great messageBody 2. This is a great messageBody 3. This is a great messageBody 4. This is a great messageBody 5. This is a great messageBody 6. This is a great messageBody 7. This is a great messageBody 8. This is a great messageBody 9.',
						images: [],
						expiration: '2018-10-05',
						key: 'H1IlGCwhoaM654654',
					},
					{
						tags: [
							'Events',
						],
						subject: 'What an even better Message Subject 16',
						created: '2018-04-05',
						modified: '2018-04-05',
						creator: {
							displayName: 'Jason Barone-Cichocki',
							account: 'jbcichocki',
						},
						body: 'This is a great messageBody 1. This is a great messageBody 2. This is a great messageBody 3. This is a great messageBody 4. This is a great messageBody 5. This is a great messageBody 6. This is a great messageBody 7. This is a great messageBody 8. This is a great messageBody 9.',
						images: [],
						expiration: '2018-10-05',
						key: 'HyPgM0whj6f654654',
					},
					{
						tags: [
							'Announcements',
						],
						subject: 'Message Subject 17',
						created: '2018-04-05',
						modified: '2018-04-05',
						creator: {
							displayName: 'Kathryn Bartholomew',
							account: 'kbartholomew',
						},
						body: 'This is a great messageBody 1. This is a great messageBody 2. This is a great messageBody 3. This is a great messageBody 4. This is a great messageBody 5. This is a great messageBody 6. This is a great messageBody 7. This is a great messageBody 8. This is a great messageBody 9.',
						images: [],
						expiration: '2018-10-05',
						key: 'Sk_eGAv2jaMgfhjgfh',
					},
					{
						tags: [
							'Events',
						],
						subject: 'This is a great Message Subject 18',
						created: '2018-04-05',
						modified: '2018-04-05',
						creator: {
							displayName: 'Jeannette Amazeen-Thomas',
							account: 'jthomas',
						},
						body: 'This is a great messageBody 1. This is a great messageBody 2. This is a great messageBody 3. This is a great messageBody 4. This is a great messageBody 5. This is a great messageBody 6. This is a great messageBody 7. This is a great messageBody 8. This is a great messageBody 9.',
						images: [],
						expiration: '2018-10-05',
						key: 'SytefCPnjpG654654',
					},
					{
						tags: [
							'Announcements',
						],
						subject: 'What an even better Message Subject 19',
						created: '2018-04-05',
						modified: '2018-04-05',
						creator: {
							displayName: 'James Baker',
							account: 'jbaker',
						},
						body: 'This is a great messageBody 1. This is a great messageBody 2. This is a great messageBody 3. This is a great messageBody 4. This is a great messageBody 5. This is a great messageBody 6. This is a great messageBody 7. This is a great messageBody 8. This is a great messageBody 9.',
						images: [],
						expiration: '2018-10-05',
						key: 'S19gG0w2jafdrtggt',
					},
					{
						tags: [
							'Events',
						],
						subject: 'Message Subject 20',
						created: '2018-04-05',
						modified: '2018-04-05',
						creator: {
							displayName: 'Sheryl White Vincent',
							account: 'swvincent',
						},
						body: 'This is a great messageBody 1. This is a great messageBody 2. This is a great messageBody 3. This is a great messageBody 4. This is a great messageBody 5. This is a great messageBody 6. This is a great messageBody 7. This is a great messageBody 8. This is a great messageBody 9.',
						images: [],
						expiration: '2018-10-05',
						key: 'SyixM0vniazdrtggt',
					},
					{
						tags: [
							'Announcements',
						],
						subject: 'Message Subject 21',
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
								url: '/img/1/pic1.jpg',
								imageKey: 'H1jz0w3jazzxcv',
								previewKey: 'ry3GCP3s6Gzxcv',
							},
							{
								name: 'pic7.jpg',
								size: '65 kb',
								url: '/img/1/pic7.jpg',
								imageKey: 'r1TzRD3jTfzxcv',
								previewKey: 'Hk0fAD2oaMzxcv',
							},
						],
						expiration: '2018-10-05',
						key: 'B19f0P3spfdrtggt',
					},
					{
						tags: [
							'Events',
						],
						subject: 'This is a great Message Subject 22',
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
								url: '/img/2/pic2.jpg',
								imageKey: 'B1llMADhipzzxcv',
								previewKey: 'SkZlGCv3saMzxcv',
							},
						],
						expiration: '2018-10-05',
						key: 'H1JgfRPhiTzdrtggt',
					},
					{
						tags: [
							'Announcements',
						],
						subject: 'What an even better Message Subject 23',
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
								url: '/img/3/pic3.jpg',
								imageKey: 'rymxf0P3jpMzxcv',
								previewKey: 'H14gf0w3sTGzxcv',
							},
						],
						expiration: '2018-10-05',
						key: 'ByMxf0P2ipMdrtggt',
					},
					{
						tags: [
							'Events',
						],
						subject: 'Message Subject 24',
						created: '2018-04-05',
						modified: '2018-04-05',
						creator: {
							displayName: 'Kathryn Bartholomew',
							account: 'kbartholomew',
						},
						body: 'This is a great messageBody 1. This is a great messageBody 2. This is a great messageBody 3. This is a great messageBody 4. This is a great messageBody 5. This is a great messageBody 6. This is a great messageBody 7. This is a great messageBody 8. This is a great messageBody 9.',
						images: [],
						expiration: '2018-10-05',
						key: 'ryHxGCDhjaMdrtggt',
					},
					{
						tags: [
							'Announcements',
						],
						subject: 'This is a great Message Subject 25',
						created: '2018-04-05',
						modified: '2018-04-05',
						creator: {
							displayName: 'Jason Barone-Cichocki',
							account: 'jbcichocki',
						},
						body: 'This is a great messageBody 1. This is a great messageBody 2. This is a great messageBody 3. This is a great messageBody 4. This is a great messageBody 5. This is a great messageBody 6. This is a great messageBody 7. This is a great messageBody 8. This is a great messageBody 9.',
						images: [],
						expiration: '2018-10-05',
						key: 'H1IlGCwhoaMdrtggt',
					},
					{
						tags: [
							'Events',
						],
						subject: 'What an even better Message Subject 26',
						created: '2018-04-05',
						modified: '2018-04-05',
						creator: {
							displayName: 'Jason Barone-Cichocki',
							account: 'jbcichocki',
						},
						body: 'This is a great messageBody 1. This is a great messageBody 2. This is a great messageBody 3. This is a great messageBody 4. This is a great messageBody 5. This is a great messageBody 6. This is a great messageBody 7. This is a great messageBody 8. This is a great messageBody 9.',
						images: [],
						expiration: '2018-10-05',
						key: 'HyPgM0whj6fdrtggt',
					},
					{
						tags: [
							'Announcements',
						],
						subject: 'Message Subject 27',
						created: '2018-04-05',
						modified: '2018-04-05',
						creator: {
							displayName: 'Kathryn Bartholomew',
							account: 'kbartholomew',
						},
						body: 'This is a great messageBody 1. This is a great messageBody 2. This is a great messageBody 3. This is a great messageBody 4. This is a great messageBody 5. This is a great messageBody 6. This is a great messageBody 7. This is a great messageBody 8. This is a great messageBody 9.',
						images: [],
						expiration: '2018-10-05',
						key: 'Sk_eGAv2jaMvbn',
					},
					{
						tags: [
							'Events',
						],
						subject: 'This is a great Message Subject 28',
						created: '2018-04-05',
						modified: '2018-04-05',
						creator: {
							displayName: 'Jeannette Amazeen-Thomas',
							account: 'jthomas',
						},
						body: 'This is a great messageBody 1. This is a great messageBody 2. This is a great messageBody 3. This is a great messageBody 4. This is a great messageBody 5. This is a great messageBody 6. This is a great messageBody 7. This is a great messageBody 8. This is a great messageBody 9.',
						images: [],
						expiration: '2018-10-05',
						key: 'SytefCPnjpGdrtggt',
					},
					{
						tags: [
							'Announcements',
						],
						subject: 'What an even better Message Subject 29',
						created: '2018-04-05',
						modified: '2018-04-05',
						creator: {
							displayName: 'James Baker',
							account: 'jbaker',
						},
						body: 'This is a great messageBody 1. This is a great messageBody 2. This is a great messageBody 3. This is a great messageBody 4. This is a great messageBody 5. This is a great messageBody 6. This is a great messageBody 7. This is a great messageBody 8. This is a great messageBody 9.',
						images: [],
						expiration: '2018-10-05',
						key: 'S19gG0w2jafvbnm',
					},
					{
						tags: [
							'Events',
						],
						subject: 'Message Subject 30',
						created: '2018-04-05',
						modified: '2018-04-05',
						creator: {
							displayName: 'Sheryl White Vincent',
							account: 'swvincent',
						},
						body: 'This is a great messageBody 1. This is a great messageBody 2. This is a great messageBody 3. This is a great messageBody 4. This is a great messageBody 5. This is a great messageBody 6. This is a great messageBody 7. This is a great messageBody 8. This is a great messageBody 9.',
						images: [],
						expiration: '2018-10-05',
						key: 'SyixM0vniazvbnm',
					},
					{
						tags: [
							'Announcements',
						],
						subject: 'Message Subject 31',
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
								url: '/img/1/pic1.jpg',
								imageKey: 'H1jz0w3jaz2345',
								previewKey: 'ry3GCP3s6G2345',
							},
							{
								name: 'pic7.jpg',
								size: '65 kb',
								url: '/img/1/pic7.jpg',
								imageKey: 'r1TzRD3jTf2345',
								previewKey: 'Hk0fAD2oaM2345',
							},
						],
						expiration: '2018-10-05',
						key: 'B19f0P3spfvbnm',
					},
					{
						tags: [
							'Events',
						],
						subject: 'This is a great Message Subject 32',
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
								url: '/img/2/pic2.jpg',
								imageKey: 'B1llMADhipz2345',
								previewKey: 'SkZlGCv3saM2345',
							},
						],
						expiration: '2018-10-05',
						key: 'H1JgfRPhiTzvbnm',
					},
					{
						tags: [
							'Announcements',
						],
						subject: 'What an even better Message Subject 33',
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
								url: '/img/3/pic3.jpg',
								imageKey: 'rymxf0P3jpM2345',
								previewKey: 'H14gf0w3sTG2345',
							},
						],
						expiration: '2018-10-05',
						key: 'ByMxf0P2ipMvbnm',
					},
					{
						tags: [
							'Events',
						],
						subject: 'Message Subject 34',
						created: '2018-04-05',
						modified: '2018-04-05',
						creator: {
							displayName: 'Kathryn Bartholomew',
							account: 'kbartholomew',
						},
						body: 'This is a great messageBody 1. This is a great messageBody 2. This is a great messageBody 3. This is a great messageBody 4. This is a great messageBody 5. This is a great messageBody 6. This is a great messageBody 7. This is a great messageBody 8. This is a great messageBody 9.',
						images: [],
						expiration: '2018-10-05',
						key: 'ryHxGCDhjaMvbnm',
					},
					{
						tags: [
							'Announcements',
						],
						subject: 'This is a great Message Subject 35',
						created: '2018-04-05',
						modified: '2018-04-05',
						creator: {
							displayName: 'Jason Barone-Cichocki',
							account: 'jbcichocki',
						},
						body: 'This is a great messageBody 1. This is a great messageBody 2. This is a great messageBody 3. This is a great messageBody 4. This is a great messageBody 5. This is a great messageBody 6. This is a great messageBody 7. This is a great messageBody 8. This is a great messageBody 9.',
						images: [],
						expiration: '2018-10-05',
						key: 'H1IlGCwhoaMvbnm',
					},
					{
						tags: [
							'Events',
						],
						subject: 'What an even better Message Subject 36',
						created: '2018-04-05',
						modified: '2018-04-05',
						creator: {
							displayName: 'Jason Barone-Cichocki',
							account: 'jbcichocki',
						},
						body: 'This is a great messageBody 1. This is a great messageBody 2. This is a great messageBody 3. This is a great messageBody 4. This is a great messageBody 5. This is a great messageBody 6. This is a great messageBody 7. This is a great messageBody 8. This is a great messageBody 9.',
						images: [],
						expiration: '2018-10-05',
						key: 'HyPgM0whj6fvbnyyyyy',
					},
					{
						tags: [
							'Announcements',
						],
						subject: 'Message Subject 37',
						created: '2018-04-05',
						modified: '2018-04-05',
						creator: {
							displayName: 'Kathryn Bartholomew',
							account: 'kbartholomew',
						},
						body: 'This is a great messageBody 1. This is a great messageBody 2. This is a great messageBody 3. This is a great messageBody 4. This is a great messageBody 5. This is a great messageBody 6. This is a great messageBody 7. This is a great messageBody 8. This is a great messageBody 9.',
						images: [],
						expiration: '2018-10-05',
						key: 'Sk_eGAv2jaM4r567',
					},
					{
						tags: [
							'Events',
						],
						subject: 'This is a great Message Subject 38',
						created: '2018-04-05',
						modified: '2018-04-05',
						creator: {
							displayName: 'Jeannette Amazeen-Thomas',
							account: 'jthomas',
						},
						body: 'This is a great messageBody 1. This is a great messageBody 2. This is a great messageBody 3. This is a great messageBody 4. This is a great messageBody 5. This is a great messageBody 6. This is a great messageBody 7. This is a great messageBody 8. This is a great messageBody 9.',
						images: [],
						expiration: '2018-10-05',
						key: 'SytefCPnjpGvbnyyyyy',
					},
					{
						tags: [
							'Announcements',
						],
						subject: 'What an even better Message Subject 39',
						created: '2018-04-05',
						modified: '2018-04-05',
						creator: {
							displayName: 'James Baker',
							account: 'jbaker',
						},
						body: 'This is a great messageBody 1. This is a great messageBody 2. This is a great messageBody 3. This is a great messageBody 4. This is a great messageBody 5. This is a great messageBody 6. This is a great messageBody 7. This is a great messageBody 8. This is a great messageBody 9.',
						images: [],
						expiration: '2018-10-05',
						key: 'S19gG0w2jafvbnyyyyy',
					},
					{
						tags: [
							'Events',
						],
						subject: 'Message Subject 40',
						created: '2018-04-05',
						modified: '2018-04-05',
						creator: {
							displayName: 'Sheryl White Vincent',
							account: 'swvincent',
						},
						body: 'This is a great messageBody 1. This is a great messageBody 2. This is a great messageBody 3. This is a great messageBody 4. This is a great messageBody 5. This is a great messageBody 6. This is a great messageBody 7. This is a great messageBody 8. This is a great messageBody 9.',
						images: [],
						expiration: '2018-10-05',
						key: 'SyixM0vniazvbnyyyyy',
					},
					{
						tags: [
							'Announcements',
						],
						subject: 'Message Subject 41',
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
								url: '/img/1/pic1.jpg',
								imageKey: 'H1jz0w3jazasd',
								previewKey: 'ry3GCP3s6Gdg',
							},
							{
								name: 'pic7.jpg',
								size: '65 kb',
								url: '/img/1/pic7.jpg',
								imageKey: 'r1TzRD3jTfsdgf',
								previewKey: 'Hk0fAD2oaMsdgf',
							},
						],
						expiration: '2018-10-05',
						key: 'B19f0P3spfasdf',
					},
					{
						tags: [
							'Events',
						],
						subject: 'This is a great Message Subject 42',
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
								url: '/img/2/pic2.jpg',
								imageKey: 'B1llMADhipzsdgf',
								previewKey: 'SkZlGCv3saMsdgf',
							},
						],
						expiration: '2018-10-05',
						key: 'H1JgfRPhiTzasdf',
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
				spWeb.getFolderByServerRelativeUrl(`/img/${folder}`)
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
					url: 'https://bmos.sharepoint.com/img/1/pic1.jpg',
					error: false,
					key: shortid.generate(),
				});
			}
		});
	}
}
