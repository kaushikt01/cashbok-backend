const { getTotalSpends, addExpense, getSavings, getTotalCreditAmont } = require('../repositories/transactionRepository');

const getDashboardDetails = async (userId) => {

  const totalSpends = await getTotalSpends(userId);
  const totalCredit = await getTotalCreditAmont(userId);
  const savings = await getSavings(userId);

  const balance = {
    total: totalCredit.total - totalSpends.total,
    month: totalCredit.month - totalSpends.month,
    week: totalCredit.week - totalSpends.week,
    today: totalCredit.today - totalSpends.today
  };

  return {
    totalSpends,
    totalCredit,
    balance,
    savings,
  };
};

const postNewExpense = async (userId, amount, description, transaction_date, transaction_code) => {
  const newExpense = await addExpense(userId, amount, description, transaction_date, transaction_code);
  return newExpense;
};

module.exports = {
  getDashboardDetails,
  postNewExpense,
};
