const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController.js');
const dashboardController = require('../controllers/dashboardController.js');
const authenticateToken = require('../middleware/authMiddleware.js');

router.post('/register', usersController.register);
router.post('/login', usersController.login);

router.get('/dashboard', authenticateToken, dashboardController.getDashboardDetailsController);
router.post('/expense', authenticateToken, dashboardController.postNewExpenseController);

module.exports = router;
