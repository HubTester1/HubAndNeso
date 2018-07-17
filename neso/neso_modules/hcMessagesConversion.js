
/* eslint-disable indent */
/* eslint-disable prefer-destructuring */

// ----- PULL IN MODULES

const fse = require('fs-extra');
const moment = require('moment');
const nesoActiveDirectory = require('./nesoActiveDirectory');
const shortID = require('shortid');
const nesoDBQueries = require('./nesoDBQueries');
const nesoUtilities = require('./nesoUtilities');

// ----- CONVERSION FUNCTION

module.exports = {

	ConvertQuarkMessagesAndInsert: () => {
		// read raw data, convert to JSON
		const messagesRaw = JSON.parse(fse.readFileSync('../data/src/quarkMessagesRaw.json', 'utf8'));
		const messagesRawArrayOfArrays = messagesRaw.DATA;
		messagesRawArrayOfArrays.forEach((quarkArray, i) => {
			// get a promise to retrieve user data
			nesoActiveDirectory.ReturnOneSpecifiedUser(quarkArray[9])
				// if the promise is resolved with the docs
				.then((result) => {
					const hcMessage = {};
					hcMessage.messageID = i + 1;
					hcMessage.migratedFromQuark = true;
					switch (quarkArray[1]) {
						case 1:
							hcMessage.messageTags = [
								{
									name: 'Announcements',
									camlName: 'announcements',
								},
							];
							break;

						case 2:
							hcMessage.messageTags = [
								{
									name: 'Department News',
									camlName: 'departmentNews',
								},
							];
							break;

						case 3:
							hcMessage.messageTags = [
								{
									name: 'Events',
									camlName: 'events',
								},
							];
							break;

						case 4:
							hcMessage.messageTags = [
								{
									name: 'Reports from the Outside',
									camlName: 'reportsFromTheOutside',
								},
							];
							break;

						case 5:
							hcMessage.messageTags = [
								{
									name: 'Good Ideas',
									camlName: 'goodIdeas',
								},
							];
							break;

						case 6:
							hcMessage.messageTags = [
								{
									name: 'Kudos',
									camlName: 'kudos',
								},
							];
							break;

						case 7:
							hcMessage.messageTags = [
								{
									name: 'Q & A',
									camlName: 'qAndA',
								},
							];
							break;

						case 8:
							hcMessage.messageTags = [
								{
									name: 'Lost & Found',
									camlName: 'lostAndFound',
								},
							];
							break;

						case 9:
							hcMessage.messageTags = [
								{
									name: 'Cool Science',
									camlName: 'coolScience',
								},
							];
							break;

						case 10:
							hcMessage.messageTags = [
								{
									name: 'Classifieds',
									camlName: 'classifieds',
								},
							];
							break;

						case 11:
							hcMessage.messageTags = [
								{
									name: 'Welcome Mat',
									camlName: 'welcomeMat',
								},
							];
							break;

						case 14:
							hcMessage.messageTags = [
								{
									name: 'Museum in the News',
									camlName: 'museumInTheNews',
								},
							];
							break;


						default:
							hcMessage.messageTags = [
								{
									name: 'Announcements',
									camlName: 'announcements',
								},
							];
							break;
					}
					let body = nesoUtilities.ReplaceAll('<font color=\"red\">', '', quarkArray[4]);
					body = nesoUtilities.ReplaceAll('<font size=\"3\">', '', body);
					body = nesoUtilities.ReplaceAll('<\/font>', '', body);
					body = nesoUtilities.ReplaceAll('�', '&apos;', body);
					body = nesoUtilities.ReplaceAll('<h2>', '<h5>', body);
					body = nesoUtilities.ReplaceAll('</h2>', '</h5>', body);
					body = nesoUtilities.ReplaceAll('<h1>', '<h4>', body);
					body = nesoUtilities.ReplaceAll('</h1>', '</h4>', body);
					
					hcMessage.messageBody = body;
					hcMessage.messageSubject = quarkArray[3];
					if (quarkArray[6]) {
						hcMessage.messageExpiration = moment(quarkArray[6], 'MMMM, DD YYYY HH:mm:ss').toDate();
					} else {
						hcMessage.messageExpiration = moment(quarkArray[7], 'MMMM, DD YYYY HH:mm:ss').add(180, 'days').toDate();
					}
					hcMessage.messageCreated = moment(quarkArray[7], 'MMMM, DD YYYY HH:mm:ss').toDate();
					hcMessage.messageModified = moment(quarkArray[8], 'MMMM, DD YYYY HH:mm:ss').toDate();
					hcMessage.messageCreator = {
						displayName: `${result.docs.firstName} ${result.docs.lastName}`,
						account: quarkArray[9],
					};
					if (quarkArray[16]) {
						hcMessage.messageImages = [
							{
								error: false,
								name: quarkArray[16],
								key: shortID.generate(),
								migratedFromQuark: true,
								uriQuark: `https://neso.mos.org:${process.env.httpsPort}/images/hcMessages/migratedFromQuark/${quarkArray[17]}/${quarkArray[16]}`,
							},
						];
					}
					// get a promise to insert message
					nesoDBQueries.InsertDocIntoCollection(hcMessage, 'hcMessages')
						// if the promise is resolved with the docs, then resolve this promise with the docs
						.then((insertionResult) => { 
							
						})
						// if the promise is rejected with an error, then reject this promise with an error
						.catch((error) => {
							console.log('--------------------');
							console.log(`insertion error for ${quarkArray[0]}`);
						});
				})
				// if the promise is rejected with an error, then log the error
				.catch((error) => { 
					console.log('--------------------');
					console.log(`can't find ${quarkArray[9]}`);
				});
		});
	},
};
