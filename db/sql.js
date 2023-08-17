// Create a MySQL connection pool
const mysql = require("mysql2");
const pool = mysql.createPool({
  host: "172.26.0.15",
  user: "engg_testing",
  database: "iot_sim",
  password: "HiEES2023#",
  // waitForConnections: true,
  // connectionLimit: 10,
});

module.exports = pool.promise();
