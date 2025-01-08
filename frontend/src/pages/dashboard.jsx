import React, { useEffect, useState } from 'react';
// import Navbar from '../components/navbar';
import api from '../services/api';
import './dashboard.css';
import dayjs from 'dayjs';

function Dashboard() {
    const [stats, setStats] = useState({
        totalRooms: 0,
        availableRooms: 0,
        totalReservations: 0,
        approvedReservations: 0,
        canceledReservations: 0,
    });
    const [reservations, setReservations] = useState([]);

    // Fungsi untuk memformat tanggal
    const formatDate = (date) => {
        return dayjs(date).isValid() ? dayjs(date).format('DD MMM YYYY HH:mm') : 'Invalid Date';
    };

    useEffect(() => {
        // Fetch data untuk statistik
        api.get('/dashboard/stats')
            .then((response) => {
                setStats(response.data); // Update statistik dari backend
            })
            .catch((error) => {
                console.error('Error fetching dashboard stats:', error);
            });

        api.get('/dashboard/reservations')
            .then((response) => {
                setReservations(response.data); // Mengisi data tabel
            })
            .catch((error) => {
                console.error('Error fetching reservations:', error);
            });
    }, []);

    return (
        <div>
            <Navbar />
            <div className="dashboard-container">
            {/* Bagian Card */}
                <div className="dashboard-cards-container">
                    <div className="card">
                        <h5>Total Ruangan</h5>
                        <h1><i className="bi bi-door-closed"></i> {stats.totalRooms}</h1>
                    </div>
                    <div className="card">
                        <h5>Jumlah Ruangan Kosong</h5>
                        <h1><i className="bi bi-door-open"></i> {stats.availableRooms}</h1>
                    </div>
                    <div className="card">
                        <h5>Total Peminjam</h5>
                        <h1><i className="bi bi-person"></i> {stats.totalReservations}</h1>
                    </div>
                    <div className="card">
                        <h5>Total Disetujui</h5>
                        <h1><i className="bi bi-check-circle"></i> {stats.approvedReservations}</h1>
                    </div>
                    <div className="card">
                        <h5>Total Cancel</h5>
                        <h1><i className="bi bi-x-circle"></i> {stats.canceledReservations}</h1>
                    </div>
                </div>

                {/* Table Data Pinjaman Ruangan */}
                <div className="dashboard-table-container">
                    <h4>Pinjaman Ruangan Terakhir</h4>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Ruangan</th>
                                <th>Status</th>
                                <th>Tanggal Pinjam</th>
                                <th>Peminjam</th>
                                <th>Perihal</th>
                            </tr>
                        </thead>
                        <tbody>
                            {reservations.map((reservation, index) => (
                                <tr key={index}>
                                    <td>{reservation.ruangan}</td>
                                    <td>{reservation.status}</td>
                                    <td>{formatDate(reservation.start_time)}</td>
                                    <td>{reservation.peminjam}</td>
                                    <td>{reservation.purpose}</td>
                                </tr>
                             ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;