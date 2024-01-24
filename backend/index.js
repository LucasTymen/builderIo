const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const articleRoutes = require('./routes/articleRoutes');
const port = process.env.PORT || 3000;

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
