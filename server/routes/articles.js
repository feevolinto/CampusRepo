const express = require('express');
const router = express.Router();
const controller = require('../controllers/articleController');
const requireAuth = require('../middleware/authMiddleware');

// Public Routes (Anyone can see)
router.get('/', controller.getAllArticles);
router.get('/:id', controller.getArticleById);

// Protected Routes (Only Admins)
router.post('/', requireAuth, controller.createArticle);
router.put('/:id', requireAuth, controller.updateArticle);
router.delete('/:id', requireAuth, controller.deleteArticle);

module.exports = router;
