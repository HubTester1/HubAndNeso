
// ----- PULL IN MODULES

// const Twitter = require('twitter');
// const moment = require('moment');

// ----- DEFINE SETTINGS FUNCTIONS

module.exports = {
	Test: incomingData =>
		// return a new promise
		new Promise(((resolve, reject) => {
			console.log('incomingData');
			console.log(incomingData);
			resolve({ 'error': false});
		})),
};
