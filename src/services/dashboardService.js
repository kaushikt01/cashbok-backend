const { getTotalSpends, getBalance, getExpenses, addExpense } = require('../repositories/transactionRepository');

const getDashboardDetails = async (userId, period) => {
  const currentDate = new Date();
  let startDate;

  switch (period) {
    case 'month':
      startDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
      break;
    case 'week':
      startDate = new Date(currentDate.setDate(currentDate.getDate() - currentDate.getDay()));
      break;
    case 'today':
      startDate = new Date(currentDate.setHours(0, 0, 0, 0));
      break;
    default:
      startDate = new Date(0); // Default to total, start from epoch time
  }

  const totalSpends = await getTotalSpends(userId, startDate);
  const expenses = await getExpenses(userId);
  const savings = await getBalance(userId);
  const balance = balance - expenses;

  return {
    totalSpends,
    balance,
    savings,
  };
};

const postNewExpense = async (userId, amount, description, transaction_date) => {
  const newExpense = await addExpense(userId, amount, description, transaction_date);
  return newExpense;
};

module.exports = {
  getDashboardDetails,
  postNewExpense,
};
