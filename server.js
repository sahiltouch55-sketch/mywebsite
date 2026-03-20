const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Sahil@123",
  database: "complaint_system"
});

// add complaint
app.post("/add", (req, res) => {
  const { id, name, text, status, date } = req.body;

  db.query(
    "INSERT INTO complaints VALUES (?, ?, ?, ?, ?)",
    [id, name, text, status, date],
    (err) => {
      if (err) return res.send(err);
      res.send("Added successfully");
    }
  );
});

// get complaints
app.get("/all", (req, res) => {
  db.query("SELECT * FROM complaints", (err, result) => {
    if (err) return res.send(err);
    res.json(result);
  });
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
