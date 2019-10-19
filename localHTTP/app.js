
// ----- PULL IN DOTENV MODULE TO CONFIG ENVIRONMENT

// const dotenv = require('dotenv');

// dotenv.config({ path: './dotenv.env' });

// ----- PULL IN MODULES, ROUTES, CONFIG

// CONFIG ---

// const cronConfig = require('./env.config.cron.json');

// NODE MODULES ---

const express = require('express');
const cors = require('cors');
const http = require('http');
const path = require('path');
const favicon = require('serve-favicon');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

// NESO (MOS) MODULES ---

const nesoMSGraph = require('./neso_modules/nesoMSGraph');

// NESO (MOS) ROUTES ---

const index = require('./routes/index');
// const health = require('./routes/health');
// const msGraph = require('./routes/msGraph');

// ----- INSTANTIATE, CONFIG EXPRESS APP

const app = express();

// VIEWS ---

// where to find views and what rendering engine to use
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// PARSING ---

// if a request contains url encoded data, parse the data and place it on the request object
app.use(bodyParser.urlencoded({ extended: false }));
// if a request contains JSON data, parse the data and place it on the request object
app.use(bodyParser.json());
// if a request contains cookie data, parse the data and place it on the request object
app.use(cookieParser());

// create a server, using Express app, that listens for 
// 		insecure requests on port specified in environment vars
http.createServer(app).listen(3005, () => {
	// eslint-disable-next-line no-console
	console.log('Express server running on port 3005');
});


// ROUTES ---

app.use('/', index);

// STATIC LOCATIONS ---

// where to find the favicon
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
// use the express static file server; 
// 		tell it from where to serve files; this serves up the response
app.use(express.static(path.join(__dirname, 'public')));

// ERRORS ---

// catch 404 and forward to error handler
app.use((req, res, next) => {
	const err = new Error('Not Found');
	err.status = 404;
	next(err);
});
// error handler
app.use((err, req, res, next) => {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render('error', { title: 'Error' });
});

// EXECUTE FUNCTIONS ---

nesoMSGraph.Test()
	// if the promise is resolved, log result
	.then((result) => {
		// eslint-disable-next-line no-console
		console.log('SUCCESS - graph test:');
		// eslint-disable-next-line no-console
		console.log(result);
	})
	// if the promise is rejected, log error
	.catch((error) => {
		// eslint-disable-next-line no-console
		console.log('ERROR - graph test:');
		// eslint-disable-next-line no-console
		console.log(error);
	});

// PROCESS ---

// upon the event of an unhandled promise rejection
process.on('unhandledRejection', (reason, p) => {
	// show some data about unhandled rejection so that it can be found
	// eslint-disable-next-line no-console
	console.log('Unhandled Rejection at: Promise', p, 'reason:', reason);
});

// ----- EXPORT EXPRESS APP

module.exports = app;
