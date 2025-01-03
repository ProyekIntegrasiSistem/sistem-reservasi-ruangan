const express = require('express');
const { getAllReservations } = require('../controllers/reservationController');
const router = express.Router();

router.get('/', getAllReservations);

module.exports = router;