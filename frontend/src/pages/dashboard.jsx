import React, { useEffect, useState } from 'react';
import Navbar from '../components/navbar';
import api from '../services/api';
import './dashboard.css';

function Dashboard() {
    const [stats, setStats] = useState({
        totalRooms: 0,
        availableRooms: 0,
        totalReservations: 0,
        approvedReservations: 0,
        canceledReservations: 0,
    });

    useEffect(() => {
        // Fetch data untuk statistik
        api.get('/dashboard/stats')
            .then((response) => {
                setStats(response.data); // Update statistik dari backend
            })
            .catch((error) => {
                console.error('Error fetching dashboard stats:', error);
            });
    }, []);

    return (
        <div>
            <Navbar />
            <div className="dashboard-container">
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
            </div>
        </div>
    );
}

export default Dashboard;