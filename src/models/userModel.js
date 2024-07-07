// src/models/userModel.js
const userRepository = require('../repositories/userRepository');

const createUser = async (user) => {
  return await userRepository.createUser(user);
};

const getUserByUsername = async (username) => {
  return await userRepository.getUserByUsername(username);
};

module.exports = {
  createUser,
  getUserByUsername
};
