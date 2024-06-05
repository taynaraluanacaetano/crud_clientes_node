const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./database.sqlite', { busyTimeout: 10000 });

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT,
    telefone TEXT,
    email TEXT,
    senha TEXT
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS activities (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    titulo TEXT,
    descricao TEXT,
    dataCadastro TEXT,
    cadastradoPor TEXT
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS conteudo (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    titulo TEXT NOT NULL,
    descricao TEXT NOT NULL,
    tipoConteudo TEXT NOT NULL,
    conteudo TEXT NOT NULL,
    dataCadastro TEXT NOT NULL
  )`, (err) => {
    if (err) {
      console.error("Erro ao criar tabela:", err.message);
    } else {
      console.log("Tabela 'conteudos' criada ou já existe.");
    }
  });
});

module.exports = db;
