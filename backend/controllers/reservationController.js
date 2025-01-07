const db = require('../config/db');

// GET: Ambil semua reservasi
const getAllReservations = async (req, res) => {
    const { status, name } = req.query; 

    try {
        let query = 'SELECT r.*, rm.name as room_name FROM reservations r inner join rooms rm on rm.room_id = r.room_id';
        const params = [];

        if (status) {
            query += " WHERE r.status = ?";
            params.push(status);
        }

        if (name) {
            query += params.length > 0 ? " AND" : " WHERE";
            query += " (rm.name LIKE ? OR r.reserver LIKE ?)";
            
            params.push(`%${name}%`);
            params.push(`%${name}%`);
        }
        const [reservations] = await db.query(query, params);
        res.json(reservations);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// POST: Tambah reservasi baru
const createReservation = async (req, res) => {
    const { reserver, room_id, start_time, reason, end_time } = req.body;
    console.log(req.body);
    try {
        const [result] = await db.query(
            'INSERT INTO reservations (room_id, start_time, end_time, status, reserver, purpose) VALUES (?, ?, ?, ?, ?, ?)',
            [room_id, start_time, end_time, 'pending', reserver, reason]
        );
        res.json({ message: 'Reservation created', reservationId: result.insertId });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// PUT: Update reservasi
const updateReservation = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    try {
        await db.query(
            'UPDATE Reservations SET status = ? WHERE reservation_id = ?',
            [status, id]
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