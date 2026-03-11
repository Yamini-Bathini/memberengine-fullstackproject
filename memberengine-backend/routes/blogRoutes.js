const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const { createBlog, getMyBlogs } = require('../controllers/blogController');

router.post('/', auth, createBlog);
router.get('/mine', auth, getMyBlogs);

module.exports = router;