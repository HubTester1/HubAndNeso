
// ----- PULL IN MODULES, GET EXPRESS ROUTER

// use the "express" node module; this is our app framework, including our HTTP server
const router = require('express').Router();
// use the "nesoSettings" neso module; this allows us to get system-wide settings
const nesoSettings = require('../neso_modules/nesoSettings');

// ----- CONFIG EXPRESS ROUTER

// for GET request for /
router.get('/', (req, res, next) => {
	// get a promise to retrieve all error data
	nesoSettings.ReturnNesoSettingsData()
		// if the promise is resolved with the docs, then respond with the docs as JSON
		.then((result) => { res.json(result); })
		// if the promise is rejected with an error, then respond with the error as JSON
		.catch((error) => { res.json(error); });
});

// ----- EXPORT EXPRESS ROUTER

module.exports = router;
