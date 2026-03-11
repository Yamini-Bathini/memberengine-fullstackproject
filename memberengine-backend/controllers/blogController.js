const db = require('../db');

exports.createBlog = async (req, res) => {
    const { title, content, isFeatured } = req.body;

    const [userRows] = await db.execute(
        'SELECT plan FROM users WHERE id = ?',
        [req.user.id]
    );

    const userPlan = userRows[0].plan;

    const [countRows] = await db.execute(
        'SELECT COUNT(*) as count FROM blogs WHERE user_id = ?',
        [req.user.id]
    );

    const blogCount = countRows[0].count;

    // Starter limit
    if (userPlan === 'Starter' && blogCount >= 3) {
        return res.status(403).json({
            message: 'Starter plan allows only 3 blog posts. Upgrade to Pro.'
        });
    }

    // Only Pro & Enterprise can feature posts
    if (isFeatured && userPlan === 'Starter') {
        return res.status(403).json({
            message: 'Upgrade to Pro to feature posts.'
        });
    }

    await db.execute(
        'INSERT INTO blogs (user_id, title, content, is_featured) VALUES (?, ?, ?, ?)',
        [req.user.id, title, content, isFeatured || false]
    );

    res.json({ message: 'Blog created successfully' });
};


exports.getMyBlogs = async (req, res) => {
    const [blogs] = await db.execute(
        'SELECT * FROM blogs WHERE user_id = ? ORDER BY created_at DESC',
        [req.user.id]
    );

    res.json(blogs);
};