import React, { useState } from "react";
import Navbar from "../components/navbar"; // Pastikan Navbar sudah sesuai untuk pengguna
import "./ReserveSchedule.css";

function ReserveSchedule() {
  const [searchQuery, setSearchQuery] = useState(""); // Query pencarian nama peminjam
  const [selectedRoom, setSelectedRoom] = useState(""); // Ruangan yang dipilih dari dropdown
  const [selectedDate, setSelectedDate] = useState(""); // Tanggal yang dipilih dari kalender
  const handleDetail = (reservation) => {
    navigate('/detail', { state: { reservation } });
  };

  // Data statis sebagai placeholder
  const [reservations] = useState([
    {
      namaRuangan: "Aula Auditorium",
      status: "Belum Terkonfirmasi",
      tanggalReservasi: "25 Nov 2024 15:00",
      tanggalSelesai: "25 Nov 2024 18:00",
      peminjam: "Dosen",
    },
    {
      namaRuangan: "Ruangan 001",
      status: "Disetujui",
      tanggalReservasi: "21 Nov 2024 12:00",
      tanggalSelesai: "21 Nov 2024 13:00",
      peminjam: "HIMAPRODI Teknologi Informasi",
    },
    {
      namaRuangan: "Ruangan 002",
      status: "Ditolak",
      tanggalReservasi: "21 Nov 2024 11:00",
      tanggalSelesai: "21 Nov 2024 12:00",
      peminjam: "BEM UNDIKNAS",
    },
    {
      namaRuangan: "Ruangan 003",
      status: "Disetujui",
      tanggalReservasi: "22 Nov 2024 12:00",
      tanggalSelesai: "22 Nov 2024 15:00",
      peminjam: "DPM UNDIKNAS",
    },
    {
      namaRuangan: "Ruangan 004",
      status: "Belum Terkonfirmasi",
      tanggalReservasi: "24 Nov 2024 15:00",
      tanggalSelesai: "24 Nov 2024 19:00",
      peminjam: "Dosen",
    },
  ]);

  // Filter dan Pencarian
  const filteredReservations = reservations.filter((reservation) => {
    const matchesRoom = selectedRoom
      ? reservation.namaRuangan === selectedRoom
      : true;
    const matchesDate = selectedDate
      ? reservation.tanggalReservasi.includes(selectedDate)
      : true;
    const matchesSearch = reservation.peminjam
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    return matchesRoom && matchesDate && matchesSearch;
  });

  return (
    <div>
      {/* Navbar Khusus Pengguna */}
      <Navbar options={["Dashboard"]} actionButton="+ Pinjam Ruangan" />

      <div className="reserve-schedule-container">
        {/* Filter dan Search */}
        <div className="filter-search-container">
          <select
            className="status-dropdown"
            value={selectedRoom}
            onChange={(e) => setSelectedRoom(e.target.value)}
          >
            <option value="">Pilih Ruangan</option>
            <option value="Aula Auditorium">Aula Auditorium</option>
            <option value="Ruangan 001">Ruangan 001</option>
            <option value="Ruangan 002">Ruangan 002</option>
            <option value="Ruangan 003">Ruangan 003</option>
            <option value="Ruangan 004">Ruangan 004</option>
          </select>
          <input
            type="date"
            className="date-picker"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          />
          <input
            type="text"
            placeholder="Peminjam"
            className="search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Tabel Reservasi */}
        <table className="reservation-table">
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

export default ReserveSchedule;