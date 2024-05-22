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
  const { title, description } = activityData;
  return new Promise((resolve, reject) => {
    db.run(
      "INSERT INTO activities (title, description) VALUES (?, ?)",
      [title, description],
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



