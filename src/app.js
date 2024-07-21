const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const userRoutes = require('./routes/routes');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const app = express();
app.use(cookieParser());
const PORT = process.env.PORT || 3001;

// Configure CORS
const corsOptions = {
  origin: process.env.CORS_ORIGIN,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  allowedHeaders: 'Content-Type,Authorization',
  credentials: true
};

app.use(cors(corsOptions)); // Use cors middleware

app.use(bodyParser.json());

app.use('/api', userRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
