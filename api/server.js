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
  const search = req.query.search;

  const start_index = (page - 1) * per_page;
  var params = [];
  var sql = "SELECT * FROM attractions";
  if (search) {
    sql += " WHERE name LIKE ?";
    params.push("%" + search + "%");
  }
  if (sort_column && sort_direction) {
    sql += " ORDER BY " + sort_column + " " + sort_direction;
  }
  sql += " LIMIT?,?";
  params.push(start_index);
  params.push(per_page);

  // execute will internally call prepare and query
  connection.execute(sql, params, function (err, results, fields) {
    res.json({ results: results });
    //   console.log(results);
  });
});

app.listen(5000, function () {
  console.log("CORS-enabled web server listening on port 5000");
});
