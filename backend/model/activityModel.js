const db = require('./database');

exports.getAllActivities = () => {
  return new Promise((resolve, reject) => {
    db.all("SELECT * FROM activities", (err, rows) => {
      if (err) {
        return reject(err);
      }
      resolve(rows);
    });
  });
};

exports.createActivity = (activityData) => {
  const { titulo, descricao, dataCadastro,  } = activityData;
  return new Promise((resolve, reject) => {
    db.run(
      "INSERT INTO activities (titulo, descricao, dataCadastro) VALUES (?, ?, DATETIME('now'));",
      [titulo, descricao,dataCadastro],
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

exports.deleteActivity = (id) => {
  return new Promise((resolve, reject) => {
    db.run("DELETE FROM activities WHERE id = ?", [id], function (err) {
      if (err) {
        return reject(err);
      }
      resolve({ message: "Atividade excluída com sucesso" });
    });
  });
};

