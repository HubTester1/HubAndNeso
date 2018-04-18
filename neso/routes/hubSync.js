
// ----- PULL IN MODULES, GET EXPRESS ROUTER

const router = require('express').Router();
const nesoHubSync = require('../neso_modules/nesoHubSync');

// ----- CONFIG EXPRESS ROUTER

// for GET request for /
router.get('/', (req, res, next) => {
	// respond with a simple message
	res.send("Ain't nothin' here.");
});

// for GET request for /check
router.post('/test', (req, res, next) => {
	// get a promise to insert the email (request body) into the queue
	nesoHubSync.Test(req.body)
		// if the promise is resolved with the result, then respond with the result as JSON
		.then((result) => { res.json(result); });
});


// ----- EXPORT EXPRESS ROUTER

module.exports = router;
