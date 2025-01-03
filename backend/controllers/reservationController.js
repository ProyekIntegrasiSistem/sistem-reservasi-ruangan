const db = require('../config/db');

// GET: Ambil semua reservasi
const getAllReservations = async (req, res) => {
    try {
        const [reservations] = await db.query('SELECT * FROM Reservations');
        res.json(reservations);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// POST: Tambah reservasi baru
const createReservation = async (req, res) => {
    const { user_id, room_id, start_time, end_time, status } = req.body;
    try {
        const [result] = await db.query(
            'INSERT INTO Reservations (user_id, room_id, start_time, end_time, status) VALUES (?, ?, ?, ?, ?)',
            [user_id, room_id, start_time, end_time, status]
        );
        res.json({ message: 'Reservation created', reservationId: result.insertId });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// PUT: Update reservasi
const updateReservation = async (req, res) => {
    const { id } = req.params;
    const { start_time, end_time, status } = req.body;
    try {
        await db.query(
            'UPDATE Reservations SET start_time = ?, end_time = ?, status = ? WHERE reservation_id = ?',
            [start_time, end_time, status, id]
        );
        res.json({ message: 'Reservation updated' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// DELETE: Hapus reservasi
const deleteReservation = async (req, res) => {
    const { id } = req.params;
    try {
        await db.query('DELETE FROM Reservations WHERE reservation_id = ?', [id]);
        res.json({ message: 'Reservation deleted' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { getAllReservations, createReservation, updateReservation, deleteReservation };