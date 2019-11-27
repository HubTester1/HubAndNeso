// ----- PULL IN DOTENV MODULE TO CONFIG ENVIRONMENT

const dotenv = require('dotenv');

dotenv.config({ path: './dotenv.env' });

// ----- PULL IN MODULES

const { createServer } = require('https');
const { parse } = require('url');
const next = require('next');
const fs = require('fs');

const dev = process.env.use !== 'prod';
const app = next({ dev });
const handle = app.getRequestHandler();

// get SSL key, certificate as an object
const options = {
	key: fs.readFileSync(process.env.sslKey),
	cert: fs.readFileSync(process.env.sslCert),
};

app.prepare().then(() => {
	createServer(options, (req, res) => {
		const parsedUrl = parse(req.url, true);
		handle(req, res, parsedUrl);
	}).listen(process.env.httpsPort, (err) => {
		if (err) throw err;
		// eslint-disable-next-line no-console
		console.log(`SSL Next server running on port ${process.env.httpsPort}`);
	});
});
