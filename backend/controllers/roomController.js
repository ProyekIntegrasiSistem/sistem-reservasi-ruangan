const db = require('../config/db');

const getAllRooms = async (req, res) => {
    try {
        const [rooms] = await db.query('SELECT * FROM Rooms');
        res.json(rooms);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { getAllRooms };