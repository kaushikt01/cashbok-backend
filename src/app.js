// src/app.js
const express = require('express');
const bodyParser = require('body-parser');
// const transactionRoutes = require('./routes/transactionRoutes');
const userRoutes = require('./routes/userRoutes');
// const dashboardRoutes = require('./routes/dashboardRoutes');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(bodyParser.json());

// app.use('/api', transactionRoutes);
app.use('/api', userRoutes);
// app.use('/api', dashboardRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
