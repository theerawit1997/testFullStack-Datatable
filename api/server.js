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
  const page = parseInt(req.query.page);
  const per_page = parseInt(req.query.per_page);
  const sort_column = req.query.sort_column;
  const sort_direction = req.query.sort_direction; //ASC or DESC

  const start_index = (page - 1) * per_page;
  var sql = "SELECT * FROM attractions";
  if (sort_column && sort_direction) {
    sql += " ORDER BY " + sort_column + " " + sort_direction;
  }
  sql += " LIMIT?,?";

  // execute will internally call prepare and query
  connection.execute(
    sql,
    [start_index, per_page],
    function (err, results, fields) {
      res.json({ results: results });
      //   console.log(results);
    }
  );
});

app.listen(5000, function () {
  console.log("CORS-enabled web server listening on port 5000");
});
