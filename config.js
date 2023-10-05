const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root', // Replace with your MySQL username
  password: 'admin', // Replace with your MySQL password
  database: 'task_manager',
  port: 3306
});

module.exports = connection;
