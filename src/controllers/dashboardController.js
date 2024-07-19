const { getDashboardDetails, postNewExpense } = require('../services/dashboardService');

const getDashboardDetailsController = async (req, res) => {
    const userId = req.user.id;
    try {
        const dashboardDetails = await getDashboardDetails(userId);
        res.json(dashboardDetails);
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "error", error });
    }
};

const postNewDebitController = async (req, res) => {
    const userId = req.user.id;
    const { amount, description, transaction_date } = req.body;

    try {
        const newExpense = await postNewExpense(userId, amount, description, transaction_date, 'DEBIT');
        res.status(201).json(newExpense);
    } catch (error) {
        res.status(500).json({ message: error });
    }
};

const postNewCreditController = async (req, res) => {
    const userId = req.user.id;
    const { amount, description, transaction_date } = req.body;

    try {
        const newExpense = await postNewExpense(userId, amount, description, transaction_date, 'CREDIT');
        res.status(201).json(newExpense);
    } catch (error) {
        res.status(500).json({ message: error });
    }
};

module.exports = {
    getDashboardDetailsController,
    postNewDebitController,
    postNewCreditController
};
