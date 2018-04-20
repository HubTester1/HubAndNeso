
const dotenv = require('dotenv');

dotenv.config({ path: './.env' });

module.exports = {
	ReturnGulpSPSaveCredentials: () => 
		({
			username: process.env.spUser,
			password: process.env.spPassword,
		}),
};
