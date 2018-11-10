
// ----- PULL IN DOTENV MODULE TO CONFIG ENVIRONMENT

const dotenv = require('dotenv');

dotenv.config({ path: './dotenv.env' });

// ----- PULL IN MODULES, ROUTES

// NODE MODULES ---

const express = require('express');
const morgan = require('morgan');
const fs = require('fs');
const cors = require('cors');
const http = require('http');
const https = require('https');
const path = require('path');
const favicon = require('serve-favicon');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cron = require('node-cron');

// NESO (MOS) MODULES ---

const nesoCORS = require('./neso_modules/nesoCORS');
const nesoUtilities = require('./neso_modules/nesoUtilities');
const nesoEmail = require('./neso_modules/nesoEmail');
const nesoHRPositions = require('./neso_modules/nesoHRPositions');
const nesoActiveDirectory = require('./neso_modules/nesoActiveDirectory');
const nesoHcOrg = require('./neso_modules/nesoHcOrg');
const nesoSPSync = require('./neso_modules/nesoSPSync');
const nesoHubEmails = require('./neso_modules/nesoHubEmails');

// NESO (MOS) ROUTES ---

const index = require('./routes/index');
const health = require('./routes/health');
const email = require('./routes/email');
const hrPositions = require('./routes/hrPositions');
const activeDirectory = require('./routes/activeDirectory');
const hcMessages = require('./routes/hcMessages');
const hcGetItDone = require('./routes/hcGetItDone');
const hcOrg = require('./routes/hcOrg');
const images = require('./routes/images');

// ----- INSTANTIATE, CONFIG EXPRESS APP

const app = express();

// LOGGING ---

/* 
	(we use bunyan for recorded logs because bunyan records lots of structured data; 
		we use morgan for logging short notifications  
		to the console)

	1. we'll log every request to the console
	2. we'll record three log files:
			- nesoAllInfo		= 	all requests, moderate detail - this is most likely to be useful
			- nesoAllDebug		= 	all requests, high detail
			- nesoErrorsDebug	= 	errors only, high detail
 */

// log brief notifications to the console
app.use(morgan('dev'));

// specify log directories and files
const nesoAllInfoLogDirectory = path.join(__dirname, 'log/nesoAllInfo');
const nesoAllInfoLogFile = path.join(nesoAllInfoLogDirectory, 'nesoAllInfo.log');
const nesoAllDebugLogDirectory = path.join(__dirname, 'log/nesoAllDebug');
const nesoAllDebugLogFile = path.join(nesoAllDebugLogDirectory, 'nesoAllDebug.log');
const nesoErrorsDebugLogDirectory = path.join(__dirname, 'log/nesoErrorsDebug');
const nesoErrorsDebugLogFile = path.join(nesoErrorsDebugLogDirectory, 'nesoErrorsDebug.log');
// ensure log directories exist
if (!(fs.existsSync(nesoAllInfoLogDirectory))) { fs.mkdirSync(nesoAllInfoLogDirectory); }
if (!(fs.existsSync(nesoAllDebugLogDirectory))) { fs.mkdirSync(nesoAllDebugLogDirectory); }
if (!(fs.existsSync(nesoErrorsDebugLogDirectory))) { fs.mkdirSync(nesoErrorsDebugLogDirectory); }
// for all requests
app.use(require('express-bunyan-logger')({
	name: 'NesoAll',
	streams: [{
		type: 'rotating-file',
		level: 'info',
		path: nesoAllInfoLogFile,
		period: '1d',	// daily rotation
		count: 21,		// keep 3 weeks' back copies
	}, {
		type: 'rotating-file',
		level: 'debug',
		path: nesoAllDebugLogFile,
		period: '1d',	// daily rotation
		count: 21,		// keep 3 weeks' back copies
	}],
}));
// for all errors
app.use(require('express-bunyan-logger').errorLogger({
	name: 'NesoErrors',
	streams: [{
		type: 'rotating-file',
		level: 'debug',
		path: nesoErrorsDebugLogFile,
		period: '1d',	// daily rotation
		count: 21,		// keep 3 weeks' back copies
	}],
}));


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

// SSL, LISTENING ---

// force SSL; that is, if request is not secure, redirect user to https
app.use((req, res, next) => {
	if (req.secure) {
		next();
	} else {
		res.redirect(`https://${req.headers.host}${req.url}`);
	}
});
// get SSL key, certificate as an object
const options = {
	key: fs.readFileSync(process.env.sslKey),
	cert: fs.readFileSync(process.env.sslCert),
};
// create a server, using Express app, that listens for 
// 		insecure requests on port specified in environment vars
http.createServer(app).listen(process.env.httpPort);
// create an SSL-secured server, using Express app, that listens for secure requests on port 443;
// 		print confirmation so we know it started
https.createServer(options, app).listen(process.env.httpsPort, () => {
	// eslint-disable-next-line no-console
	console.log(`SSL Express server running on port ${process.env.httpsPort}`);
});

// ROUTES ---

app.use('/', index);
app.use('/health', cors(nesoCORS.RequestingDomainWhitelistedForHealthAPI), health);
app.use('/email', cors(nesoCORS.RequestingDomainWhitelistedForEmailAPI), email);
app.use('/hrPositions', cors(nesoCORS.RequestingDomainWhitelistedForHRPositionsAPI), hrPositions);
app.use('/activeDirectory', cors(nesoCORS.RequestingDomainWhitelistedForActiveDirectoryAPI), activeDirectory);
app.use('/hcMessages', cors(nesoCORS.RequestingDomainWhitelistedForHcMessagesAPI), hcMessages);
app.use('/hcGetItDone', cors(nesoCORS.RequestingDomainWhitelistedForHcGetItDoneAPI), hcGetItDone);
app.use('/images', cors(nesoCORS.RequestingDomainWhitelistedForHcGetItDoneAPI), images);
app.use('/hcOrg', cors(nesoCORS.RequestingDomainWhitelistedForHcGetItDoneAPI), hcOrg);

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

// CRON ---

// schedule for once per minute
cron.schedule('* * * * *', () => {
	// get a promise to process the email queue
	nesoEmail.ProcessEmailQueue()
		// if the promise is resolved with the docs, then respond with the docs as JSON
		.then((result) => {
			// eslint-disable-next-line no-console
			// console.log("Processed Email Queue:");
			// console.log(result);
		})
		// if the promise is rejected with an error, then respond with the error as JSON
		.catch((error) => {
			// eslint-disable-next-line no-console
			console.log('ERROR - Processing Email Queue:');
			// eslint-disable-next-line no-console
			console.log(error);
		});
});
/* // schedule as specified in environment
cron.schedule(process.env.hrPositionsProcessingCronSchedule1, () => {
	// get a promise to process HR Position Directory data
	nesoHRPositions.ProcessHRPositionsData()
		// if the promise is resolved with the docs, then respond with the docs as JSON
		.then((result) => {
			// eslint-disable-next-line no-console
			// console.log('Processed HR Position Directory data:');
			// console.log(result);
		})
		// if the promise is rejected with an error, then respond with the error as JSON
		.catch((error) => {
			// eslint-disable-next-line no-console
			console.log('ERROR - Processing HR Position Directory data:');
			// eslint-disable-next-line no-console
			console.log(error);
		});
});
// schedule as specified in environment
cron.schedule(process.env.hrPositionsProcessingCronSchedule2, () => {
	// get a promise to process HR Position Directory data
	nesoHRPositions.ProcessHRPositionsData()
		// if the promise is resolved with the docs, then respond with the docs as JSON
		.then((result) => {
			// eslint-disable-next-line no-console
			// console.log('Processed HR Position Directory data:');
			// console.log(result);
		})
		// if the promise is rejected with an error, then respond with the error as JSON
		.catch((error) => {
			// eslint-disable-next-line no-console
			console.log('ERROR - Processing HR Position Directory data:');
			// eslint-disable-next-line no-console
			console.log(error);
		});
}); */
// schedule as specified in environment
cron.schedule(process.env.adUserProcessingCronSchedule, () => {
	nesoActiveDirectory.ProcessADUsersData()
		// if the promise is resolved with the docs, then respond with the docs as JSON
		.then((result) => {
			// eslint-disable-next-line no-console
			console.log('Processed Active Directory Users data:');
			// console.log(result);
		})
		// if the promise is rejected with an error, then respond with the error as JSON
		.catch((error) => {
			// eslint-disable-next-line no-console
			console.log('ERROR - Processing Active Directory Users data:');
			// eslint-disable-next-line no-console
			console.log(error);
		});
});
// schedule as specified in environment
cron.schedule(process.env.adUserByDivisionDepartmentProcessingCronSchedule, () => {
	nesoActiveDirectory.ProcessADUsersByDivisionDepartmentData()
		// if the promise is resolved with the docs, then respond with the docs as JSON
		.then((result) => {
			// eslint-disable-next-line no-console
			console.log('Processed Active Directory Users By Division Department data:');
			// console.log(result);
		})
		// if the promise is rejected with an error, then respond with the error as JSON
		.catch((error) => {
			// eslint-disable-next-line no-console
			console.log('ERROR - Processing Active Directory Users By Division Department data:');
			// eslint-disable-next-line no-console
			console.log(error);
		});
});
// schedule as specified in environment
cron.schedule(process.env.adUserByDivisionDepartmentTeamsProcessingCronSchedule, () => {
	nesoHcOrg.ProcessHcOrgDivDeptWTeamsData()
		// if the promise is resolved with the docs, then respond with the docs as JSON
		.then((result) => {
			// eslint-disable-next-line no-console
			console.log('Processed HcOrg DivDept data:');
			// console.log(result);
		})
		// if the promise is rejected with an error, then respond with the error as JSON
		.catch((error) => {
			// eslint-disable-next-line no-console
			console.log('ERROR - Processing HcOrg DivDept data data:');
			// eslint-disable-next-line no-console
			console.log(error);
		});
});
// schedule as specified in environment
cron.schedule(process.env.nonDivisionDepartmentTeamsProcessingCronSchedule, () => {
	nesoHcOrg.ProcessNonDivDeptTeamsData()
		// if the promise is resolved with the docs, then respond with the docs as JSON
		.then((result) => {
			// eslint-disable-next-line no-console
			console.log('Processed HcOrg NONDivDept data:');
			// console.log(result);
		})
		// if the promise is rejected with an error, then respond with the error as JSON
		.catch((error) => {
			// eslint-disable-next-line no-console
			console.log('ERROR - Processing HcOrg NONDivDept data data:');
			// eslint-disable-next-line no-console
			console.log(error);
		});
});
// schedule as specified in environment
cron.schedule(process.env.adDepartmentsProcessingCronSchedule, () => {
	nesoActiveDirectory.ProcessADDepartments()
		// if the promise is resolved with the docs, then respond with the docs as JSON
		.then((result) => {
			// eslint-disable-next-line no-console
			console.log('Processed Active Directory Departments data:');
			// console.log(result);
		})
		// if the promise is rejected with an error, then respond with the error as JSON
		.catch((error) => {
			// eslint-disable-next-line no-console
			console.log('ERROR - Processing Active Directory Departments data:');
			// eslint-disable-next-line no-console
			console.log(error);
		});
});
// schedule as specified in environment
cron.schedule(process.env.adManagersSimpleProcessingCronSchedule, () => {
	nesoActiveDirectory.ProcessADManagersSimple()
		// if the promise is resolved with the docs, then respond with the docs as JSON
		.then((result) => {
			// eslint-disable-next-line no-console
			console.log('Processed Active Directory Managers Simple data:');
			// console.log(result);
		})
		// if the promise is rejected with an error, then respond with the error as JSON
		.catch((error) => {
			// eslint-disable-next-line no-console
			console.log('ERROR - Processing Active Directory Managers Simple data:');
			// eslint-disable-next-line no-console
			console.log(error);
		});
});
// schedule as specified in environment
cron.schedule(process.env.adManagersWithFullFlatDownlinesProcessingCronSchedule, () => {
	nesoActiveDirectory.ProcessADManagersWithFullFlatDownlines()
		// if the promise is resolved with the docs, then respond with the docs as JSON
		.then((result) => {
			// eslint-disable-next-line no-console
			console.log('Processed Managers with Full Flat Downlines data:');
			// console.log(result);
		})
		// if the promise is rejected with an error, then respond with the error as JSON
		.catch((error) => {
			// eslint-disable-next-line no-console
			console.log('ERROR - Processing Managers with Full Flat Downlines data:');
			// eslint-disable-next-line no-console
			console.log(error);
		});
});
// schedule as specified in environment
cron.schedule(process.env.adManagersWithFullHierarchicalDownlinesProcessingCronSchedule, () => {
	nesoActiveDirectory.ProcessADManagersWithFullHierarchicalDownlines()
		// if the promise is resolved with the docs, then respond with the docs as JSON
		.then((result) => {
			// eslint-disable-next-line no-console
			console.log('Processed Managers with Full Hierarchical Downlines data:');
			// console.log(result);
		})
		// if the promise is rejected with an error, then respond with the error as JSON
		.catch((error) => {
			// eslint-disable-next-line no-console
			console.log('ERROR - Processing Managers with Full Hierarchical Downlines data:');
			// eslint-disable-next-line no-console
			console.log(error);
		});
});
// schedule as specified in environment
cron.schedule(process.env.gseJobsSyncProcessingCronSchedule, () => {
	nesoSPSync.SyncGSEJobsListItems()
		// if the promise is resolved with the docs, then respond with the docs as JSON
		.then((result) => {
			// eslint-disable-next-line no-console
			console.log('Processed GSE Jobs Data:');
			// eslint-disable-next-line no-console
			// console.log(result);
		})
		// if the promise is rejected with an error, then respond with the error as JSON
		.catch((error) => {
			// eslint-disable-next-line no-console
			console.log('ERROR - Processing Jobs Data:');
			// eslint-disable-next-line no-console
			console.log(error);
		});
});
// schedule as specified in environment
cron.schedule(process.env.gseSchedulesSyncProcessingCronSchedule, () => {
	nesoSPSync.SyncGSESchedulesListItems()
		// if the promise is resolved with the docs, then respond with the docs as JSON
		.then((result) => {
			// eslint-disable-next-line no-console
			console.log('Processed GSE Schedules Data:');
			// eslint-disable-next-line no-console
			// console.log(result);
		})
		// if the promise is rejected with an error, then respond with the error as JSON
		.catch((error) => {
			// eslint-disable-next-line no-console
			console.log('ERROR - Processing Schedules Data:');
			// eslint-disable-next-line no-console
			console.log(error);
		});
});
// schedule as specified in environment
cron.schedule(process.env.gseSignupsSyncProcessingCronSchedule, () => {
	nesoSPSync.SyncGSESignupsListItems()
		// if the promise is resolved with the docs, then respond with the docs as JSON
		.then((result) => {
			// eslint-disable-next-line no-console
			console.log('Processed GSE Signups Data:');
			// eslint-disable-next-line no-console
			// console.log(result);
		})
		// if the promise is rejected with an error, then respond with the error as JSON
		.catch((error) => {
			// eslint-disable-next-line no-console
			console.log('ERROR - Processing Signups Data:');
			// eslint-disable-next-line no-console
			console.log(error);
		});
});
// schedule for once per day at 2 am
cron.schedule('0 2 * * *', () => {
	// get a promise to empty the tmp directory
	nesoUtilities.EmptyTmpDirectory()
		// if the promise is resolved with the docs, then respond with the docs as JSON
		.then((result) => {
			// eslint-disable-next-line no-console
			console.log('Emptied Tmp Directory:');
			// eslint-disable-next-line no-console
			console.log(result);
		})
		// if the promise is rejected with an error, then respond with the error as JSON
		.catch((error) => {
			// eslint-disable-next-line no-console
			console.log('ERROR - Emptied Tmp Directory:');
			// eslint-disable-next-line no-console
			console.log(error);
		});
});


// DO NOT UNCOMMENT PRIOR TO FINAL RELEASE
// DO NOT UNCOMMENT PRIOR TO FINAL RELEASE
// DO NOT UNCOMMENT PRIOR TO FINAL RELEASE
// DO NOT UNCOMMENT PRIOR TO FINAL RELEASE
// DO NOT UNCOMMENT PRIOR TO FINAL RELEASE
// DO NOT UNCOMMENT PRIOR TO FINAL RELEASE
// DO NOT UNCOMMENT PRIOR TO FINAL RELEASE
// DO NOT UNCOMMENT PRIOR TO FINAL RELEASE
// DO NOT UNCOMMENT PRIOR TO FINAL RELEASE
// DO NOT UNCOMMENT PRIOR TO FINAL RELEASE
// DO NOT UNCOMMENT PRIOR TO FINAL RELEASE
// DO NOT UNCOMMENT PRIOR TO FINAL RELEASE
// DO NOT UNCOMMENT PRIOR TO FINAL RELEASE
// DO NOT UNCOMMENT PRIOR TO FINAL RELEASE
// DO NOT UNCOMMENT PRIOR TO FINAL RELEASE
// DO NOT UNCOMMENT PRIOR TO FINAL RELEASE
// DO NOT UNCOMMENT PRIOR TO FINAL RELEASE


/* // schedule as specified in environment
cron.schedule(process.env.gseScheduleCreditReminderNotificationProcessingSchedule, () => {
// get a promise to process gse schedule credit reminders
	nesoHubEmails.ProcessGSEScheduleCreditReminderNotifications()
	// if the promise is resolved with the docs, then respond with the docs as JSON
		.then((result) => {
		// eslint-disable-next-line no-console
			console.log('Processed GSE Schedule Credit Reminders:');
			// eslint-disable-next-line no-console
			console.log(result);
		})
	// if the promise is rejected with an error, then respond with the error as JSON
		.catch((error) => {
		// eslint-disable-next-line no-console
			console.log('ERROR - Processing GSE Schedule Credit Reminders:');
			// eslint-disable-next-line no-console
			console.log(error);
		});
});
// schedule as specified in environment
cron.schedule(process.env.gseSignupReminderNotificationProcessingSchedule, () => {
// get a promise to process gse signup reminders
	nesoHubEmails.ProcessGSESignupReminderNotifications()
	// if the promise is resolved with the docs, then respond with the docs as JSON
		.then((result) => {
		// eslint-disable-next-line no-console
			console.log('Processed GSE Signup Reminders:');
			// eslint-disable-next-line no-console
			console.log(result);
		})
	// if the promise is rejected with an error, then respond with the error as JSON
		.catch((error) => {
		// eslint-disable-next-line no-console
			console.log('ERROR - Processing GSE Signup Reminders:');
			// eslint-disable-next-line no-console
			console.log(error);
		});
}); */


// DO NOT UNCOMMENT PRIOR TO FINAL RELEASE
// DO NOT UNCOMMENT PRIOR TO FINAL RELEASE
// DO NOT UNCOMMENT PRIOR TO FINAL RELEASE
// DO NOT UNCOMMENT PRIOR TO FINAL RELEASE
// DO NOT UNCOMMENT PRIOR TO FINAL RELEASE
// DO NOT UNCOMMENT PRIOR TO FINAL RELEASE
// DO NOT UNCOMMENT PRIOR TO FINAL RELEASE
// DO NOT UNCOMMENT PRIOR TO FINAL RELEASE
// DO NOT UNCOMMENT PRIOR TO FINAL RELEASE
// DO NOT UNCOMMENT PRIOR TO FINAL RELEASE
// DO NOT UNCOMMENT PRIOR TO FINAL RELEASE
// DO NOT UNCOMMENT PRIOR TO FINAL RELEASE
// DO NOT UNCOMMENT PRIOR TO FINAL RELEASE
// DO NOT UNCOMMENT PRIOR TO FINAL RELEASE
// DO NOT UNCOMMENT PRIOR TO FINAL RELEASE
// DO NOT UNCOMMENT PRIOR TO FINAL RELEASE
// DO NOT UNCOMMENT PRIOR TO FINAL RELEASE


// PROCESS ---

// upon the event of an unhandled promise rejection
process.on('unhandledRejection', (reason, p) => {
	// show some data about unhandled rejection so that it can be found
	// eslint-disable-next-line no-console
	console.log('Unhandled Rejection at: Promise', p, 'reason:', reason);
});

// ----- EXPORT EXPRESS APP

module.exports = app;
