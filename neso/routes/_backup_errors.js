
/*********************************************************************
	PULL IN MODULES, GET EXPRESS ROUTER
*********************************************************************/

// use the "express" node module; this is our app framework, including our HTTP server
var express = require('express');
// use the "nesoEmail" neso module; this contains most of the functionality of this email API
var nesoErrors = require('../neso_modules/nesoErrors');

// pull out express's router method
var router = express.Router();





/*********************************************************************
	CONFIG EXPRESS ROUTER
*********************************************************************/

//--------  TOP-LEVEL DIRECTORY  -----------------------------------//

// GET /
// for GET request for /
router.get('/', function(req, res, next) {
	// respond with a simple message
	res.send("Ain't nothin' here.");
});



//--------  CONSOLE / DOCUUMENTATION  -------------------------------//

// GET /admin
// for GET requests for /admin
router.get('/admin', function(req, res) {
	// respond with a render of the errors/adminConsole view
	res.render('errors/adminConsole', { title: 'Errors Admin Console' });
});



//--------  BACKEND  ------------------------------------------------//

//--------  GET (READ)

// GET /log
// for GET request for /log
/*router.get('/log', function(req, res, next) {
	// get a promise to retrieve all error data
	nesoErrors.ReturnErrorLogData()
	// if the promise is resolved with the docs, then respond with the docs as JSON
	.then(function(result) { res.json(result) })
	// if the promise is rejected with an error, then respond with the error as JSON
	.catch(function (error) { res.json(error) });
});
*/

// GET /settings
// for GET requests for /settings
/*router.get('/settings', function(req, res) {
	// get a promise to retrieve settings data
	nesoEmail.ReturnErrorSettingsData()
	// if the promise is resolved with the settings object, then respond with the settings object as JSON
	.then(function(result) { res.json(result) })
	// if the promise is rejected with an error, then respond with the error as JSON
	.catch(function (error) { res.json(error) });
});
*/


//--------  POST (CREATE)

// POST /log
// for POST requests for /log
/*router.post('/log', function(req, res) {
	// get a promise to insert the error (request body) into the queue
	nesoErrors.AddErrorToLog(req.body)
	// if the promise is resolved with the result, then respond with the result as JSON
	.then(function(result) { res.json(result) })
	// if the promise is rejected with an error, then respond with the error as JSON
	.catch(function (error) { res.json(error) });
});
*/

// POST /process
// for POST requests for /process
/*router.get('/process', function(req, res) {
	// get a promise to insert the error (request body) into the queue
	nesoErrors.ProcessError(req.body)
	// if the promise is resolved with the result, then respond with the result as JSON
	.then(function(result) { res.json(result) })
	// if the promise is rejected with an error, then respond with the error as JSON
	.catch(function (error) { res.json(error) });
});
*/


/*********************************************************************
	EXPORT EXPRESS ROUTER
*********************************************************************/

module.exports = router;
