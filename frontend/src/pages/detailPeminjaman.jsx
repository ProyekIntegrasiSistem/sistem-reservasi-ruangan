import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../components/navbar';
import './detailPeminjaman.css';

function DetailPeminjaman() {
  const location = useLocation();
  const reservation = location.state?.reservation;

  // Ambil role dari localStorage
  const role = localStorage.getItem('role');

  if (!reservation) {
    return <p>Data tidak ditemukan. Silakan kembali ke halaman sebelumnya.</p>;
  }

  const [formData, setFormData] = useState({
    ruangan: reservation.namaRuangan,
    peminjam: reservation.peminjam,
    tanggalReservasi: reservation.tanggalReservasi,
    tanggalBerakhir: reservation.tanggalSelesai,
    status: reservation.status,
    perihal: reservation.perihal || '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCancel = () => {
    window.history.back();
  };

  const handleSave = () => {
    if (role === 'staff') {
      console.log('Data yang disimpan:', formData);
      alert('Data berhasil disimpan!');
    } else {
      alert('Anda tidak memiliki izin untuk menyimpan perubahan.');
    }
  };

  return (
    <div>
      <Navbar />
      <div className="detail-peminjaman-container">
        <h2 className="title">Detail Peminjaman</h2>
        <form className="form-detail">
          <div className="form-group">
            <label htmlFor="ruangan">Ruangan</label>
            <input
              type="text"
              id="ruangan"
              name="ruangan"
              value={formData.ruangan}
              onChange={handleInputChange}
              disabled={role !== 'staff'} // Disable untuk user
            />
          </div>
          <div className="form-group">
            <label htmlFor="peminjam">Peminjam</label>
            <input
              type="text"
              id="peminjam"
              name="peminjam"
              value={formData.peminjam}
              onChange={handleInputChange}
              disabled={role !== 'staff'} // Disable untuk user
            />
          </div>
          <div className="form-group">
            <label htmlFor="tanggalReservasi">Tanggal Reservasi</label>
            <input
              type="datetime-local"
              id="tanggalReservasi"
              name="tanggalReservasi"
              value={formData.tanggalReservasi}
              onChange={handleInputChange}
              disabled={role !== 'staff'} // Disable untuk user
            />
          </div>
          <div className="form-group">
            <label htmlFor="tanggalBerakhir">Tanggal Berakhir</label>
            <input
              type="datetime-local"
              id="tanggalBerakhir"
              name="tanggalBerakhir"
              value={formData.tanggalBerakhir}
              onChange={handleInputChange}
              disabled={role !== 'staff'} // Disable untuk user
            />
          </div>
          <div className="form-group">
            <label htmlFor="status">Status</label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleInputChange}
              disabled={role !== 'staff'} // Disable untuk user
            >
              <option value="Belum Terkonfirmasi">Belum Terkonfirmasi</option>
              <option value="Disetujui">Disetujui</option>
              <option value="Ditolak">Ditolak</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="perihal">Perihal</label>
            <textarea
              id="perihal"
              name="perihal"
              rows="4"
              value={formData.perihal}
              onChange={handleInputChange}
              disabled={role !== 'staff'} // Disable untuk user
            ></textarea>
          </div>
          <div className="form-actions">
            <button type="button" className="cancel-button" onClick={handleCancel}>
              Cancel
            </button>
            {role === 'staff' && (
              <button type="button" className="save-button" onClick={handleSave}>
                Simpan
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default DetailPeminjaman;