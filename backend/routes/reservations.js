const express = require('express');
const { getAllReservations, createReservation, updateReservation, deleteReservation } = require('../controllers/reservationController');
const router = express.Router();
const dayjs = require('dayjs');

// GET: Fetch all reservations with formatted dates
router.get('/', async (req, res) => {
    try {
        const reservations = await getAllReservations(); // Assume this fetches all reservations

        // Format start_time and end_time using Day.js
        const formattedReservations = reservations.map((reservation) => ({
            ...reservation,
            start_time: dayjs(reservation.start_time).format('DD MMM YYYY HH:mm'),
            end_time: dayjs(reservation.end_time).format('DD MMM YYYY HH:mm'),
        }));

        res.json(formattedReservations);
    } catch (error) {
        console.error('Error fetching reservations:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// POST: Create a new reservation
router.post('/', async (req, res) => {
    try {
        const newReservation = await createReservation(req.body);
        res.status(201).json(newReservation);
    } catch (error) {
        console.error('Error creating reservation:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// PUT: Update an existing reservation
router.put('/:id', async (req, res) => {
    try {
        const updatedReservation = await updateReservation(req.params.id, req.body);
        res.json(updatedReservation);
    } catch (error) {
        console.error('Error updating reservation:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

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

module.exports = router;