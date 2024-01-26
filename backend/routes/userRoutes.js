

import express from 'express';
import router from 'express-promise-router';

// Import all controllers at the beginning of the file
import { createUser, getAllUsers, getUserById, updateUser, deleteUser } from '../controllers/users';

const express = require('express');
const routerObject = router();
const router = express.Router();

const {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} = require('../controllers/userController');

// Define routes
router.post('/users', createUser);
router.get('/users', getAllUsers);
router.get('/users/:id', getUserById);
router.put('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);

export default router;

module.exports = router;
