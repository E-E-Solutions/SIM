// Create a MySQL connection pool
const mysql = require("mysql2");
const pool = mysql.createPool({
  host: "server.enggenv.com:8443",
  user: "dmd_back",
  database: "dmd",
  password: "dmdBackPass@123",
  port: 3306,
});

module.exports = pool.promise();
