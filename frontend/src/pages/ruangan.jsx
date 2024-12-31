import React, { useState } from 'react';
import Navbar from '../components/navbar'; 
import './Ruangan.css'; 

function Ruangan() {
  const [showModal, setShowModal] = useState(false); // Mengelola state modal
  const [ruanganList, setRuanganList] = useState([
    { id: 1, nama: "Aula Auditorium", deskripsi: "Deskripsi Aula Auditorium" },
    { id: 2, nama: "Ruangan 001", deskripsi: "Ruangan Kelas 001" },
    { id: 3, nama: "Ruangan 002", deskripsi: "Ruangan Kelas 002" },
    { id: 4, nama: "Ruangan 003", deskripsi: "Ruangan Kelas 003" },
    { id: 5, nama: "Ruangan 004", deskripsi: "Ruangan Kelas 004" },
  ]); // Placeholder untuk data ruangan

  const [formData, setFormData] = useState({ id: null, nama: '', deskripsi: '' }); // Data untuk form tambah/edit
  const [isEditing, setIsEditing] = useState(false); // Menentukan apakah sedang mengedit data

  // Fungsi untuk menangani perubahan pada input form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Fungsi untuk menyimpan data baru/hasil edit
  const handleSave = () => {
    if (isEditing) {
      setRuanganList(
        ruanganList.map((item) =>
          item.id === formData.id ? formData : item
        )
      );
    } else {
      setRuanganList([
        ...ruanganList,
        { id: Date.now(), ...formData }, // Tambahkan ID unik saat menambah
      ]);
    }
    setShowModal(false);
    setFormData({ id: null, nama: '', deskripsi: '' });
    setIsEditing(false);
  };

  // Fungsi untuk membuka modal tambah
  const openAddModal = () => {
    setFormData({ id: null, nama: '', deskripsi: '' });
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
    setFormData({ id: null, nama: '', deskripsi: '' });
    setIsEditing(false);
  };

  // Fungsi untuk menghapus data
  const handleDelete = (id) => {
    setRuanganList(ruanganList.filter((item) => item.id !== id));
  };

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
            {ruanganList.map((ruangan, index) => (
              <tr key={index}>
                <td>{ruangan.nama}</td>
                <td>{ruangan.deskripsi}</td>
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
            <h3>{isEditing ? 'Edit Ruangan' : 'Tambah Ruangan'}</h3>
            <label>Nama Ruangan</label>
            <input
              type="text"
              name="nama"
              value={formData.nama}
              placeholder="ex. Ruangan 001"
              onChange={handleInputChange}
            />
            <label>Deskripsi Ruangan</label>
            <input
              type="text"
              name="deskripsi"
              value={formData.deskripsi}
              placeholder="ex. Deskripsi Ruangan"
              onChange={handleInputChange}
            />
            <div className="modal-actions">
            <button className="cancel-button" onClick={closeModal}> Cancel </button>
            <button className="save-button" onClick={handleSave}> Simpan </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Ruangan;
