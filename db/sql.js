// Create a MySQL connection pool
const mysql = require("mysql2");
const pool = mysql.createPool({
  host: "127.0.0.1",
  user: "root",
  database: "test",
  password: "asad8445569754",
  port: 3306,
});

module.exports = pool.promise();
