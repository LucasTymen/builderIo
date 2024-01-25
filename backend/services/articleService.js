// articleService.js
const Article = require('../models/Article'); // Assuming you have an Article model

const articleService = {
  create: async (req, res) => {
    try {
      const article = new Article(req.body); // Create a new article instance based on request body
      await article.save(); // Save the article to the database
      res.status(201).json(article);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  findAll: async (req, res) => {
    try {
      const articles = await Article.find(); // Fetch all articles from the database
      res.json(articles);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  findOne: async (req, res) => {
    try {
      const article = await Article.findById(req.params.id); // Fetch an article by its id from the database
      if (!article) throw new Error('Article not found');
      res.json(article);
    } catch (error) {
      console.error(error);
      res.status(404).json({ message: 'Article not found' });
    }
  },

  update: async (req, res) => {
    try {
      const article = await Article.findByIdAndUpdate(
        req.params.id, // Article id to be updated
        req.body, // New data for the article
        { new: true } // Return the updated article instance instead of the old one
      );

      if (!article) throw new Error('Article not found');
      res.json(article);
    } catch (error) {
      console.error(error);
      res.status(404).json({ message: 'Article not found' });
    }
  },

  delete: async (req, res) => {
    try {
      const article = await Article.findByIdAndDelete(req.params.id); // Delete an article by its id from the database

      if (!article) throw new Error('Article not found');
      res.status(204).json({ message: 'Article deleted' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },
};

module.exports = articleService;
