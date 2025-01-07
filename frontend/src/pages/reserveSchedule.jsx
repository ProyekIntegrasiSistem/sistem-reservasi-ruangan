import React, { useEffect, useState } from "react";
import Navbar from "../components/navbar"; // Pastikan Navbar sudah sesuai untuk pengguna
import "./reserveSchedule.css";
import api from "../services/api";
import ReservationModal from "../components/reservationModal";
import { format } from "date-fns";
import { id } from "date-fns/locale"; // Assuming you will create a CSS file for modal styles

function ReserveSchedule() {
  const [rooms, setRooms] = useState([]);

  const [searchQuery, setSearchQuery] = useState(''); // Query pencarian nama peminjam
  const [selectedRoom, setSelectedRoom] = useState(''); // Ruangan yang dipilih dari dropdown
  const [selectedDate, setSelectedDate] = useState(''); // Tanggal yang dipilih dari kalender

  // Data statis sebagai placeholder
  const [reservations, setReservations] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [reservationData, setReservationData] = useState(null);

  useEffect(() => {
    fetchRooms();
  }, []);

  useEffect(() => {
    fetchReservationRoom();
  }, [selectedRoom, selectedDate, searchQuery]);

  function fetchRooms() {
    const params = {status: 1};

    api
      .get("/rooms", {params})
      .then((response) => {
        setRooms(response.data);
      })
      .catch((error) => {
        console.error("Error fetching rooms:", error);
      });
  }

  function fetchReservationRoom() {
    const params = {
      room_id: selectedRoom,
      date: selectedDate,
      reserver: searchQuery
    };

    api
      .get("/reservations/room-reservate", {params})
      .then((response) => {
        setReservations(response.data);
      })
      .catch((error) => {
        console.error("Error fetching rooms:", error);
      });
  }

  function onShowModal() {
    setShowModal(true);
  }

  function onCloseModal() {
    setShowModal(false);
    setReservationData(null);
  }

  const onSubmit = (data) => {
    api.post("/reservations", data)
      .then((response) => {
        setShowModal(false);
        fetchReservationRoom();
      })
      .catch((error) => {
        console.error("Error create reservation:", error);
      });
  }

  function handleClickDetail(reservation) {
    setShowModal(true);
    setReservationData(reservation);
  }

  const formatDate = (isoDate) => {
    if (!isoDate) return '-';

    return format(new Date(isoDate), 'dd MMMM yyyy HH:mm', { locale: id });
  };

  return (
    <div>
      {/* Navbar Khusus Pengguna */}
      <Navbar onActionClick={onShowModal}/>

      <div className="reserve-schedule-container">
        {/* Filter dan Search */}
        <div className="filter-search-container">
          <select
            className="status-dropdown"
            value={selectedRoom || ''}
            onChange={(e) => setSelectedRoom(e.target.value)}
          >
            <option value="">Pilih Ruangan</option>
            {rooms.map((room, index) => {
              return (<option key={index} value={room.room_id ?? ''}>{room.name}</option>);
            })}
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
            {
              reservations.length > 0 
                ? reservations.map((reservation, index) => (
                  <tr key={index}>
                    <td>{reservation.name}</td>
                    <td>{reservation.status ?? 'Kosong'}</td>
                    <td>{formatDate(reservation.start_time)}</td>
                    <td>{formatDate(reservation.end_time)}</td>
                    <td>{reservation.reserver ?? '-'}</td>
                    <td>
                      {(reservation.status != null) && <span className="action-link" onClick={() => handleClickDetail(reservation)}>Detail</span>}
                    </td>
                  </tr>
                ))
                : <tr>
                  <td colSpan={6} className="text-center">Data Reservasi Kosong</td>
                </tr>
            }
          </tbody>
        </table>
      </div>

      {showModal && <ReservationModal 
        title="Permohonan Pinjaman" 
        rooms={rooms} 
        reservation={reservationData}
        onClose={onCloseModal}
        onSubmit={onSubmit}
      />}
    </div>
  );
}

export default ReserveSchedule;
