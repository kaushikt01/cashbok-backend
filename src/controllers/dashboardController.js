const { getDashboardDetails, postNewExpense } = require('../services/dashboardService');

// Controller to get dashboard details
const getDashboardDetailsController = async (req, res) => {
    const userId = req.user.id;
    try {
        const dashboardDetails = await getDashboardDetails(userId);
        res.json(dashboardDetails);
    } catch (error) {
        console.error('Error fetching dashboard details:', error);
        res.status(500).json({ message: 'Failed to fetch dashboard details', error: error.message });
    }
};

// Controller to post a new debit expense
const postNewDebitController = async (req, res) => {
    const userId = req.user.id;
    const { amount, description, transaction_date } = req.body;

    try {
        const newExpense = await postNewExpense(userId, amount, description, transaction_date, 'DEBIT');
        res.status(201).json(newExpense);
    } catch (error) {
        console.error('Error posting new debit expense:', error);
        res.status(500).json({ message: 'Failed to post new debit expense', error: error.message });
    }
};

// Controller to post a new credit expense
const postNewCreditController = async (req, res) => {
    const userId = req.user.id;
    const { amount, description, transaction_date } = req.body;

    try {
        const newExpense = await postNewExpense(userId, amount, description, transaction_date, 'CREDIT');
        res.status(201).json(newExpense);
    } catch (error) {
        console.error('Error posting new credit expense:', error);
        res.status(500).json({ message: 'Failed to post new credit expense', error: error.message });
    }
};

module.exports = {
    getDashboardDetailsController,
    postNewDebitController,
    postNewCreditController
};
