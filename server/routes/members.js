const express = require('express');
const router = express.Router();
const controller = require('../../server/controllers/memberController');

// Public
router.get('/', controller.getAllMembers);

module.exports = router;
