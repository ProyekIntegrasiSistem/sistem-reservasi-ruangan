import React, { useEffect, useState } from "react";
import Navbar from "../../components/navbar";
import api from "../../services/api";
import "./pinjaman.css";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { format } from "date-fns";
import { id } from "date-fns/locale";

function Pinjaman() {
  const [reservations, setReservations] = useState([]);
  const [statusSelected, setStatusSelected] = useState("");
  const [query, setQuery] = useState("");

  const navigate = useNavigate();

  const handleDetail = (reservation) => {
    navigate("/detail", { state: { reservation } });
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    fetchData();
  }, [statusSelected, query]);

  function fetchData() {
    const params = {
      status: statusSelected,
      name: query,
    };

    api
      .get("/reservations", { params })
      .then((response) => {
        setReservations(response.data); // Data dari backend
      })
      .catch((error) => {
        console.error("Error fetching reservations:", error);
      });
  }

  const formatDate = (isoDate) => {
    if (!isoDate) return "-";

    return format(new Date(isoDate), "dd MMMM yyyy HH:mm", { locale: id });
  };

  return (
    <div>
      <Navbar />

      <div className="pinjaman-container">
        <h1 className="page-title">Daftar Pinjaman</h1>
        <div className="row my-4">
          <div className="col-md-4">
            <select
              className="form-select custom-height"
              value={statusSelected || ""}
              onChange={(e) => setStatusSelected(e.target.value)}
            >
              <option value="">Status</option>
              <option value="pending">Belum Dikonfirmasi</option>
              <option value="approved">Disetujui</option>
              <option value="canceled">Tidak Disetujui</option>
            </select>
          </div>
          <div className="col-md-8">
            <input
              type="text"
              placeholder="Search"
              className="form-control custom-height"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
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
            {reservations.length > 0 ? (
              reservations.map((reservation) => (
                <tr key={reservation.reservation_id}>
                  <td>{reservation.room_name}</td>
                  <td>{reservation.status}</td>
                  <td>{formatDate(reservation.start_time)}</td>
                  <td>{formatDate(reservation.end_time)}</td>
                  <td>{reservation.reserver}</td>
                  <td>
                    <span
                      className="action-link"
                      onClick={() => handleDetail(reservation)}
                    >
                      Detail
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="text-center" colSpan={6}>
                  Reservation is empty
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Pinjaman;
