const db = require('./database');

const removePasswordField = (user) => {
  const { senha, ...userWithoutPassword } = user;
  return userWithoutPassword;
};

exports.getAllUsers = () => {
  return new Promise((resolve, reject) => {
    db.all("SELECT id, nome, telefone, email FROM users", (err, rows) => {
      if (err) {
        return reject(err);
      }
      const usersWithoutPasswords = rows.map(removePasswordField);
      resolve(usersWithoutPasswords);
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
          return reject(err);
        }

        db.get("SELECT id, nome, telefone, email FROM users WHERE id = ?", [this.lastID], (err, row) => {
          if (err) {
            return reject(err);
          }
          resolve(row);
        });
      }
    );
  });
};

exports.getUserById = (id) => {
  return new Promise((resolve, reject) => {
    db.get("SELECT id, nome, telefone, email FROM users WHERE id = ?", [id], (err, row) => {
      if (err) {
        return reject(err);
      }

      if (!row) {
        return reject(new Error("Usuário não encontrado"));
      }

      resolve(removePasswordField(row));
    });
  });
};

exports.deleteUser = (id) => {
  return new Promise((resolve, reject) => {
    db.run("DELETE FROM users WHERE id = ?", [id], function (err) {
      if (err) {
        return reject(err);
      }
      resolve({ message: "Usuário excluído com sucesso" });
    });
  });
};

exports.updateUser = (id, updatedData) => {
  const { nome, telefone, senha } = updatedData;
  return new Promise((resolve, reject) => {
    db.run(
      "UPDATE users SET nome = ?, telefone = ?, senha = ? WHERE id = ?",
      [nome, telefone, senha, id],
      function (err) {
        if (err) {
          return reject(err);
        }

        db.get("SELECT id, nome, telefone, email FROM users WHERE id = ?", [id], (err, row) => {
          if (err) {
            return reject(err);
          }

          if (!row) {
            return reject(new Error("Usuário não encontrado"));
          }

          resolve(removePasswordField(row));
        });
      }
    );
  });
};

exports.checkEmailExists = (email) => {
  return new Promise((resolve, reject) => {
    db.get("SELECT * FROM users WHERE email = ?", [email], (err, user) => {
      if (err) {
        return reject(err);
      }
      resolve(user);
    });
  });
};
