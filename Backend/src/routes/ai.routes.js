const express = require('express');
const router = express.Router();
const aiController = require('../controllers/ai.controller');

// POST /ai/fix-code
router.post('/fix-code', aiController.fixCode);

// POST /ai/review-code
router.post('/review-code', aiController.reviewCode);

module.exports = router;
