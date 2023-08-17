// Create a MySQL connection pool
const mysql = require("mysql2");
const pool = mysql.createPool({
  host: "https://172.26.0.15",
  user: "jrDeveloper",
  database: "iot_sim",
  password: "pa$$ofDatabase#123",
  waitForConnections: true,
  connectionLimit: 20,
});

module.exports = pool.promise();
