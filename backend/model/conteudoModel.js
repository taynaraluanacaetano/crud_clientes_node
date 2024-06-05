const db = require("./database");

exports.getAllConteudos = () => {
  return new Promise((resolve, reject) => {
    db.all("SELECT * FROM conteudo", [], (err, rows) => {
      if (err) {
        return reject(err);
      }
      resolve(rows);
    });
  });
};

exports.getConteudoById = (id) => {
  return new Promise((resolve, reject) => {
    db.get(
      "SELECT id, titulo, descricao, tipoConteudo, conteudo, dataCadastro FROM conteudo WHERE id = ?",
      [id],
      (err, row) => {
        if (err) {
          return reject(err);
        }

        if (!row) {
          return reject(new Error("Conteúdo não encontrado!"));
        }

        resolve(row);
      }
    );
  });
};

function executeWithRetry(sql, params, retries = 5) {
  return new Promise((resolve, reject) => {
    const attempt = (retryCount) => {
      db.run(sql, params, function (err) {
        if (err) {
          if (err.code === "SQLITE_BUSY" && retryCount > 0) {
            console.log(`Database is busy. Retrying... (${retryCount})`);
            setTimeout(() => attempt(retryCount - 1), 100);
          } else {
            reject(err);
          }
        } else {
          resolve(this);
        }
      });
    };
    attempt(retries);
  });
}

exports.createConteudo = (conteudoData) => {
  const { titulo, descricao, tipoConteudo, conteudo } = conteudoData;
  const dataCadastro = new Date().toISOString();
  const sql = `INSERT INTO conteudo (titulo, descricao, tipoConteudo, conteudo, dataCadastro)
                 VALUES (?, ?, ?, ?, ?)`;
  const params = [titulo, descricao, tipoConteudo, conteudo, dataCadastro];
  return executeWithRetry(sql, params)
    .then((result) => {
      return {
        id: result.lastID,
        titulo,
        descricao,
        tipoConteudo,
        conteudo,
        dataCadastro
      };
    });
};

exports.updateConteudo = (id, updatedData) => {
  const { titulo, descricao, tipoConteudo, conteudo } = updatedData;
  return new Promise((resolve, reject) => {
    db.run(
      "UPDATE conteudo SET titulo = ?, descricao = ?, tipoConteudo = ?, conteudo = ? WHERE id = ?",
      [titulo, descricao, tipoConteudo, conteudo, id],
      function (err) {
        if (err) {
          return reject(err);
        }

        db.get(
          "SELECT id, titulo, descricao, tipoConteudo, conteudo FROM conteudo WHERE id = ?",
          [id],
          (err, row) => {
            if (err) {
              return reject(err);
            }

            if (!row) {
              return reject(new Error("Conteúdo não encontrado!"));
            }

            resolve(row);
          }
        );
      }
    );
  });
};

exports.deleteConteudo = (id) => {
  return new Promise((resolve, reject) => {
    db.run("DELETE FROM conteudo WHERE id = ?", [id], function (err) {
      if (err) {
        return reject(err);
      }
      if (this.changes === 0) {
        return reject(new Error("Conteúdo não encontrado!"));
      }
      resolve();
    });
  });
};