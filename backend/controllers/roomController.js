const db = require('../config/db');

// GET: Ambil semua ruangan
const getAllRooms = async (req, res) => {
    try {
        const [rooms] = await db.query('SELECT * FROM Rooms');
        res.json(rooms);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// POST: Tambah ruangan baru
const createRoom = async (req, res) => {
    const { name, capacity, location, availability } = req.body;
    try {
        const [result] = await db.query(
            'INSERT INTO Rooms (name, capacity, location, availability) VALUES (?, ?, ?, ?)',
            [name, capacity, location, availability]
        );
        res.json({ message: 'Room created', roomId: result.insertId });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// PUT: Update ruangan
const updateRoom = async (req, res) => {
    const { id } = req.params;
    const { name, capacity, location, availability } = req.body;
    try {
        await db.query(
            'UPDATE Rooms SET name = ?, capacity = ?, location = ?, availability = ? WHERE room_id = ?',
            [name, capacity, location, availability, id]
        );
        res.json({ message: 'Room updated' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// DELETE: Hapus ruangan
const deleteRoom = async (req, res) => {
    const { id } = req.params;
    try {
        await db.query('DELETE FROM Rooms WHERE room_id = ?', [id]);
        res.json({ message: 'Room deleted' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { getAllRooms, createRoom, updateRoom, deleteRoom };