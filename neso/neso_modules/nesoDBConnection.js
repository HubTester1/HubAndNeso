
// ----- PULL IN MODULES

const monk = require('monk');


// ----- EXPORT DB CONNECTION

module.exports = monk(`${process.env.dbUser}:${process.env.dbPass}@${process.env.dbHost}:${process.env.dbPort}/${process.env.dbName}`);
