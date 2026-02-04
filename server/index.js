const express = require('express');
const cors = require('cors');
const pool = require('./config/db'); // <--- IMPORT THE DATABASE HERE
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Import Routes
const articleRoutes = require('./routes/articles');
const authRoutes = require('./routes/auth');
const memberRoutes = require('./routes/members');

// Use Routes
app.use('/articles', articleRoutes);
app.use('/', authRoutes);
app.use('/members', memberRoutes);

const PORT = process.env.PORT || 3000;

// Start Server with PM Check
app.listen(PORT, async () => {
    console.log(`\n✅ Server running on port ${PORT}`);

    try {
        await pool.query('SELECT 1'); // The "Knock Knock" Check
        console.log("✅ Database connected successfully");
    } catch (err) {
        console.error("❌ Database failed:", err.message);
    }
});