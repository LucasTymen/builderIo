// config/db.js
const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useCreateIndex: true,
      useNewUrlParser: true, // Deprecated but still required for MongoDB versions before 3.1.0
      useUnifiedTopology: true, // Deprecated but still required for MongoDB versions before 3.1.0
    });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
};

module.exports = connectDB;
