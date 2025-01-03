const mysql = require('mysql2');

// koneksi ke database menggunakan pool
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

// Ekspor koneksi agar bisa digunakan di controller
module.exports = pool.promise();