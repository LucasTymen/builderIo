const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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

UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;
