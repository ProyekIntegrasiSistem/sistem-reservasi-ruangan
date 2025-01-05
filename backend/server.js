// require('dotenv').config(); Load konfigurasi dari .env
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// import routes
const userRoutes = require('./routes/users');
const roomRoutes = require('./routes/rooms');
const reservationRoutes = require('./routes/reservations');
const authRoutes = require('./routes/auth');
const dashboardRoutes = require('./routes/dashboard');

// inisialisasi Express
const app = express();

// Middleware
app.use(cors({origin: '*'}));
app.use(bodyParser.json());
app.use('/api/auth', authRoutes);

// Routes
app.use('/api/users', userRoutes);
app.use('/api/rooms', roomRoutes);
app.use('/api/reservations', reservationRoutes);
app.use('/api/dashboard', dashboardRoutes);

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));