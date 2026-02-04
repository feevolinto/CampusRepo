const pool = require('../config/db');

// Get All
const getAllArticles = async (req, res) => {
    try {
        const { type, search } = req.query;
        let queryText = 'SELECT * FROM articles';
        let queryParams = [];

        if (type) {
            queryText += ' WHERE type = $1';
            queryParams.push(type);
        }
        if (search) {
            queryText += type ? ' AND' : ' WHERE';
            queryText += ` title ILIKE $${queryParams.length + 1}`;
            queryParams.push(`%${search}%`);
        }
        queryText += ' ORDER BY date_published DESC';
        
        const result = await pool.query(queryText, queryParams);
        res.json(result.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
};

// Create
const createArticle = async (req, res) => {
    try {
        const { title, type, author, content, image_url, tags } = req.body;
        const newArticle = await pool.query(
            "INSERT INTO articles (title, type, author, content, image_url, tags) VALUES($1, $2, $3, $4, $5, $6) RETURNING *",
            [title, type, author, content, image_url, tags]
        );
        res.json(newArticle.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
};

// Export functions
module.exports = { getAllArticles, createArticle };
// (You would add updateArticle and deleteArticle here too...)
