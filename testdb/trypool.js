var mysql = require('mysql');
var pool  = mysql.createPool({
    connectionLimit : 10,
    host            : 'localhost',
    user            : 'web',
    password        : 'Xj/6u4@longe',
    database        : 'long_e'
  });
 
pool.getConnection(function(err, connection) {
 if (err) throw err; // not connected!
 console.log('Connection %d acquired', connection.threadId);
 
  // Use the connection
//   connection.query('INSERT INTO events SET ?', {game_id: 'h55naxx2tw',event_name: '測試新增'}, function (error, results, fields) {
//     if (error) throw error;
//     console.log('新增了一筆', results.insertId);
//     connection.release();
 
//     // Handle error after the release.
//     if (error) throw error;
//     pool.end(function (err) {
//         console.log('Pool end!');
        
//     });
//   });

  connection.query('SELECT *  FROM events where id=?',[16], function (error, results, fields) {
    // When done with the connection, release it.
    console.log("result=", results[0]);
    connection.release();
 
    // Handle error after the release.
    if (error) throw error;
    pool.end(function (err) {
        console.log('Pool end!');
        
    });
 
    // Don't use the connection here, it has been returned to the pool.
  });

  
});



