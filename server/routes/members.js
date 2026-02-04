const express = require('express');
const router = express.Router();
const controller = require('../controllers/memberController');

// Public Route
router.get('/', controller.getAllMembers);

module.exports = router;
