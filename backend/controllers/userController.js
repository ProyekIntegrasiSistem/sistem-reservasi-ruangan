const db = require('../config/db');

// GET: Ambil semua pengguna
const getAllUsers = async (req, res) => {
    try {
        const [users] = await db.query('SELECT * FROM Users');
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// POST: Tambah pengguna baru
const createUser = async (req, res) => {
    const { name, email, password, role } = req.body;
    try {
        const [result] = await db.query(
            'INSERT INTO Users (name, email, password, role) VALUES (?, ?, ?, ?)',
            [name, email, password, role]
        );
        res.json({ message: 'User created', userId: result.insertId });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// PUT: Update pengguna
const updateUser = async (req, res) => {
    const { id } = req.params;
    const { name, email, password, role } = req.body;
    try {
        await db.query(
            'UPDATE Users SET name = ?, email = ?, password = ?, role = ? WHERE user_id = ?',
            [name, email, password, role, id]
        );
        res.json({ message: 'User updated' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// DELETE: Hapus pengguna
const deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        await db.query('DELETE FROM Users WHERE user_id = ?', [id]);
        res.json({ message: 'User deleted' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { getAllUsers, createUser, updateUser, deleteUser };