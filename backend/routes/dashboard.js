const express = require('express');
const router = express.Router();
const db = require('../config/db'); // Sesuaikan dengan file koneksi database Anda

// Endpoint untuk mendapatkan statistik dashboard
router.get('/stats', async (req, res) => {
    try {
        const [totalRooms] = await db.query('SELECT COUNT(*) AS totalRooms FROM rooms');
        const [availableRooms] = await db.query('SELECT COUNT(*) AS availableRooms FROM rooms WHERE availability = "available"');
        const [totalReservations] = await db.query('SELECT COUNT(*) AS totalReservations FROM reservations');
        const [approvedReservations] = await db.query('SELECT COUNT(*) AS approvedReservations FROM reservations WHERE status = "approved"');
        const [canceledReservations] = await db.query('SELECT COUNT(*) AS canceledReservations FROM reservations WHERE status = "canceled"');

        res.json({
            totalRooms: totalRooms[0]?.totalRooms || 0,
            availableRooms: availableRooms[0]?.availableRooms || 0,
            totalReservations: totalReservations[0]?.totalReservations || 0,
            approvedReservations: approvedReservations[0]?.approvedReservations || 0,
            canceledReservations: canceledReservations[0]?.canceledReservations || 0,
        });
    } catch (error) {
        console.error('Error fetching stats:', error);
        res.status(500).json({ error: 'Error fetching stats' });
    }
});

// Endpoint untuk mendapatkan data pinjaman ruangan terakhir
router.get('/reservations', async (req, res) => {
    try {
        const reservations = await db.query(`
            SELECT 
                r.name AS ruangan, 
                res.status, 
                res.start_time, 
                res.purpose, 
                u.name AS peminjam 
            FROM reservations res
            JOIN rooms r ON res.room_id = r.room_id
            JOIN users u ON res.user_id = u.user_id
            ORDER BY res.start_time DESC
            LIMIT 5
        `);

        res.json(reservations);
    } catch (error) {
        console.error('Error fetching reservations:', error);
        res.status(500).json({ error: 'Error fetching reservations' });
    }
});

module.exports = router;
