const mysql = require('mysql2');
require('dotenv').config(); 

// console.log('Creating DB connection with:');
// console.log('Host:', process.env.DB_HOST);
// console.log('User:', process.env.DB_USER);
// console.log('Password:', process.env.DB_PASSWORD ? '******' : '(empty)');
// console.log('Database:', process.env.DB_NAME);

// koneksi ke database menggunakan pool
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT || 3306
});

// Ekspor koneksi agar bisa digunakan di controller
module.exports = pool.promise();