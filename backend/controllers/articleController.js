const Article = require('../models/Article');

exports.getAllArticles = async (req, res) => {
  try {
    // Fetch all articles from the database
    const articles = await Article.find();

    // Return the list of articles
    res.status(200).json({ articles });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
