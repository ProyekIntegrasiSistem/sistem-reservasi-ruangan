import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/navbar'; 
import './pinjaman.css'; 

function Pinjaman() {
  const navigate = useNavigate();
  const [filter, setFilter] = useState("all"); 
  const [searchQuery, setSearchQuery] = useState(""); 
  const [reservations] = useState([
    { 
      namaRuangan: "Aula Auditorium",
      status: "Belum Terkonfirmasi", 
      tanggalReservasi: "2024-11-25T15:00", 
      tanggalSelesai: "2024-11-25T18:00", 
      peminjam: "Dosen" 
    },
    { 
      namaRuangan: "Ruangan 001", 
      status: "Disetujui", 
      tanggalReservasi: "2024-11-21T12:00", 
      tanggalSelesai: "2024-11-21T13:00", 
      peminjam: "HIMAPRODI Teknologi Informasi" 
    },
    { 
      namaRuangan: "Ruangan 002", 
      status: "Ditolak", 
      tanggalReservasi: "2024-11-21T11:00", 
      tanggalSelesai: "2024-11-21T12:00", 
      peminjam: "BEM UNDIKNAS" 
    },
    { 
      namaRuangan: "Ruangan 003", 
      status: "Disetujui", 
      tanggalReservasi: "2024-11-22T12:00", 
      tanggalSelesai: "2024-11-22T15:00", 
      peminjam: "DPM UNDIKNAS" 
    },
    { 
      namaRuangan: "Ruangan 004", 
      status: "Belum Terkonfirmasi", 
      tanggalReservasi: "2024-11-24T15:00", 
      tanggalSelesai: "2024-11-24T19:00", 
      peminjam: "Dosen" 
    },
  ]); 

  const filteredReservations = reservations.filter((reservation) => {
    const matchesFilter =
      filter === "all" ||
      (filter === "belum-dikonfirmasi" && reservation.status === "Belum Terkonfirmasi") ||
      (filter === "disetujui" && reservation.status === "Disetujui") ||
      (filter === "ditolak" && reservation.status === "Ditolak");

    const matchesSearch =
      reservation.namaRuangan.toLowerCase().includes(searchQuery.toLowerCase()) ||
      reservation.peminjam.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  const handleDetail = (reservation) => {
    navigate('/detail', { state: { reservation } });
  };

  return (
    <div>
      <Navbar />
      <div className="pinjaman-container">
        <h1 className="page-title">Daftar Pinjaman</h1>
        <div className="filter-container">
          <select
            className="status-dropdown"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="all">Semua</option>
            <option value="belum-dikonfirmasi">Belum Terkonfirmasi</option>
            <option value="disetujui">Disetujui</option>
            <option value="ditolak">Ditolak</option>
          </select>
          <input
            type="text"
            placeholder="Search"
            className="search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <table className="pinjaman-table">
          <thead>
            <tr>
              <th>Nama Ruangan</th>
              <th>Status</th>
              <th>Tanggal Reservasi</th>
              <th>Tanggal Selesai</th>
              <th>Peminjam</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredReservations.map((reservation, index) => (
              <tr key={index}>
                <td>{reservation.namaRuangan}</td>
                <td>{reservation.status}</td>
                <td>{new Date(reservation.tanggalReservasi).toLocaleString()}</td>
                <td>{new Date(reservation.tanggalSelesai).toLocaleString()}</td>
                <td>{reservation.peminjam}</td>
                <td>
                  <span
                    className="action-link"
                    onClick={() => handleDetail(reservation)}
                  >
                    Detail
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Pinjaman;
