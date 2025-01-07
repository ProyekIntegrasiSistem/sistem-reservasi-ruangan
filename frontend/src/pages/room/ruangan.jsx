import React, { useState, useEffect } from "react";
import Navbar from "../../components/navbar";
import api from "../../services/api";
import "./Ruangan.css";

function Ruangan() {
  const [showModal, setShowModal] = useState(false); // Mengelola state modal
  const [ruanganList, setRuanganList] = useState([]); // Placeholder untuk data ruangan
  const [statusFilter, setStatusFilter] = useState(null);

  const [formData, setFormData] = useState(null); // Data untuk form tambah/edit
  const [isEditing, setIsEditing] = useState(false); // Menentukan apakah sedang mengedit data
  const [searchQuery, setSearchQuery] = useState(""); // Query pencarian

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    fetchData();
  }, [statusFilter, searchQuery]);

  function fetchData() {
    const params = {
      status: statusFilter,
      name: searchQuery
    };

    api
      .get("/rooms", {params})
      .then((response) => {
        setRuanganList(response.data);
      })
      .catch((error) => {
        console.error("Error fetching rooms:", error);
      });
  }

  // Fungsi untuk menangani perubahan pada input form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Fungsi untuk menyimpan data baru/hasil edit
  const handleSave = () => {
    if (!isEditing) {
      api.post(
        '/rooms', {name: formData.nama, description: formData.deskripsi}
      ).then((response) => {
        fetchData();
      }).catch((error) => {
        console.error("Error fetching rooms:", error);
      });
    } else {
      api.put(
        `/rooms/${formData.id}`,
        { name: formData.nama, description: formData.deskripsi }
      ).then((response) => {
        fetchData();
      }).catch((error) => {
        console.error("Error fetching rooms:", error);
      });
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
    setFormData({id: ruangan.room_id, nama: ruangan.name, deskripsi: ruangan.description});
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
  function handleDelete(id) {
    api.delete(
      `/rooms/${id}`
    ).then((response) => {
      fetchData();
    }).catch((error) => {
      console.error("Error delete rooms:", error);
    });
  }


  const handleStatusChanged = (event) => {
    setStatusFilter(event.target.value);
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
          <select className="status-dropdown" value={statusFilter} onChange={handleStatusChanged}>
            <option>Semua</option>
            <option value="1">Aktif</option>
            <option value="0">Tidak Aktif</option>
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
              <th className="text-center">Nama Ruangan</th>
              <th>Description</th>
              <th className="text-center">Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {
              ruanganList.length > 0 
                ? ruanganList.map((ruangan, index) => (
                  <tr key={index}>
                    <td className="text-center">{ruangan.name}</td>
                    <td>{ruangan.description ?? "-"}</td>
                    <td className="text-center">
                      {ruangan.status == 0 ? 'Tidak Aktif' : 'Aktif'}
                    </td>
                    <td>
                      <span
                        className="edit-action"
                        onClick={() => openEditModal(ruangan)}
                      >
                        Edit
                      </span>
                      {
                        (ruangan.status == 1) && <span
                          className="delete-action"
                          onClick={() => handleDelete(ruangan.room_id)}
                        >
                          Delete
                        </span>
                      }
                    </td>
                  </tr>
                ))
                : <tr>
                  <td colSpan={4} className="text-center">
                    Data ruangan kosong
                  </td>
                </tr>
            }
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
