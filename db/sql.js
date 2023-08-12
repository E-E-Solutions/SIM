// Create a MySQL connection pool
const mysql = require("mysql2");
const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  database: "test",
  password: "asad8445569754",
});

module.exports = pool.promise();
