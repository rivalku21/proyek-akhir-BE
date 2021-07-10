require('dotenv').config({ path: ".env" });
let mysql = require("mysql");
const { DB_HOST, DB_USERNAME, DB_PASSWORD, DB_NAME } = process.env;

let connection = mysql.createConnection({
    host: DB_HOST,
    user: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_NAME
});

connection.connect(function(err) {
    if (err) {
        console.log(err);
    }
    else {
        console.log("Conected on " + DB_NAME + " database");
    }
});

module.exports = connection;


