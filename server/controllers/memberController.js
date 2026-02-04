// server/controllers/memberController.js
const pool = require('../config/db');

const getAllMembers = async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM members ORDER BY id ASC");
        res.json(result.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
};

module.exports = { getAllMembers };