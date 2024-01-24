// backend/models/Article.js
const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
  // Define the schema for articles based on the data you receive from Builder.io
  // Example: title, description, image, etc.
});

const Article = mongoose.model('Article', articleSchema);

module.exports = Article;
