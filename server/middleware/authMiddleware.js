const requireAuth = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (authHeader === 'fake-jwt-token') {
        next();
    } else {
        res.status(401).json({ message: "Access Denied: Please Log In" });
    }
};

module.exports = requireAuth;
