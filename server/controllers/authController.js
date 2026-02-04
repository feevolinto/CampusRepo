const pool = require('../config/db');

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const result = await pool.query("SELECT * FROM admins WHERE email = $1", [email]);

        // User not found
        if (result.rows.length === 0) {
            return res.status(401).json({ message: "User not found" });
        }

        // Verify Password
        const admin = result.rows[0];
        if (admin.password === password) {
            res.json({ success: true, token: "fake-jwt-token" });
        } else {
            res.status(401).json({ message: "Invalid Password" });
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
};

module.exports = { login };
