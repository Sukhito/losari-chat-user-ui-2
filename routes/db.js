var mysql = require('mysql');

var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "101089",
    database : "losari"
  });
  

connection.connect(function(err) {
    if (err) throw err;
});

module.exports = connection;