const mysql = require("mysql2");
var CONFIG = require("../config")[process.env.NODE_ENV];

// create the connection to database
const db1 = mysql.createPool({
  host: CONFIG.db_host1,
  user: CONFIG.db_user,
  database: CONFIG.db_database,
  password: CONFIG.db_password,
  port: CONFIG.db_port,
  charset: "UTF8_GENERAL_CI"
});

const db2 = mysql.createPool({
  host: CONFIG.db_host2,
  user: CONFIG.db_user,
  database: CONFIG.db_database,
  password: CONFIG.db_password,
  port: CONFIG.db_port,
  charset: "UTF8_GENERAL_CI"
});

const query = async (sql, values) => {
  //.then(([rows, fields]) => console.log(rows[0].foo));
  return await db2
    .promise()
    .query(sql, values)
    .then(([rows, fields]) => {
      return rows;
    })
    .catch(err => err.message);
  // return new Promise((resolve, reject) => {
  //   db2.query(sql, values, (err, rows) => {
  //     if (err) {
  //       reject(err);
  //     } else {
  //       resolve(rows);
  //     }
  //     //connection.release()
  //   });
  // });
};

module.exports = { db1, db2, query };
