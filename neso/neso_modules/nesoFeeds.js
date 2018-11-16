
// ----- PULL IN MODULES

const fse = require('fs-extra');
const util = require('util');
const xml2js = require('xml2js');

const parser = new xml2js.Parser();


// ----- DEFINE FEEDS FUNCTIONS

module.exports = {

	CreateProducts365DaysByVenueShowXMLFeed: () =>
		// return a new promise
		new Promise((resolve, reject) => {
			// get a promise to retrieve xml contents as JS
			module.exports.ReturnXMLAsJSFromFile('\\\\zeus\\shared\\Hubdata\\iit\\products\\productsTodayByVenueShow.xml')
				// if the promise is resolved with the data, then resolve this promise with the data
				.then((xmlAsJSResult) => {
					let xmlString = '<products>';
					
					const { products } = xmlAsJSResult.xmlAsJS;
					const venueArray = products.venue;
					// console.log(util.inspect(venueArray, false, null));
					venueArray.forEach((venue) => {
						let venueString = 
							`<venue>
							<title>${venue.title[0]}</title>
						    <memberonly>${venue.memberonly[0]}</memberonly>
							<capacity>${venue.capacity[0]}</capacity>`;
							
						venueString += '</venue>';
						xmlString += venueString;
					});
					xmlString += '</products>';
					fse.writeFile('\\_dev\\public\\feeds\\products\\productsTodayByVenueShow.xml', xmlString, (writeFileError) => {
						if (writeFileError) {
							console.log(writeFileError);
						}
						console.log('The file was saved!');
					});


					resolve(xmlString);
				})
				// if the promise is rejected with an error, then reject this promise with an error
				.catch((error) => {
					reject(error);
				});
		}),

	ReturnNewXMLFilePathAndName: currentFilePathAndName =>
		`${currentFilePathAndName.slice(0, currentFilePathAndName.length - 4)}Copy.xml`,

	ReturnXMLAsJSFromFile: filePathAndName =>
		// return a new promise
		new Promise((resolve, reject) => {
			// try {
			// make a copy of the file to read
			const newXMLFilePathAndName =
				module.exports.ReturnNewXMLFilePathAndName(filePathAndName);
			fse
				.copy(filePathAndName, newXMLFilePathAndName, { overwrite: true })
				.then(() => {
					// console.log('FILE COPIED');
					fse.readFile(newXMLFilePathAndName, (fileReadError, fileReadData) => {
						parser.parseString(fileReadData, (parseError, parseResult) => {
							// resolve this promise with a message
							resolve({
								// error: false,
								error: parseError,
								// xmlAsJSError: false,
								xmlAsJS: parseResult,
							});
							fse
								.remove(newXMLFilePathAndName)
								.then(() => {
									// console.log('FILE REMOVED');
								})
								.catch((err) => {
									// construct a custom error
									const errorToReport = {
										error: true,
										fileRemovalError: true,
									};
									// process error
									// nesoErrors.ProcessError(errorToReport);
									// reject this promise with an error
									reject(errorToReport);
								});
						});
					});
				})
				.catch((err) => {
					// construct a custom error
					const errorToReport = {
						error: true,
						fileCopyError: true,
					};
					// process error
					// nesoErrors.ProcessError(errorToReport);
					// reject this promise with an error
					reject(errorToReport);
				});
			// if there was an error
			/* } catch (exception) {
				// console.log(exception);
				// construct a custom error
				const errorToReport = {
					error: true,
					xmlAsJSError: true,
				};
				// process error
				// nesoErrors.ProcessError(errorToReport);
				// reject this promise with an error
				reject(errorToReport);
			} */
		}),


};
