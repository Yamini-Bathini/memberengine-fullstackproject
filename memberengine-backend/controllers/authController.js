const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../db');


// ================= REGISTER =================
exports.register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);

        const [result] = await db.execute(
            'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
            [name, email, hashedPassword]
        );

        const token = jwt.sign(
            { id: result.insertId, email },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );

        res.status(201).json({
            token,
            user: { id: result.insertId, name, email, plan: 'Starter' }
        });

    } catch (err) {
        console.log("REGISTER ERROR:", err);
        res.status(500).json({ message: 'Registration failed' });
    }
};


// ================= LOGIN =================
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const [rows] = await db.execute(
            'SELECT * FROM users WHERE email = ?',
            [email]
        );

        if (rows.length === 0) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const user = rows[0];

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign(
            { id: user.id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );

        res.json({
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                plan: user.plan
            }
        });

    } catch (err) {
        res.status(500).json({ message: 'Login failed' });
    }
};


// ================= GET PROFILE =================
exports.getMe = async (req, res) => {
    try {
        const [rows] = await db.execute(
            'SELECT id, name, email, plan FROM users WHERE id = ?',
            [req.user.id]
        );

        res.json(rows[0]);
    } catch (err) {
        res.status(500).json({ message: 'Failed to fetch user' });
    }
};


