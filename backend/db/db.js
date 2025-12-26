const mysql = require("mysql2");

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "root",
  database: "otp",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

console.log("MySQL pool created"); 

module.exports = db;
