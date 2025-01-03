const express = require('express');
const router = express.Router();

// Import controller
const { getAllRooms } = require('../controllers/roomController');

// Endpoint untuk mendapatkan semua ruangan
router.get('/', getAllRooms);

module.exports = router;