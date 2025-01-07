const db = require("../config/db");

// GET: Ambil semua ruangan
const getAllRooms = async (req, res) => {
  const { status, name } = req.query; 

  try {
    let query = "SELECT * FROM Rooms";
    const params = [];

    if (status) {
      query += " WHERE status = ?";
      params.push(status);
    }

    if (name) {
      query += params.length > 0 ? " AND" : " WHERE";
      query += " name LIKE ?";
      params.push(`%${name}%`);
    }

    const [rooms] = await db.query(query, params);
    res.json(rooms);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// POST: Tambah ruangan baru
const createRoom = async (req, res) => {
  const { name, description } = req.body;
  try {
    const [result] = await db.query(
      "INSERT INTO Rooms (name, description, status) VALUES (?, ?, ?)",
      [name, description, 1]
    );
    res.json({ message: "Room created", roomId: result.insertId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// PUT: Update ruangan
const updateRoom = async (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;
  try {
    await db.query(
      "UPDATE Rooms SET name = ?, description = ? WHERE room_id = ?",
      [name, description, id]
    );
    res.json({ message: "Room updated" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// DELETE: Hapus ruangan
const deleteRoom = async (req, res) => {
  const { id } = req.params;
  try {
    await db.query("Update rooms set status = ? where room_id = ?", [0, id]);
    res.json({ message: "Room deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getAllRooms, createRoom, updateRoom, deleteRoom };
