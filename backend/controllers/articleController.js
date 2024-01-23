const Article = require('../models/Article');
const sampleArticles = require('../data/sampleArticles');


exports.getAllArticles = async (req, res) => {
  try {
    // Fetch all articles from the database
    const articles = sampleArticles.results[0].data.articles;

    // Return the list of articles
    res.status(200).json({ articles });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
