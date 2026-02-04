const pool = require('../config/db');

// 1. Get All Articles (With Filter & Search)
const getAllArticles = async (req, res) => {
    try {
        const { type, search } = req.query;
        let queryText = 'SELECT * FROM articles';
        let queryParams = [];

        // Filter by Type (Event, Project, etc.)
        if (type) {
            queryText += ' WHERE type = $1';
            queryParams.push(type);
        }

        // Search by Title
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

// 2. Get Single Article
const getArticleById = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query("SELECT * FROM articles WHERE id = $1", [id]);
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
};

// 3. Create Article
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

// 4. Update Article
const updateArticle = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, type, author, content, image_url, tags } = req.body;
        const updateArticle = await pool.query(
            "UPDATE articles SET title = $1, type = $2, author = $3, content = $4, image_url = $5, tags = $6 WHERE id = $7 RETURNING *",
            [title, type, author, content, image_url, tags, id]
        );
        res.json(updateArticle.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
};

// 5. Delete Article
const deleteArticle = async (req, res) => {
    try {
        const { id } = req.params;
        await pool.query("DELETE FROM articles WHERE id = $1", [id]);
        res.json({ message: "Article Deleted" });
    } catch (err) {
        console.error(err.message);
    }
};

module.exports = { 
    getAllArticles, 
    getArticleById, 
    createArticle, 
    updateArticle, 
    deleteArticle 
};
