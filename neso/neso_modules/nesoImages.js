
// ----- PULL IN MODULES

// const fse = require('fs-extra');
const formidable = require('formidable');
const easyimage = require('easyimage');


const nesoDBQueries = require('./nesoDBQueries');
// const nesoErrors = require('./nesoErrors');

// ----- DEFINE IMAGES FUNCTIONS

module.exports = {

	ReturnImagesSettingsData: () =>
		// return a new promise
		new Promise((resolve, reject) => {
			// get a promise to retrieve all documents from the emailSettings document collection
			nesoDBQueries.ReturnAllDocsFromCollection('imagesSettings')
				// if the promise is resolved with the docs, then resolve this promise with the docs
				.then((result) => { resolve(result); })
				// if the promise is rejected with an error, then reject this promise with an error
				.catch((error) => { reject(error); });
		}),

	ReturnImagesWhitelistedDomains: () =>
		// return a new promise
		new Promise((resolve, reject) => {
			// get a promise to retrieve all email settings
			module.exports.ReturnImagesSettingsData()
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
		}),
	
	ReturnImageInfo: path => easyimage.info(path),
		
	ReceiveImage: req =>
		// return a new promise
		new Promise((resolve, reject) => {
			console.log('---------ReceiveImage---------');
			const form = new formidable.IncomingForm();
			form.parse(req, (err, fields, files) => {
				console.log('messageID');
				console.log(fields.messageID);
				console.log('image0 path');
				console.log(files.image0.path);
			});
			if (req) {
				resolve({
					req,
				});
			} else {
				reject({
					error: true,
				});
			}
		}),

	ResizeImage: (source, destination, width, height) =>
		// return a new promise
		new Promise((resolve, reject) => {
			// either width or height is required
			if (source && destination && (width || height)) {
				// construct options object from params
				const resizeOptions = {
					src: source,
					dst: destination,
				};
				if (width) {
					resizeOptions.width = width;
				}
				if (height) {
					resizeOptions.height = height;
				}
				// get a promise to resize the image
				easyimage.resize(resizeOptions)
					// if the promise was resolved with the result
					.then((result) => {
						// resolve this promise with the resule
						resolve({
							error: false,
							imageMagickResult: result,
						});
					})
					// if the promise was rejected with an error
					.catch((error) => {
						// reject this promise with the error
						resolve({
							error: true,
							imageMagickError: error,
						});
					});
			// if neither width or height was supplied
			} else {
				// reject this promise with an error
				reject({
					error: true,
					paramError: 'Source, destination, and either width or height must be supplied',
				});
			}
		}),
};
