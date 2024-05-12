const dbService = require('./databaseService');

exports.getAllUsers = () => {
  return dbService.getAllUsers();
};

exports.createUser = (userData) => {
  return dbService.createUser(userData);
};

exports.deleteUser = (userId) => {
  return dbService.deleteUser(userId);
};
