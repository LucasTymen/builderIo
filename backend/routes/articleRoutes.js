
const express = require('express');
const router = express.Router();
const articleController = require('../controllers/articleController');

// Route to get all articles
router.get('/', articleController.getAllArticles);

module.exports = router;
