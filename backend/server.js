// server.js
const express = require('express');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const logger = require('./logger');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.send('Welcome to the backend API!');
});

app.use('/api', userRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// winston configuration --------------------------
app.get('/api/articles', (req, res) => {
  logger.info('GET /api/articles endpoint called');
  // route logic...
  res.json({ message: 'Articles retrieved successfully.' });
});

//  other routes...
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`);
});
// end of winston configuration --------------------
