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
  const { nome, telefone, email, senha} = req.body;

  db.run(
    "INSERT INTO users (nome, telefone, email, senha) VALUES (?, ?, ?, ?)",
    [nome, telefone, email, senha],
    function (err) {
      if (err) {
        console.error("Erro ao inserir usuário:", err.message);
        return res.status(500).json({ error: "Erro ao inserir usuário" });
      }

      const userId = this.lastID;

      db.get(
        "SELECT id, nome, telefone, email FROM users WHERE id = ?",
        [userId],
        (err, row) => {
          if (err) {
            console.error("Erro ao obter dados do usuário:", err.message);
            return res.status(500).json({ error: "Erro ao obter dados do usuário" });
          }
          console.log("Novo usuário inserido com ID:", userId);
          res.status(201).json(row); 
        }
      );
    }
  );
});


app.get('/users/:id', (req, res)=>{
  const userId = req.params.id; 
  db.get(
    "SELECT * FROM users WHERE id = ?",
    [userId],
    (err, row)=>{
      if(err){
        console.error("Erro ao obter dados do usuário:", err.message);
        return res.status(500).json({ error: "Erro ao obter dados do usuário" });
      }
      
      if (!row) {
        return res.status(404).json({ error: "Usuário não encontrado" });
      }
      
      res.status(200).json(row);
    }
  )
});


app.delete('/users/:id', (req, res) => {
  const userId = req.params.id;

  db.serialize(() => {
    db.run('BEGIN TRANSACTION');
    db.run('DELETE FROM users WHERE id = ?', userId, function(err) {
      if (err) {
        console.error('Erro ao excluir usuário:', err.message);
        db.run('ROLLBACK');
        return res.status(500).json({ error: 'Erro ao excluir usuário' });
      }
      console.log('Usuário excluído com sucesso');
      db.run('COMMIT');
      res.json({ message: 'Usuário excluído com sucesso' });
    });
  });
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});

app.put('/users/:id', (req, res) => {
  const userId = req.params.id;
  const { nome, telefone, email, senha } = req.body;

  db.run(
    'UPDATE users SET nome = ?, telefone = ?, email = ?, senha = ? WHERE id = ?',
    [nome, telefone, email, senha, userId],
    function (err) {
      if (err) {
        console.error('Erro ao atualizar usuário:', err.message);
        return res.status(500).json({ error: 'Erro ao atualizar usuário' });
      }

      db.get(
        'SELECT * FROM users WHERE id = ?',
        [userId],
        (err, row) => {
          if (err) {
            console.error('Erro ao obter dados do usuário atualizado:', err.message);
            return res.status(500).json({ error: 'Erro ao obter dados do usuário atualizado' });
          }

          if (!row) {
            return res.status(404).json({ error: 'Usuário não encontrado' });
          }

          res.status(200).json(row);
        }
      );
    }
  );
});

module.exports = app;
