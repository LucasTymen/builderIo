// backend/models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  resetPasswordToken: String, // Token for password reset process
  resetPasswordExpires: Date, // Expiration date for the token
  sessions: [// Array to store user's active sessions
    {
      device: String, // e.g., 'desktop', 'mobile', 'tablet'
      ipAddress: String, // User's IP address
      expiresAt: Date, // Session expiration date
    },
  ],
});

const User = mongoose.model('User', userSchema);

module.exports = User;
