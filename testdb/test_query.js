const connection = require('../models/dbconnection'); 

var selQuery = connection.query('SELECT email,create_time  FROM event_preregister where event_id=? and email=?',[16, 'shihfantsai@gmail.com'], function (error, results, fields) {
    
    if (results===undefined) {
        console.log("result=", "undefined");
    }
    else {
        console.log("result=", results);
    }
    connection.end();
});

console.log("selQuery=", selQuery.sql);