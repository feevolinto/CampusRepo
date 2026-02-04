const requireAuth = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    
    // Check if token matches our secret
    if (authHeader === 'fake-jwt-token') {
        next(); // Allow access
    } else {
        res.status(401).json({ message: "Access Denied: Please Log In" });
    }
};

module.exports = requireAuth;
