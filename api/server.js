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
  var countSql = "SELECT COUNT(id) as total FROM attractions";

  if (search) {
    sql += " WHERE name LIKE ?";
    countSql += " WHERE name LIKE ?";
    params.push("%" + search + "%");
  }

  if (sort_column && sort_direction) {
    sql += " ORDER BY " + sort_column + " " + sort_direction;
  }

  sql += " LIMIT ?, ?";
  params.push(start_index);
  params.push(per_page);

  // execute will internally call prepare and query
  connection.execute(sql, params, function (err, results, fields) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    // query total with search criteria
    connection.query(countSql, params, function (err, count, fields) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      const total = count[0]["total"];
      const total_page = Math.ceil(total / per_page);

      res.json({
        page: page,
        per_page: per_page,
        total: total,
        total_page: total_page,
        data: results,
      });
    });
  });
});

app.listen(5000, function () {
  console.log("CORS-enabled web server listening on port 5000");
});
