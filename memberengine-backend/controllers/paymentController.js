const db = require('../db');

exports.processPayment = async (req, res) => {

    const { plan, cardNumber } = req.body;

    const allowedPlans = ['Pro', 'Enterprise'];

    if (!allowedPlans.includes(plan)) {
        return res.status(400).json({ message: 'Invalid plan' });
    }

    // Fake validation
    if (!cardNumber || cardNumber.length < 8) {
        return res.status(400).json({ message: 'Invalid card details' });
    }

    await db.execute(
        'UPDATE users SET plan = ? WHERE id = ?',
        [plan, req.user.id]
    );

    res.json({ message: 'Payment successful. Plan upgraded.' });
};