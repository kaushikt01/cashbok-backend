const userService = require('../services/userService');

const authenticateToken = (req, res, next) => {
  // Extract the token from cookies
  const token = req.cookies.token;

  // If token is not present, return Unauthorized response
  if (!token) {
    return res.sendStatus(401); // Unauthorized
  }

  // Verify the token
  const user = userService.verifyToken(token);
  if (!user) {
    return res.sendStatus(403); // Forbidden
  }

  // Attach the user object to the request
  req.user = user;
  next();
};

module.exports = authenticateToken;
