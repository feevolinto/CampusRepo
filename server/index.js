const express = require('express');
const cors = require('cors');
const pool = require('./config/db'); // Import DB for startup check
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// 1. Import Routes
const articleRoutes = require('./routes/articles');
const authRoutes = require('./routes/auth');
const memberRoutes = require('./routes/members');

// 2. Use Routes
// "If URL starts with /articles, send to articleRoutes"
app.use('/articles', articleRoutes);
app.use('/members', memberRoutes);
app.use('/', authRoutes);

// 3. Start Server
const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
    console.log(`\n✅ Server running on port ${PORT}`);

    // PM Check: Verify DB Connection
    try {
        await pool.query('SELECT 1');
        console.log("✅ Database connected successfully");
    } catch (err) {
        console.error("❌ Database failed:", err.message);
    }
});
