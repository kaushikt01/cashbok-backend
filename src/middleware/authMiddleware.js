const userService = require('../services/userService');

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader;
  if (token === null) {
    return res.sendStatus(401); // Unauthorized
  }
  const user = userService.verifyToken(token);
  if (!user) {
    return res.sendStatus(403); // Forbidden
  }
  req.user = user;
  next();
};

module.exports = authenticateToken;
