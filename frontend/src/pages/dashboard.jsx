import React from 'react';
import Navbar from '../components/navbar';
import './dashboard.css'

function Dashboard() {
  return (
    <div>
      {/* Komponen Navbar */}
      <Navbar />

      {/* Container Dashboard */}
      <div className="dashboard-container">
        {/* Bagian Card */}
        <div className="dashboard-cards-container">
          <div className="card">
            <h5>Total Ruangan</h5>
            {/* Placeholder data, integrasi dengan backend */}
            <h1><i className="bi bi-door-closed"></i> 20</h1>
          </div>
          <div className="card">
            <h5>Jumlah Ruangan Kosong</h5>
            {/* Placeholder data, integrasi dengan backend */}
            <h1><i className="bi bi-door-open"></i> 15</h1>
          </div>
          <div className="card">
            <h5>Total Peminjam</h5>
            {/* Placeholder data, integrasi dengan backend */}
            <h1><i className="bi bi-person"></i> 10</h1>
          </div>
          <div className="card">
            <h5>Total Disetujui</h5>
            {/* Placeholder data, integrasi dengan backend */}
            <h1><i className="bi bi-check-circle"></i> 5</h1>
          </div>
          <div className="card">
            <h5>Total Cancel</h5>
            {/* Placeholder data, integrasi dengan backend */}
            <h1><i className="bi bi-x-circle"></i> 5</h1>
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
              <tr>
                <td>Aula Auditorium</td>
                <td>Disetujui</td>
                <td>24 Nov 2024</td>
                <td>HIMAPRODI Teknologi Informasi</td>
                <td>Event Jurusan</td>
              </tr>
              <tr>
                <td>Ruangan 001</td>
                <td>Belum Dikonfirmasi</td>
                <td>24 Nov 2024</td>
                <td>HIMAPRODI Manajemen</td>
                <td>Event Jurusan</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
