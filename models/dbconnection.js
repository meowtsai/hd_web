var mysql = require('mysql');

var config = require('../config')[process.env.NODE_ENV];


var connection = mysql.createConnection({
    host: config.db_host1,
    port: config.db_port,
    user: config.db_user,
    password: config.db_password,
    database: config.db_database,
    insecureAuth: config.db_insecureAuth
});

connection.connect();

module.exports = connection

