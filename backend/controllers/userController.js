const express = require('express');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const logger = require('winston').loggers.get('app');

// Set up the environment variables from .env file
dotenv.config();

const router = express.Router();

const createUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check if user already exists with the same username
    const existingUser = await User.findOne({ username });

    if (existingUser) {
      return res.status(400).json({ error: 'Username already taken' });
    }

    // Hash the password before saving it to the database
    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = new User({ username, password: hashedPassword });
    const savedUser = await newUser.save();

    logger.info(`Created new user with id ${savedUser._id} and username ${savedUser.username}`); // Log the created user information

    res.status(201).json(savedUser);
  } catch (error) {
    logger.error('Error while creating new user:', error.message); // Log any errors that occur during the operation
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    logger.info(`Retrieved all ${users.length} users`); // Log the number of retrieved users
    res.status(200).json(users);
  } catch (error) {
    logger.error('Error while getting all users:', error.message); // Log any errors that occur during the operation
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getUserById = async (req, res) => {
  const userId = req.params.id;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    logger.info(`Retrieved user with id ${userId}`); // Log the retrieved user id
    res.status(200).json(user);
  } catch (error) {
    logger.error('Error while getting user by id:', error.message); // Log any errors that occur during the operation
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const updateUser = async (req, res) => {
  const userId = req.params.id;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      req.body,
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    logger.info(`Updated user with id ${userId}`); // Log the updated user id
    res.status(200).json(updatedUser);
  } catch (error) {
    logger.error('Error while updating user:', error.message); // Log any errors that occur during the operation
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const deleteUser = async (req, res) => {
  const userId = req.params.id;

  try {
    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    logger.info(`Deleted user with id ${userId}`); // Log the deleted user id
    res.status(200).json(deletedUser);
  } catch (error) {
    logger.error('Error while deleting user:', error.message); // Log any errors that occur during the operation
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

router.post('/', createUser);
router.get('/', getAllUsers);
router.get('/:id', getUserById);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

module.exports = router;
