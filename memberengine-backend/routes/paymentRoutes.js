const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const { processPayment } = require('../controllers/paymentController');

router.post('/pay', auth, processPayment);

module.exports = router;