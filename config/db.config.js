const mysql = require("mysql");

// create here mysql connection

const dbConn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "groupomania",
});

dbConn.connect(function() {
  console.log("Database Connected Successfully!!!");
});

/*
  if (Error === "ER_DUP_ENTRY") {
    console.log(Error + "Email or username already in use");
    dbConn;
  }*/
module.exports = dbConn;
