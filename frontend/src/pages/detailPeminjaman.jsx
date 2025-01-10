import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../components/navbar';
import './detailPeminjaman.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import api from '../services/api';

function DetailPeminjaman() {
  const location = useLocation();
  const reservation = location.state?.reservation;

  const navigate = useNavigate();

  // Ambil role dari localStorage
  const role = localStorage.getItem('role');

  if (!reservation) {
    return <p>Data tidak ditemukan. Silakan kembali ke halaman sebelumnya.</p>;
  }

  const [formData, setFormData] = useState({
    room_name: '',
    reserver: '',
    start_time: '',
    end_time: '',
    status: '',
    purpose: '',
  });

  useEffect(() => {
    setFormData({
      room_name: reservation.room_name,
      reserver: reservation.reserver,
      start_time: formatDateForInput(reservation.start_time),
      end_time: formatDateForInput(reservation.end_time),
      status: reservation.status,
      purpose: reservation.purpose || '',
    });
  }, [reservation]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCancel = () => {
    window.history.back();
  };

  const handleSave = () => {
    const id = reservation.reservation_id;

    api.put(`/reservation/${id}`, {
      status: formData.status
    }).then((response) => {
        navigate(-1);
      })
      .catch((error) => {
        console.error("Error update reservation:", error);
      });
  };

  const formatDateForInput = (isoString) => {
    const date = new Date(isoString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
  
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };

  return (
    <div>
      <Navbar />
      <div className="detail-peminjaman-container">
        <h2 className="title">Detail Peminjaman</h2>
        <form className="form-detail">
          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <label htmlFor="ruangan">Ruangan</label>
                <input
                  type="text"
                  id="ruangan"
                  name="ruangan"
                  className='form-control'
                  value={formData.room_name}
                  disabled
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label htmlFor="peminjam">Peminjam</label>
                <input
                  type="text"
                  id="peminjam"
                  name="peminjam"
                  className='form-control'
                  value={formData.reserver}
                  disabled
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-4">
              <div className="form-group">
                <label htmlFor="tanggalReservasi">Tanggal Reservasi</label>
                <input
                  type="datetime-local"
                  id="tanggalReservasi"
                  name="tanggalReservasi"
                  className='form-control'
                  value={formData.start_time}
                  disabled
                />
              </div>
            </div>
            <div className="col-md-4">
              <div className="form-group">
                <label htmlFor="tanggalBerakhir">Tanggal Berakhir</label>
                <input
                  type="datetime-local"
                  id="tanggalBerakhir"
                  name="tanggalBerakhir"
                  className='form-control'
                  value={formData.end_time}
                  disabled
                />
              </div>
            </div>
            <div className="col-md-4">
              <div className="form-group">
                <label htmlFor="status">Status</label>
                <select
                  id="status"
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  className='form-select'
                  disabled={reservation.status != 'pending'}
                >
                  <option value="pending">Belum Terkonfirmasi</option>
                  <option value="approved">Disetujui</option>
                  <option value="canceled">Ditolak</option>
                </select>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className="form-group">
                <label htmlFor="perihal">Perihal</label>
                <textarea
                  id="perihal"
                  name="perihal"
                  rows="4"
                  value={formData.purpose}
                  disabled
                  className='form-control'
                ></textarea>
              </div>
            </div>
          </div>
          
          <div className="form-actions">
            <button type="button" className="cancel-button" onClick={handleCancel}>
              Cancel
            </button>
            {(reservation.status == 'pending') && (
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