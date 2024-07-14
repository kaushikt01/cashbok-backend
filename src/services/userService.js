const userModel = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const registerUser = async (user) => {
  const hashedPassword = await bcrypt.hash(user.password, 10);
  user.password = hashedPassword;
  return await userModel.createUser(user);
};

const loginUser = async (username, password) => {
  const user = await userModel.getUserByUsername(username);
  if (user && await bcrypt.compare(password, user.password)) {
    const token = jwt.sign(
      { id: user.id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRATION }
    );
    return { token };
  }
  return null;
};

const verifyToken = (token) => {
  try {

    if (!token) {
      console.error('Token is missing');
      return null;
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    return decodedToken;
  } catch (err) {
    console.error('Token verification failed:', err.message);
    return null;
  }
};

module.exports = {
  registerUser,
  loginUser,
  verifyToken
};
