const knex = require('knex')
const knexfile = require('./knexfile');

const db = knex(knexfile.cockroach_config);
module.exports = db;
