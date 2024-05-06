const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./database.sqlite", { busyTimeout: 10000 });

exports.getAllUsers = () => {
  return new Promise((resolve, reject) => {
    db.all("SELECT * FROM users", (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
};

exports.createUser = (userData) => {
  const { nome, telefone, email, senha } = userData;
  return new Promise((resolve, reject) => {
    db.run(
      "INSERT INTO users (nome, telefone, email, senha) VALUES (?, ?, ?, ?)",
      [nome, telefone, email, senha],
      function (err) {
        if (err) {
          reject(err);
        } else {
          console.log("Novo usuário inserido com ID:", this.lastID);
          resolve();
        }
      }
    );
  });
};

exports.deleteUser = (userId) => {
  return new Promise((resolve, reject) => {
    db.run("DELETE FROM users WHERE id = ?", userId, function (err) {
      if (err) {
        reject(err);
      } else {
        console.log("Usuário excluído com sucesso");
        resolve();
      }
    });
  });
};

exports.getUserById = (userId) => {
  return new Promise((resolve, reject) => {
    db.run("SELECT FROM users WHERE id = ?", userId, function (err) {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
};

exports.updateUser = (req, res) => {
  const userId = req.params.id;
  const userData = req.body;
  userService.updateUserById(userId, userData)
    .then(updatedUser => {
      res.status(200).json(updatedUser);
    })
    .catch(err => {
      console.error('Erro ao atualizar usuário:', err.message);
      res.status(500).json({ error: 'Erro ao atualizar usuário' });
    });
};
