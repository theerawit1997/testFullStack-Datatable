var express = require("express");
var cors = require("cors");
var app = express();

//Callback
// Get the client
const mysql = require("mysql2");

// Create the connection to database
const connection = mysql.createConnection({
  host: "localhost",
  user: "root2",  
  database: "travel",
});

app.use(cors());

app.get("/api/attractions", function (req, res, next) {
  // A simple SELECT query
  connection.query(
    "SELECT * FROM `attractions` LIMIT 0, 10",
    function (err, results, fields) {
      console.log(results);
      res.json({ results: results });
    }
  );
});

app.listen(5000, function () {
  console.log("CORS-enabled web server listening on port 5000");
});
