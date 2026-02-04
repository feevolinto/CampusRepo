// File: server/index.js

// 1. IMPORT TOOLS
const express = require('express');  // The Web Server Framework
const cors = require('cors');        // Security rules
const { Pool } = require('pg');      // Database Connector
require('dotenv').config();          // Load the .env file

// 2. SETUP APP
const app = express();
app.use(cors());                     // Allow Frontend to talk to us
app.use(express.json());             // IMPORTANT: Allows reading JSON from requests

// === SECURITY MIDDLEWARE ===
// This function runs before the main route handler
const requireAuth = (req, res, next) => {
    // Get the token from the "Authorization" header
    const authHeader = req.headers['authorization'];

    // Check if it matches the token we give out during Login
    if (authHeader === 'fake-jwt-token') {
        next(); // Success! Go to the next function (the route)
    } else {
        res.status(401).json({ message: "Access Denied: Please Log In" });
    }
};

// 3. CONNECT TO DATABASE
const pool = new Pool({
    connectionString: process.env.DATABASE_URL, // Read from .env
    ssl: { rejectUnauthorized: false }          // Required for Neon
});

// GET /articles
app.get('/articles', async (req, res) => {
    try {
        // req.query holds the stuff after the '?' in URL (e.g. ?type=Event)
        const { type, search } = req.query;

        let queryText = 'SELECT * FROM articles';
        let queryParams = [];

        // If user asked for a specific Type...
        if (type) {
            queryText += ' WHERE type = $1'; // $1 is a placeholder
            queryParams.push(type);          // Fill $1 with the actual type
        }

        // If user searched for a Title...
        if (search) {
            // If we already filtered by type, use 'AND', else use 'WHERE'
            queryText += type ? ' AND' : ' WHERE';
            // ILIKE means "Case Insensitive" search
            queryText += ` title ILIKE $${queryParams.length + 1}`;
            queryParams.push(`%${search}%`); // % matches anything before/after
        }

        // Always sort by newest
        queryText += ' ORDER BY date_published DESC';

        // Run the query
        const result = await pool.query(queryText, queryParams);
        res.json(result.rows); // Send the list back
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

// GET /articles/:id
app.get('/articles/:id', async (req, res) => {
    try {
        const { id } = req.params; // params gets the ':id' from the URL
        const result = await pool.query("SELECT * FROM articles WHERE id = $1", [id]);
        res.json(result.rows[0]); // Send the first (and only) result
    } catch (err) {
        console.error(err.message);
    }
});

// GET /members
app.get('/members', async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM members ORDER BY id ASC");
        res.json(result.rows);
    } catch (err) {
        console.error(err.message);
    }
});

// POST /login (Database Version)
app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // 1. Ask the Database: "Find me an admin with this email"
        const result = await pool.query(
            "SELECT * FROM admins WHERE email = $1", 
            [email]
        );

        // 2. Check if user exists
        if (result.rows.length === 0) {
            return res.status(401).json({ success: false, message: "User not found" });
        }

        const admin = result.rows[0]; // The first result found

        // 3. Check if password matches
        if (admin.password === password) {
            // Success! Give them the badge.
            res.json({ success: true, token: "fake-jwt-token" });
        } else {
            // Wrong password
            res.status(401).json({ success: false, message: "Invalid Password" });
        }

    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

// POST /articles
app.post('/articles', requireAuth, async (req, res) => {
    try {
        // Get all these fields from the Frontend
        const { title, type, author, content, image_url, tags } = req.body;

        const newArticle = await pool.query(
            "INSERT INTO articles (title, type, author, content, image_url, tags) VALUES($1, $2, $3, $4, $5, $6) RETURNING *",
            [title, type, author, content, image_url, tags]
        );

        res.json(newArticle.rows[0]); // Send back the new item
    } catch (err) {
        console.error(err.message);
    }
});

// DELETE /articles/:id
app.delete('/articles/:id', requireAuth, async (req, res) => {
    try {
        const { id } = req.params;
        await pool.query("DELETE FROM articles WHERE id = $1", [id]);
        res.json({ message: "Article Deleted" });
    } catch (err) {
        console.error(err.message);
    }
});

// PUT /articles/:id
app.put('/articles/:id', requireAuth, async (req, res) => {
    try {
        const { id } = req.params;
        const { title, type, author, content, image_url, tags } = req.body;

        const updateArticle = await pool.query(
            // UPDATE [table] SET [col1] = $1... WHERE id = [target]
            "UPDATE articles SET title = $1, type = $2, author = $3, content = $4, image_url = $5, tags = $6 WHERE id = $7 RETURNING *",
            [title, type, author, content, image_url, tags, id]
        );

        res.json(updateArticle.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});


// 4. TEST ROUTE
app.get('/', (req, res) => {
    res.send("Backend is running!");
});

// 5. START SERVER
const PORT = 3000;

app.listen(PORT, async () => {
    console.log(`\n✅ Server is running on port ${PORT}`);

    // The "Knock Knock" Check
    try {
        await pool.query('SELECT 1'); // Asks the DB "Are you there?"
        console.log("✅ Database connected successfully");
    } catch (err) {
        console.error("❌ Database failed:", err.message);
    }
});
