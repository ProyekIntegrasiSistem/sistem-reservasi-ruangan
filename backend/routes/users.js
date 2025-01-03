const express = require('express');
const router = express.Router();

// Import controller
const { getAllUsers } = require('../controllers/userController');

// Endpoint untuk mendapatkan semua pengguna
router.get('/', getAllUsers);

module.exports = router;