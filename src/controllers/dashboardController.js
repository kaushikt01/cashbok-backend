const { getDashboardDetails, postNewExpense } = require('../services/dashboardService');

const getDashboardDetailsController = async (req, res) => {
    const { userId } = req.user;
    const { period } = req.query;

    try {
        const dashboardDetails = await getDashboardDetails(userId, period);
        res.json(dashboardDetails);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

const postNewExpenseController = async (req, res) => {
    const userId = req.user.id;
    const { amount, description, transaction_date } = req.body;

    try {
        const newExpense = await postNewExpense(userId, amount, description, transaction_date);
        res.status(201).json(newExpense);
    } catch (error) {
        res.status(500).json({ message: error });
    }
};

module.exports = {
    getDashboardDetailsController,
    postNewExpenseController,
};
