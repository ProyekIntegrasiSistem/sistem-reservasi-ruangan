const express = require('express');
const { getAllRooms, createRoom, updateRoom, deleteRoom } = require('../controllers/roomController');
const router = express.Router();

router.get('/', getAllRooms);
router.post('/', createRoom);
router.put('/:id', updateRoom);
router.delete('/:id', deleteRoom);

module.exports = router;