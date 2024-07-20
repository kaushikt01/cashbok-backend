const userService = require('../services/userService');

const register = async (req, res) => {
  try {
    const user = await userService.registerUser(req.body);
    res.status(201).json({ message: 'Registration successful', user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const result = await userService.loginUser(username, password);

    //setting tocken inside cookies
    // secure: true for HTTPS
    res.cookie('token', result?.token, { httpOnly: false, secure: true, sameSite: 'Strict' });

    if (result) {
      res.status(200).json({ message: 'Login successful' });
    } else {
      res.status(401).json({ message: 'Invalid username or password' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const logout = (req, res) => {
  // Clear the authentication cookie
  res.clearCookie('token', {
    httpOnly: false,
    secure: true, // Only for HTTPS in production
    sameSite: 'Strict', // Helps prevent CSRF
  });
  
  // Send a response indicating successful logout
  res.status(200).json({ message: 'Logged out successfully' });
};

module.exports = {
  register,
  login,
  logout
};
