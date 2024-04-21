const express = require("express");
const bodyParser = require("body-parser");
const sqlite3 = require("sqlite3").verbose();
const cors = require("cors");

const app = express();
const port = 3000;
app.use(cors());
app.use(bodyParser.json());

const db = new sqlite3.Database("./database.sqlite", { busyTimeout: 10000 });

db.run(`CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nome TEXT,
  telefone TEXT,
  email TEXT,
  senha TEXT
)`);

app.get("/users", (req, res) => {
  db.all("SELECT * FROM users", (err, rows) => {
    if (err) {
      console.error("Erro ao carregar usuários:", err.message);
      return res.status(500).json({ error: "Erro ao carregar usuários" });
    }
    res.json(rows);
  });
});

app.post("/users", (req, res) => {
  const { nome, telefone, email, senha } = req.body;

  db.run(
    "INSERT INTO users (nome, telefone, email, senha) VALUES (?, ?, ?, ?)",
    [nome, telefone, email, senha],
    function (err) {
      if (err) {
        console.error("Erro ao inserir usuário:", err.message);
        return res.status(500).json({ error: "Erro ao inserir usuário" });
      }
      console.log("Novo usuário inserido com ID:", this.lastID);
      res.status(201).json({ message: "Usuário criado com sucesso" });
    }
  );
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
