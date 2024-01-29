const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const articleRoutes = require('./routes/articleRoutes');
const port = process.env.PORT || 3000;
const logger = require('./logger');

require('winston').loggers.add(new winston.transports.Console({
  colorize: true,
  prettyPrint: true,
  level: 'silly' // Change this to the desired log level (e.g., info, warn, error)
}));
const logger = require('winston').loggers.get('app');

dotenv.config();

// Middleware
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Routes
app.use('/auth', authRoutes);
app.use('/articles', articleRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// Endpoint de test
app.get('/test', (req, res) => {
  res.status(200).json({ message: 'Backend is running successfully!' });
});


// logger ===================================
app.get('/', (req, res) => {
  logger.info('Request received on the homepage.');
  res.send('Welcome to My Project!');
});

// Handle errors
app.use((err, req, res, next) => {
  logger.error(err.stack);
  res.status(500).send('Something went wrong!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`);
});

// end of logger ===================================
