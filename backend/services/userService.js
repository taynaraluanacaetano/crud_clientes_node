const dbService = require('./databaseService');

exports.getAllUsers = () => {
  return dbService.getAllUsers();
};

exports.createUser = (userData) => {
  return dbService.createUser(userData)
    .then(createdUser => {
      return createdUser;
    });
};

exports.deleteUser = (userId) => {
  return dbService.deleteUser(userId);
};
