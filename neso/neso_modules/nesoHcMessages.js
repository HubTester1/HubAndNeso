
// ----- PULL IN MODULES

const nesoDBQueries = require('./nesoDBQueries');

const nesoDBConnection = require('./nesoDBConnection');
const { ObjectID } = require('mongodb');


// ----- DEFINE HEALTH FUNCTIONS

module.exports = {

	ReturnHcMessagesSettingsData: () =>
		// return a new promise
		new Promise(((resolve, reject) => {
			// get a promise to retrieve all documents from the hcMessagesSettings document collection
			nesoDBQueries.ReturnAllDocsFromCollection('hcMessagesSettings')
				// if the promise is resolved with the docs, then resolve this promise with the docs
				.then((result) => { resolve(result); })
				// if the promise is rejected with an error, then reject this promise with an error
				.catch((error) => { reject(error); });
		})),

	ReturnHcMessagesNextMessageIDAndIterate: () =>
		// return a new promise
		new Promise(((resolve, reject) => {
			// get a promise to retrieve all documents from the hcMessagesSettings document collection
			nesoDBQueries.ReturnAllDocsFromCollection('hcMessagesSettings')
				// if the promise is resolved with the docs
				.then((result) => {
					// resolve this promise with the ID
					resolve({
						error: false,
						docs: { nextMessageID: result.docs[0].nextMessageID },
					});
					// iterate the value in the db for next time
					module.exports.IterateHcMessagesNextMessageID(result.docs[0]);
				})
				// if the promise is rejected with an error, then reject this promise with an error
				.catch((error) => { reject(error); });
		})),

	IterateHcMessagesNextMessageID: (existingSettings) => {
		const newNextMessageID = existingSettings.nextMessageID + 1;
		// get a promise to replace the settings in the hcMessagesSettings document collection
		nesoDBQueries
			.UpdateSpecificFieldInSpecificDocsInCollection('hcMessagesSettings', '_id', existingSettings._id, true, 'nextMessageID', newNextMessageID);
	},

	ReturnHcMessagesWhitelistedDomains: () =>
		// return a new promise
		new Promise(((resolve, reject) => {
			// get a promise to retrieve all email settings
			module.exports.ReturnHcMessagesSettingsData()
				// if the promise is resolved with the settings
				.then((settings) => {
					// resolve this promise with the requested setting
					resolve({
						error: settings.error,
						whitelistedDomains: settings.docs[0].whitelistedDomains,
					});
				})
				// if the promise is rejected with an error, then reject this promise with an error
				.catch((error) => { reject(error); });
		})),

	ReturnHcMessages: () =>
		// return a new promise
		new Promise(((resolve, reject) => {
			// get a promise to retrieve all documents from the hcMessages document collection
			nesoDBQueries.ReturnAllDocsFromCollection('hcMessages')
				// if the promise is resolved with the docs, then resolve this promise with the docs
				.then((result) => { resolve(result); })
				// if the promise is rejected with an error, then reject this promise with an error
				.catch((error) => { reject(error); });
		})),

	ReturnHcMessagesDescending: () =>
		// return a new promise
		new Promise(((resolve, reject) => {
			// get a promise to retrieve all documents from the hcMessages document collection
			nesoDBQueries.ReturnAllDocsFromCollectionSorted('hcMessages', 'messageModified', 'descending')
				// if the promise is resolved with the docs, then resolve this promise with the docs
				.then((result) => { resolve(result); })
				// if the promise is rejected with an error, then reject this promise with an error
				.catch((error) => { reject(error); });
		})),

	ReturnHcMessagesDescendingWithSpecifiedTag: tag =>
		// return a new promise
		new Promise(((resolve, reject) => {
			// get a promise to retrieve all documents from the hcMessages document collection
			nesoDBQueries.ReturnSpecifiedDocsFromCollectionSorted('hcMessages', 'messageTags', tag, 'messageModified', 'descending')
				// if the promise is resolved with the docs, then resolve this promise with the docs
				.then((result) => { resolve(result); })
				// if the promise is rejected with an error, then reject this promise with an error
				.catch((error) => { reject(error); });
		})),

	ReceiveMessage: incomingMessage =>
		// return a new promise
		new Promise(((resolve, reject) => {
			// preserve function parameter
			const incomingMessageCopy = incomingMessage;
			const messageToInsert = {
				messageTags: [incomingMessageCopy.newMessageTag],
				messageSubject: incomingMessageCopy.newMessageSubject,
				messageBody: incomingMessageCopy.newMessageBody,
				messageImage: incomingMessageCopy.newMessageImage,
				messageExpiration: incomingMessageCopy.newMessageExpirationDate,
				messageCreated: incomingMessageCopy.newMessageCreated,
				messageCreator: incomingMessageCopy.newMessageCreator,
				messageModified: incomingMessageCopy.newMessageCreated,
			};
			// get a promise to retrieve all documents from the hcMessagesSettings document collection
			nesoDBQueries.InsertDocIntoCollection(messageToInsert, 'hcMessages')
				// if the promise is resolved with the docs, then resolve this promise with the docs
				.then((result) => { resolve(result); })
				// if the promise is rejected with an error, then reject this promise with an error
				.catch((error) => { reject(error); });
		})),
};
