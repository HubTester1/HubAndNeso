
// ----- PULL IN MODULES

const nesoDBQueries = require('./nesoDBQueries');
const nesoImages = require('./nesoImages');
const fse = require('fs-extra');
const formidable = require('formidable');

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

	ReturnHcMessagesDescendingLimit3: () =>
		// return a new promise
		new Promise(((resolve, reject) => {
			// get a promise to retrieve all documents from the hcMessages document collection
			nesoDBQueries.ReturnLimitedDocsFromCollectionSorted('hcMessages', 'messageModified', 'descending', 3)
				// if the promise is resolved with the docs, then resolve this promise with the docs
				.then((result) => { resolve(result); })
				// if the promise is rejected with an error, then reject this promise with an error
				.catch((error) => { reject(error); });
		})),

	ReturnHcMessagesDescendingLimit4: () =>
		// return a new promise
		new Promise(((resolve, reject) => {
			// get a promise to retrieve all documents from the hcMessages document collection
			nesoDBQueries.ReturnLimitedDocsFromCollectionSorted('hcMessages', 'messageModified', 'descending', 4)
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

	ProcessNewMessageImage: req =>
		// return a new promise
		new Promise((resolve, reject) => {
			// parse the form data out of the incoming request
			const form = new formidable.IncomingForm();
			form.uploadDir = 'E:\\tmp';
			form.parse(req, (err, fields, files) => {
				// get an array of keys in the files object
				const fileKeys = Object.keys(files);
				// for each key in the files object
				fileKeys.forEach((fileKey) => {
					// get one file from the files object using its key
					const incomingFile = files[fileKey];
					// get a promise to get info about this image file
					nesoImages.ReturnImageInfo(incomingFile.path)
						// if the promise is resolved with the image info
						.then((imageInfo) => {
							// get a promise to convert to JPG, if needed
							nesoImages.ConvertToJPGIfNeeded(imageInfo)
								// if the promise was resolved with the result
								.then((conversionResult) => {
									// construct base storage path, name, extension
									const storagePath = `${process.env.appRoot}\\public\\images\\hcMessages\\${fields.messageID}\\`;
									const storageName = incomingFile.name.replace(/\.[^/.]+$/, '');
									const storageExtension = conversionResult.resultType;
									// create folder for storage, if it doesn't exist
									if (!fse.existsSync(storagePath)) {
										fse.mkdirSync(storagePath);
									}
									// get a promise to store resized images
									nesoImages.ResizeImages([
										{
											source: conversionResult.result,
											width: 350,
											destination: `${storagePath}${storageName}_350.${storageExtension}`,
										}, {
											source: conversionResult.result,
											width: 600,
											destination: `${storagePath}${storageName}_600.${storageExtension}`,
										},
									])
										// if the promise was resolved with the result
										.then((resizeResults) => {
											resolve({
												error: false,
												result: resizeResults,
											});
										})
										// if the promise was rejected with an error
										.catch((error) => {
											reject({
												error: true,
												imageResizeError: true,
												errorInfo: error,
											});
										});
								})
								// if the promise was rejected with an error
								.catch((error) => {
									reject({
										error: true,
										imageConversionError: true,
										errorInfo: error,
									});
								});
						})
						// if the promise is rejected with an error
						.catch((error) => {
							// reject this promise with the error
							reject({
								error: true,
								imageInfoError: true,
								errorInfo: error,
							});
						});
				});
			});
		}),

	ProcessNewMessage: incomingMessage =>
		// return a new promise
		new Promise(((resolve, reject) => {
			// preserve function parameter
			const incomingMessageCopy = incomingMessage;
			// weed out some unnecessary image data
			const imageDataToKeep = [];
			incomingMessageCopy.newMessageImages.forEach((imageValue) => {
				imageDataToKeep.push({
					name: imageValue.name,
					size: imageValue.size,
					url: imageValue.url,
				});
			});
			const messageToInsert = {
				messageID: incomingMessageCopy.newMessageID,
				messageTags: incomingMessageCopy.newMessageTags,
				messageSubject: incomingMessageCopy.newMessageSubject,
				messageBody: incomingMessageCopy.newMessageBody,
				messageImages: imageDataToKeep,
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
