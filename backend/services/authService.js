
// authService.js
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const UserModel = require('../models/UserModel');

// Helper functions for hashing and comparing passwords using bcrypt
function hashPassword(password) {
  return new Promise((resolve, reject) => {
    bcrypt.hash(password, 10, (err, hash) => {
      if (err) {
        reject(err);
      } else {
        resolve(hash);
      }
    });
  });
}

function comparePassword(plainTextPassword, hashedPassword) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(plainTextPassword, hashedPassword, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
}

async function registerUser(username, email, password) {
  // Check if the username is already taken
  const user = await UserModel.findOne({ username });

  if (user) {
    throw new Error('Username already exists.');
  }

  // Check if the email is already taken
  const existingUser = await UserModel.findOne({ email });

  if (existingUser) {
    throw new Error('Email address already exists.');
  }

  // Hash the password and create a new user document with hashed password
  const hashedPassword = await hashPassword(password);
  const newUser = new UserModel({
    username,
    email,
    password: hashedPassword,
  });
  await newUser.save();

  return newUser;
}

async function authenticateUser(username, password) {
  // Fetch user from the database by username
  const user = await UserModel.findOne({ username });

  if (!user) {
    throw new Error('Invalid credentials.');
  }

  // Compare the provided password with the stored hashed password
  const isPasswordValid = await comparePassword(password, user.password);

  if (!isPasswordValid) {
    throw new Error('Invalid credentials.');
  }

  // Generate a JWT token and return it as an object for easy parsing in the frontend
  const accessToken = jwt.sign({ username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });

  return { user, accessToken };
}

async function createSession(userId) {
  // Create a new session document for the user
  const newSession = new UserModel({
    _id: userId,
    device: 'desktop', // Replace this with a proper way to get device info
    ipAddress: '127.0.0.1', // Replace this with a proper way to get user's IP address
    expiresAt: new Date(Date.now() + 60 * 60 * 1000), // Session expires in 1 hour
  });

  await newSession.save();

  return { session: newSession };
}

async function updateUserSessions(userId, device, ipAddress) {
  // Find and update the user's sessions with the given device and IP address
  UserModel.findOneAndUpdate(
    { _id: userId },
    { $push: { sessions: { device, ipAddress, expiresAt: new Date() } } },
    { new: true },
  );
}

async function logoutUser(userId) {
  // Remove the user's current session from the database
  UserModel.findOneAndUpdate(
    { _id: userId },
    { $pull: { sessions: { _id: { $exists: true } } } },
    { multi: true },
  );
}

module.exports = {
  registerUser,
  authenticateUser,
  createSession,
  updateUserSessions,
  logoutUser,
};
