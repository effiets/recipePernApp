const http = require("http");
const {Pool} = require('pg');
const {user, host, database, portdb} = require('./secrets/db.configuration')




const pool = new Pool({
  user, host, database, portdb
});



module.exports = pool;