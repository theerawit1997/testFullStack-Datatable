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
  //   console.log(page, per_page);

  const start_index = (page - 1) * per_page;

  // A simple SELECT query
  //   connection.query(
  //     "SELECT * FROM `attractions` LIMIT 0, 10",
  //     function (err, results, fields) {
  //       //   console.log(results);
  //       res.json({ results: results });
  //     }
  //   );

  // execute will internally call prepare and query
  connection.execute(
    "SELECT * FROM `attractions` WHERE 1=1 LIMIT ?, ?",
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
