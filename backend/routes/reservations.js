const express = require('express');
const { getAllReservations, createReservation, updateReservation, deleteReservation } = require('../controllers/reservationController');
const router = express.Router();
const dayjs = require('dayjs');
const db = require('../config/db');

// GET: Fetch all reservations with formatted dates
router.get('/', getAllReservations);

// POST: Create a new reservation
router.post('/', createReservation);

// PUT: Update an existing reservation
router.put('/:id', updateReservation);

// DELETE: Delete a reservation
router.delete('/:id', async (req, res) => {
    try {
        await deleteReservation(req.params.id);
        res.status(204).send(); // 204 No Content
    } catch (error) {
        console.error('Error deleting reservation:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

router.get('/room-reservate', async (req, res) => {
    const { room_id, date, reserver } = req.query; // Ambil filter dari query parameter

    try {
        let query = `
            SELECT 
                r.*, 
                res.start_time, 
                res.end_time,
                res.status, 
                res.reserver,
                res.purpose
            FROM 
                rooms r
            LEFT JOIN (
                SELECT 
                    rs.room_id, 
                    rs.start_time, 
                    rs.end_time,
                    rs.status, 
                    rs.reserver,
                    rs.purpose, 
                    ROW_NUMBER() OVER (PARTITION BY rs.room_id ORDER BY rs.start_time DESC) AS row_num
                FROM 
                    reservations rs
                WHERE 
                    rs.status = 'pending'
            ) res 
            ON 
                res.room_id = r.room_id AND res.row_num = 1
            WHERE 
                r.status = 1
        `;

        const params = [];
        let whereClause = '';

        if (room_id) {
            whereClause += `r.room_id = ?`;
            params.push(room_id);
        }

        // Tambahkan logika date di dalam ON clause
        if (date) {
            query = query.replace(
                `ON res.room_id = r.room_id AND res.row_num = 1`,
                `ON res.room_id = r.room_id AND res.row_num = 1 AND DATE(res.start_time) = ?`
            );
            params.push(date);
        }

        if (reserver) {
            if (whereClause) whereClause += ' AND ';
            whereClause += `res.reserver LIKE ?`;
            params.push(`%${reserver}%`);
        }

        if (whereClause) {
            query += ` AND ${whereClause}`;
        }

        const [rooms] = await db.query(query, params); 
        res.json(rooms);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;