// Create a MySQL connection pool
const mysql = require("mysql2");
const pool = mysql.createPool({
  host: "172.26.0.15",
  user: "user:jrDeveloper",
  database: "iot_sim",
  password: "pa$$ofDatabase#123",
});

module.exports = pool.promise();
