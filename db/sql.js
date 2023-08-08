// Create a MySQL connection pool
const mysql = require("mysql2");
const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  database: "test",
  password: process.env.DB_PASSWORD,
});

module.exports = pool.promise();
