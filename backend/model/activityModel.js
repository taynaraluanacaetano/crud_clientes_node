const db = require('./database');

exports.getAllActivities = () => {
  return new Promise((resolve, reject) => {
    db.all("SELECT * FROM activities", [], (err, rows) => {
      if (err) {
        return reject(err);
      }
      resolve(rows);
    });
  });
};

exports.getActivityById = (id) => {
  return new Promise((resolve, reject) => {
    db.get("SELECT id, titulo, descricao, dataCadastro FROM activities WHERE id = ?", [id], (err, row) => {
      if (err) {
        return reject(err);
      }

      if (!row) {
        return reject(new Error("Atividade não encontrada"));
      }

      resolve(row);
    });
  });
};

exports.createActivity = (activityData) => {
  const { titulo, descricao } = activityData;
  const dataCadastro = new Date().toISOString();

  return new Promise((resolve, reject) => {
    db.run(
      "INSERT INTO activities (titulo, descricao, dataCadastro) VALUES (?, ?, ?);",
      [titulo, descricao, dataCadastro],
      function (err) {
        if (err) {
          return reject(err);
        }
        db.get("SELECT * FROM activities WHERE id = ?", [this.lastID], (err, row) => {
          if (err) {
            return reject(err);
          }
          resolve(row);
        });
      }
    );
  });
};

exports.updateActivity = (id, updatedData) => {
  const { titulo, descricao } = updatedData;
  return new Promise((resolve, reject) => {
    db.run(
      "UPDATE activities SET titulo = ?, descricao = ? WHERE id = ?",
      [titulo, descricao, id],
      function (err) {
        if (err) {
          return reject(err);
        }

        db.get("SELECT id, titulo, descricao FROM activities WHERE id = ?", [id], (err, row) => {
          if (err) {
            return reject(err);
          }

          if (!row) {
            return reject(new Error("Atividade não encontrada!"));
          }

          resolve(row);
        });
      }
    );
  });
};

exports.deleteActivity = (id) => {
  return new Promise((resolve, reject) => {
    db.run("DELETE FROM activities WHERE id = ?", [id], function (err) {
      if (err) {
        return reject(err);
      }
      resolve({ message: "A atividade foi excluída com sucesso!" });
    });
  });
};