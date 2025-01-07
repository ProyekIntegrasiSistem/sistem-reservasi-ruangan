import React, { useEffect, useState } from 'react';
import './reservationModal.css'; // Assuming you will create a CSS file for modal styles
import 'bootstrap/dist/css/bootstrap.min.css';


const ReservationModal = ({title, rooms, onClose, onSubmit, reservation}) => {
    const [formData, setFormData] = useState({
        room_id: '',
        reserver: '',
        start_time: '',
        end_time: '',
        reason: '',
    });

    const isDetail = reservation != undefined;

    useEffect(() => {
        if (reservation) {
            console.log(reservation);
            setFormData({
                room_id: reservation.room_id,
                reserver: reservation.reserver,
                start_time: formatDateForInput(reservation.start_time),
                end_time: formatDateForInput(reservation.end_time),
                reason: reservation.purpose,
            });
        }
    }, [reservation]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
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
        <div className="modal-overlay">
            <div className="modal-reservation-container">
                <h5 className="modal-reservation-title">{title}</h5>
                <form className="modal-form">
                    <div className="form-group d-flex justify-content-between align-items-center mb-3">
                        <label htmlFor="room-id" className="form-label">Ruangan <span>*</span></label>
                        <select id="room-id" className="form-select w-50" name='room_id' value={formData.room_id} onChange={handleInputChange} disabled={isDetail}>
                            <option>Pilih Ruangan</option>
                            {rooms.map((room, index) => {
                                return (<option key={index} value={room.room_id}>{room.name}</option>);
                            })}
                        </select>
                    </div>
                    <div className="form-group d-flex justify-content-between align-items-center mb-3">
                        <label htmlFor="reserver" className="form-label">Peminjam <span>*</span></label>
                        <input 
                            type="text" 
                            id="reserver" 
                            name='reserver'
                            value={formData.reserver} 
                            className="form-control w-50" 
                            placeholder="ex. Nama Peminjam"
                            onChange={handleInputChange}
                            disabled={isDetail}
                        />
                    </div>
                    <div className="form-group d-flex justify-content-between align-items-center mb-3">
                        <label htmlFor="start-time" className="form-label">Tanggal Pinjam <span>*</span></label>
                        <input 
                            type="datetime-local" 
                            id="start-time" 
                            name='start_time' 
                            className="form-control w-50"
                            onChange={handleInputChange}
                            value={formData.start_time} 
                            disabled={isDetail}
                        />
                    </div>
                    <div className="form-group d-flex justify-content-between align-items-center mb-3">
                        <label htmlFor="end-time" className="form-label">Waktu Berakhir <span>*</span></label>
                        <input 
                            type="datetime-local" 
                            id="end-time" 
                            name='end_time' 
                            className="form-control w-50" 
                            onChange={handleInputChange}
                            value={formData.end_time} 
                            disabled={isDetail}
                        />
                    </div>
                    <div className="form-group d-flex justify-content-between align-items-center mb-3">
                        <label htmlFor="reason" className="form-label">Perihal <span>*</span></label>
                        <textarea 
                            id="reason" 
                            value={formData.reason} 
                            name='reason' 
                            className="form-control w-50" 
                            placeholder="Rapat dosen dan dekanan"
                            onChange={handleInputChange}
                            disabled={isDetail}
                        ></textarea>
                    </div>
                    <div className="modal-buttons">
                        <button type="button" className="btn cancel" onClick={onClose}>Cancel</button>
                        {(reservation != undefined) || <button type="button" className="btn save" onClick={() => onSubmit(formData)}>Simpan</button>}
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ReservationModal;
