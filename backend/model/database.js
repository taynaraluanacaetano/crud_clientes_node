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
});

module.exports = db;
