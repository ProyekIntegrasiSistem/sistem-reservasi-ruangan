const express = require('express');

const router = express.Router();

const db = require('../config/db');



// Login Endpoint

router.post('/login', async (req, res) => {

  const { username, password } = req.body;

  // Validasi input

  console.log('Login request:', req.body); // Log Input Dari Thunder Client

  if (!username || !password) {

    return res.status(400).json({ message: 'Username and password are required' });

  }



  try {

    // Query ke database

    const [user] = await db.query(

      'SELECT * FROM users WHERE username = ? AND password = ?',

      [username, password]

    );



    // Jika pengguna tidak ditemukan

    if (user.length === 0) {

      return res.status(401).json({ message: 'Invalid username or password' });

    }



    // Respons jika login berhasil

    res.json({

      message: 'Login successful',

      user: {

        id: user[0].user_id,

        username: user[0].username,

        role: user[0].role

      }

    });

  } catch (error) {

    console.error('Login error:', error);

    res.status(500).json({ message: 'Internal server error' });

  }

});



module.exports = router;