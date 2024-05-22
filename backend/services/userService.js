const userModel = require('../model/userModel');

exports.getAllUsers = () => {
  return userModel.getAllUsers();
};

exports.createUser = async (userData) => {
  const existingUser = await userModel.checkEmailExists(userData.email);
  if (existingUser) {
    throw new Error("E-mail já está em uso");
  }
  return userModel.createUser(userData);
};

exports.deleteUser = (userId) => {
  return userModel.deleteUser(userId);
};

exports.getUserById = (userId) => {
  return userModel.getUserById(userId);
};

exports.updateUser = (userId, userData) => {
  return userModel.updateUser(userId, userData);
};
