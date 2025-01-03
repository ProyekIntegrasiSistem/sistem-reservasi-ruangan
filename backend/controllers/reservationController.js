const db = require('../config/db');

const getAllReservations = async (req, res) => {
    try {
        const [reservations] = await db.query('SELECT * FROM Reservations');
        res.json(reservations);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { getAllReservations };