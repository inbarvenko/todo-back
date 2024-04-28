const dbConstants = require('../constants');
const pgp = require('pg-promise')();
const db = pgp(`postgres://${dbConstants.user}:${dbConstants.password}@${dbConstants.host}:${dbConstants.port}/${dbConstants.database}`);

module.exports = db;