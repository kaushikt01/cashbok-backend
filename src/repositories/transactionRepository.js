const pool = require('../config/db');

const getTotalSpends = async (userId) => {
    try {
        const result = await pool.query(
            `SELECT
            SUM(amount) as total_spends ,
           SUM(amount) FILTER (WHERE transaction_date >= date_trunc('month', current_date) AND transaction_date < date_trunc('month', current_date) + interval '1 month') as total_spends_month,
           SUM(amount) FILTER (WHERE transaction_date >= date_trunc('week', current_date) AND transaction_date < date_trunc('week', current_date) + interval '1 week') as total_spends_week,
           SUM(amount) FILTER (WHERE transaction_date = current_date) as total_spends_today
         FROM transactions
         WHERE user_id = $1 
         AND transaction_code = \'DEBIT\'`,
            [userId]
        );

        return {
            total: result.rows[0].total_spends || 0,
            month: result.rows[0].total_spends_month || 0,
            week: result.rows[0].total_spends_week || 0,
            today: result.rows[0].total_spends_today || 0
        };
    } catch (error) {
        console.error('Error executing query', error);
        throw error;
    }
};

const getTotalCreditAmont = async (userId) => {
    try {
        const result = await pool.query(
            `SELECT
            SUM(amount) as total_spends ,
           SUM(amount) FILTER (WHERE transaction_date >= date_trunc('month', current_date) AND transaction_date < date_trunc('month', current_date) + interval '1 month') as total_spends_month,
           SUM(amount) FILTER (WHERE transaction_date >= date_trunc('week', current_date) AND transaction_date < date_trunc('week', current_date) + interval '1 week') as total_spends_week,
           SUM(amount) FILTER (WHERE transaction_date = current_date) as total_spends_today
         FROM transactions
         WHERE user_id = $1 
         AND transaction_code = \'CREDIT\'`,
            [userId]
        );

        return {
            total: result.rows[0].total_spends || 0,
            month: result.rows[0].total_spends_month || 0,
            week: result.rows[0].total_spends_week || 0,
            today: result.rows[0].total_spends_today || 0
        };
    } catch (error) {
        console.error('Error executing query', error);
        throw error;
    }
};

const getSavings = async (userId) => {
    const result = await pool.query(
        'SELECT SUM(amount) as balance FROM transactions WHERE user_id = $1 AND transaction_code = \'saving\'',
        [userId]
    );
    return result.rows[0].balance || 0;
};

const addExpense = async (userId, amount, description, transaction_date, transaction_code) => {
    try {
        const result = await pool.query(
            'INSERT INTO transactions (user_id, amount, description, transaction_date, transaction_code) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [userId, amount, description, transaction_date, transaction_code]
        );
        const response = {
            message: "Transaction successful"
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
    getTotalCreditAmont,
    addExpense,
};
