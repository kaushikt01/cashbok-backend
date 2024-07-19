const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController.js');
const dashboardController = require('../controllers/dashboardController.js');
const authenticateToken = require('../middleware/authMiddleware.js');

router.post('/register', usersController.register);
router.post('/login', usersController.login);

router.get('/dashboard', authenticateToken, dashboardController.getDashboardDetailsController);
router.post('/debit', authenticateToken, dashboardController.postNewDebitController);
router.post('/credit', authenticateToken, dashboardController.postNewCreditController);

module.exports = router;
