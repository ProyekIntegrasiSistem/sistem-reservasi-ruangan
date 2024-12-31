import React, { useState } from 'react';
import Navbar from '../components/navbar'; 
import './pinjaman.css'; 

function Pinjaman() {
  const [filter, setFilter] = useState("all"); // State untuk menyimpan filter dropdown
  const [searchQuery, setSearchQuery] = useState(""); // State untuk menyimpan query pencarian
  const [reservations] = useState([
    // Data statis sebagai placeholder
    { 
        namaRuangan: "Aula Auditorium",
        status: "Belum Terkonfirmasi", 
        tanggalReservasi: "25 Nov 2024 15:00", 
        tanggalSelesai: "25 Nov 2024 18:00", 
        peminjam: "Dosen" },
    { 
        namaRuangan: "Ruangan 001", 
        status: "Disetujui", 
        tanggalReservasi: "21 Nov 2024 12:00", 
        tanggalSelesai: "21 Nov 2024 13:00", 
        peminjam: "HIMAPRODI Teknologi Informasi" },
    { 
        namaRuangan: "Ruangan 002", 
        status: "Ditolak", 
        tanggalReservasi: "21 Nov 2024 11:00", 
        tanggalSelesai: "21 Nov 2024 12:00", peminjam: "BEM UNDIKNAS" },
    { 
        namaRuangan: "Ruangan 003", 
        status: "Disetujui", 
        tanggalReservasi: "22 Nov 2024 12:00", 
        tanggalSelesai: "22 Nov 2024 15:00", peminjam: "DPM UNDIKNAS" },
    { 
        namaRuangan: "Ruangan 004", 
        status: "Belum Terkonfirmasi", 
        tanggalReservasi: "24 Nov 2024 15:00", 
        tanggalSelesai: "24 Nov 2024 19:00", peminjam: "Dosen" },
  ]); 

  // Fungsi untuk menyaring data berdasarkan filter dropdown dan query pencarian
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

  return (
    <div>
      <Navbar />

      <div className="pinjaman-container">
        <h1 className="page-title">Daftar Pinjaman</h1>

        {/* Filter dan Search */}
        <div className="filter-container">
          <select
            className="status-dropdown"
            value={filter}
            onChange={(e) => setFilter(e.target.value)} // Mengubah filter berdasarkan pilihan dropdown
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
            onChange={(e) => setSearchQuery(e.target.value)} // Mengubah query pencarian
          />
        </div>

        {/* Tabel Pinjaman */}
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
                <td>{reservation.tanggalReservasi}</td>
                <td>{reservation.tanggalSelesai}</td>
                <td>{reservation.peminjam}</td>
                <td>
                  <span className="action-link">Detail</span>
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
