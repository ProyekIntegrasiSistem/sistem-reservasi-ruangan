import React, { useEffect, useState } from 'react';
import Navbar from '../components/navbar';
import api from '../services/api';
import './pinjaman.css';

function Pinjaman() {
    const [reservations, setReservations] = useState([]);
    const handleDetail = (reservation) => {
      navigate('/detail', { state: { reservation } });
    };

    useEffect(() => {
        api.get('/reservations')
            .then((response) => {
                setReservations(response.data); // Data dari backend
            })
            .catch((error) => {
                console.error('Error fetching reservations:', error);
            });
    }, []);

    return (
        <div>
            <Navbar />
            <div className="pinjaman-container">
                <h1 className="page-title">Daftar Pinjaman</h1>
                <table className="pinjaman-table">
                    <thead>
                        <tr>
                            <th>Nama Ruangan</th>
                            <th>Status</th>
                            <th>Tanggal Reservasi</th>
                            <th>Tanggal Selesai</th>
                            <th>Peminjam</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reservations.map((reservation) => (
                            <tr key={reservation.reservation_id}>
                                <td>{reservation.roomName}</td>
                                <td>{reservation.status}</td>
                                <td>{reservation.start_time}</td>
                                <td>{reservation.end_time}</td>
                                <td>{reservation.userName}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Pinjaman;