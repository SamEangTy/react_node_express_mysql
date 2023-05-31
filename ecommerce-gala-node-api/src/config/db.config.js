const mysql = require("mysql")
const util = require("util")

require('dotenv').config();

const db = mysql.createConnection({
    host : "localhost",
    user : "root",
    password : "",
    database : "ecm_backend_g1"

    // host : process.env.HOST,
    // user : process.env.USER,
    // password : process.env.PASSWORD,
    // database :  process.env.DATABASE,
})

// promise wrapper to enable async await with MYSQL
// https://medium.com/fullstackwebdev/a-guide-to-mysql-with-node-js-fc4f6abce33b
db.query = util.promisify(db.query).bind(db);

// connect to the database
db.connect(function(err){
    if (err) {
        console.log("error connecting: " + err.stack);
        return;
    };
    console.log("connected as... " + db.threadId);
});

module.exports = db