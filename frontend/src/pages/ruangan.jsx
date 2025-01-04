import React, { useEffect, useState } from 'react';
import Navbar from '../components/navbar';
import api from '../services/api';
import './Ruangan.css';

function Ruangan() {
    const [ruanganList, setRuanganList] = useState([]);

    useEffect(() => {
        api.get('/rooms')
            .then((response) => {
                setRuanganList(response.data);
            })
            .catch((error) => {
                console.error('Error fetching rooms:', error);
            });
    }, []);

    return (
        <div>
            <Navbar />
            <div className="ruangan-container">
                <h2>Daftar Ruangan</h2>
                <ul>
                    {ruanganList.map((room) => (
                        <li key={room.room_id}>
                            {room.name} - Kapasitas: {room.capacity}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default Ruangan;