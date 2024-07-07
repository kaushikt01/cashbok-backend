const pool = require('../config/db');

const createUser = async (user) => {
  const client = await pool.connect();
  try {
    const { username, password, email } = user;
    const res = await client.query(
      'INSERT INTO users (username, password, email) VALUES ($1, $2, $3) RETURNING *',
      [username, password, email]
    );
    return res.rows[0];
  } finally {
    client.release();
  }
};

const getUserByUsername = async (username) => {
  const client = await pool.connect();
  try {
    const res = await client.query(
      'SELECT * FROM users WHERE username = $1',
      [username]
    );
    return res.rows[0];
  } finally {
    client.release();
  }
};

module.exports = {
  createUser,
  getUserByUsername
};
