import React, { useState, useEffect } from "react";
import Navbar from "../components/navbar";
import api from "../services/api";
import "./Ruangan.css";

function Ruangan() {
  const [showModal, setShowModal] = useState(false); // Mengelola state modal
  const [ruanganList, setRuanganList] = useState([]); // Placeholder untuk data ruangan

  const [formData, setFormData] = useState(null); // Data untuk form tambah/edit
  const [isEditing, setIsEditing] = useState(false); // Menentukan apakah sedang mengedit data
  const [searchQuery, setSearchQuery] = useState(""); // Query pencarian

  useEffect(() => {
    api
      .get("/rooms")
      .then((response) => {
        console.log(response.data);
        setRuanganList(response.data);
      })
      .catch((error) => {
        console.error("Error fetching rooms:", error);
      });
  }, []);

  // Fungsi untuk menangani perubahan pada input form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Fungsi untuk menyimpan data baru/hasil edit
  const handleSave = () => {
    if (isEditing) {
      setRuanganList(
        ruanganList.map((item) => (item.id === formData.id ? formData : item))
      );
    } else {
      setRuanganList([
        ...ruanganList,
        { id: Date.now(), ...formData }, // Tambahkan ID unik saat menambah
      ]);
    }
    setShowModal(false);
    setFormData({ id: null, nama: "", deskripsi: "" });
    setIsEditing(false);
  };

  // Fungsi untuk membuka modal tambah
  const openAddModal = () => {
    setFormData({ id: null, nama: "", deskripsi: "" });
    setShowModal(true);
    setIsEditing(false);
  };

  // Fungsi untuk membuka modal edit
  const openEditModal = (ruangan) => {
    setFormData(ruangan);
    setShowModal(true);
    setIsEditing(true);
  };

  // Fungsi untuk menutup modal
  const closeModal = () => {
    setShowModal(false);
    setFormData({ id: null, nama: "", deskripsi: "" });
    setIsEditing(false);
  };

  // Fungsi untuk menghapus data
  const handleDelete = (id) => {
    setRuanganList(ruanganList.filter((item) => item.id !== id));
  };

  // Fungsi untuk pencarian
  const filteredRuanganList = ruanganList.filter((ruangan) =>
    ruangan.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <Navbar />

      <div className="ruangan-container">
        <div className="header">
          <h2 className="title">Ruangan</h2>
          <button className="tambah-button" onClick={openAddModal}>
            + Tambah
          </button>
        </div>

        {/* Dropdown dan Search */}
        <div className="filter-container">
          <select className="status-dropdown">
            <option value="semua">Semua</option>
            <option value="tersedia">Tersedia</option>
            <option value="tidak-tersedia">Tidak Tersedia</option>
          </select>
          <input
            type="text"
            placeholder="Search"
            className="search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)} // Mengatur query pencarian
          />
        </div>

        {/* Tabel Daftar Ruangan */}
        <table className="ruangan-table">
          <thead>
            <tr>
              <th>Nama Ruangan</th>
              <th>Description</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredRuanganList.map((ruangan, index) => (
              <tr key={index}>
                <td>{ruangan.name}</td>
                <td>{ruangan.description ?? "-"}</td>
                <td>
                  <span
                    className="edit-action"
                    onClick={() => openEditModal(ruangan)}
                  >
                    Edit
                  </span>
                  <span
                    className="delete-action"
                    onClick={() => handleDelete(ruangan.id)}
                  >
                    Delete
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal Tambah/Edit */}
      {showModal && (
        <div className="modal-container">
          <div className="modal-content">
            <div className="modal-header">
              <h3>{isEditing ? "Edit Ruangan" : "Tambah Ruangan"}</h3>
            </div>
            <div className="modal-form-container">
              <div className="modal-form-group">
                <label htmlFor="namaRuangan">
                  Nama Ruangan <span style={{ color: "red" }}>*</span>
                </label>
                <input
                  id="namaRuangan"
                  type="text"
                  name="nama"
                  value={formData.nama}
                  placeholder="ex. Ruangan 001"
                  onChange={handleInputChange}
                />
              </div>

              <div className="modal-form-group">
                <label htmlFor="deskripsiRuangan">Deskripsi Ruangan</label>
                <input
                  id="deskripsiRuangan"
                  type="text"
                  name="deskripsi"
                  value={formData.deskripsi}
                  placeholder="ex. Deskripsi Ruangan"
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="modal-actions">
              <button className="cancel-button" onClick={closeModal}>
                Cancel
              </button>
              <button className="save-button" onClick={handleSave}>
                Simpan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Ruangan;
