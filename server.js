const express = require("express");
const mysql = require("mysql2");

const app = express();
app.use(express.json());

// database connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "2007",
  database: "testdb"
});

// PUT (update)
app.put("/users/:id", (req, res) => {
  const id = req.params.id;
  const { name } = req.body;

  const sql = "UPDATE users SET name = ? WHERE id = ?";
  db.query(sql, [name, id], (err, result) => {
    if (err) return res.status(500).send(err);
    res.send("Update olundu");
  });
});

// DELETE
app.delete("/users/:id", (req, res) => {
  const id = req.params.id;

  const sql = "DELETE FROM users WHERE id = ?";
  db.query(sql, [id], (err, result) => {
    if (err) return res.status(500).send(err);
    res.send("Silindi");
  });
});

app.listen(3000, () => {
  console.log("Server is running...");
});
