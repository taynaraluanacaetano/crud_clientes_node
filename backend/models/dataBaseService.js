const User = require('../models/User');

exports.createUser = (userData) => {
  return User.create(userData);
};

exports.getAllUsers = () => {
  return User.find();
};

exports.deleteUser = (userId) => {
  return User.findByIdAndDelete(userId);
};

exports.getUserById = (userId) => {
  return User.findById(userId);
};

exports.updateUser = (userId, userData) => {
  return User.findByIdAndUpdate(userId, userData, { new: true });
};
