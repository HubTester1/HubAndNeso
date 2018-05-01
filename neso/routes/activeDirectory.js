
// ----- PULL IN MODULES, GET EXPRESS ROUTER

const router = require('express').Router();
const nesoActiveDirectory = require('../neso_modules/nesoActiveDirectory');

// ----- CONFIG EXPRESS ROUTER

// for GET request for /
router.get('/', (req, res, next) => {
	// respond with a simple message
	res.send("Ain't nothin' here.");
});

// for GET request for /depts
router.get('/depts', (req, res, next) => {
	// get a promise to retrieve department data
	nesoActiveDirectory.ReturnADDepartments()
		// if the promise is resolved with the docs, then respond with the docs as JSON
		.then((result) => { res.json(result); })
		// if the promise is rejected with an error, then respond with the error as JSON
		.catch((error) => { res.json(error); });
});


// for GET request for /user/:userID
router.get('/user/:userID', (req, res, next) => {
	// get a promise to retrieve user data
	nesoActiveDirectory.ReturnOneADUserByUserID(req.params.userID)
		// if the promise is resolved with the docs, then respond with the docs as JSON
		.then((result) => { res.json(result); })
		// if the promise is rejected with an error, then respond with the error as JSON
		.catch((error) => { res.json(error); });
});

// for GET request for /user/:userID
router.get('/users/:mgrUserID', (req, res, next) => {
	// get a promise to retrieve user data
	nesoActiveDirectory.ReturnAllADUsersWithSpecifiedManager(req.params.mgrUserID)
		// if the promise is resolved with the docs, then respond with the docs as JSON
		.then((result) => { res.json(result); })
		// if the promise is rejected with an error, then respond with the error as JSON
		.catch((error) => { res.json(error); });
});

// for GET request for /divDept
router.get('/divDept', (req, res, next) => {
	// get a promise to retrieve user data
	nesoActiveDirectory.ReturnADUsersByDivisionDepartmentData()
		// if the promise is resolved with the docs, then respond with the docs as JSON
		.then((result) => { res.json(result); })
		// if the promise is rejected with an error, then respond with the error as JSON
		.catch((error) => { res.json(error); });
});

// for GET request for /teams
router.get('/teams', (req, res, next) => {
	// get a promise to retrieve user data
	nesoActiveDirectory.ReturnTeamsBasic()
		// if the promise is resolved with the docs, then respond with the docs as JSON
		.then((result) => { res.json(result); })
		// if the promise is rejected with an error, then respond with the error as JSON
		.catch((error) => { res.json(error); });
});


// ----- EXPORT EXPRESS ROUTER

module.exports = router;
