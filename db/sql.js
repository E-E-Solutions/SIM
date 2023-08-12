// Create a MySQL connection pool
const mysql = require("mysql2");
const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  database: "sim",
  password: "ammat00000",
});

module.exports = pool.promise();
