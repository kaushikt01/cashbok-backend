const pool = require('../config/db');

const getTotalSpends = async (userId, startDate) => {
    const result = await pool.query(
        'SELECT SUM(amount) as total_spends FROM transactions WHERE user_id = $1 AND transaction_date >= $2',
        [userId, startDate]
    );
    return result.rows[0].total_spends || 0;
};

const getSavings = async (userId) => {
    const result = await pool.query(
        'SELECT SUM(amount) as balance FROM transactions WHERE user_id = $1 AND transaction_type = \'saving\'',
        [userId]
    );
    return result.rows[0].balance || 0;
};

const getExpenses = async (userId) => {
    const result = await pool.query(
        'SELECT SUM(amount) as expense FROM transactions WHERE user_id = $1 AND transaction_type = \'expense\'',
        [userId]
    );
    return result.rows[0].expense || 0;
};

const addExpense = async (userId, amount, description, transaction_date) => {
    try {
        const result = await pool.query(
            'INSERT INTO transactions (user_id, amount, description, transaction_date, transaction_code) VALUES ($1, $2, $3, $4, \'expense\') RETURNING *',
            [userId, amount, description, transaction_date]
        );
        const response = {
            message: "expense added successfully"
        }
        return response;
    } catch (error) {
        console.error('Error executing query', error);
        throw error;
    }
};


module.exports = {
    getTotalSpends,
    getSavings,
    getExpenses,
    addExpense,
};
