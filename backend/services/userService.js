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

exports.getUserById = (userId)=>{
  return dbService.getUserById(userId);
}

exports.updateUserById = (userId, userData) => {
  return dbService.updateUserById(userId, userData);
};
