const express = require('express');
const router = express.Router();

// Import controller
const { getAllReservations } = require('../controllers/reservationController');

// Endpoint untuk mendapatkan semua reservasi
router.get('/', getAllReservations);

module.exports = router;