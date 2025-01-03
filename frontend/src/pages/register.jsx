import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './register.css';
import loginImage from 'src/assets/ruanganLogin.jpg';

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRegister = (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert('Password dan konfirmasi password tidak cocok!');
      return;
    }

    // Simulasi pendaftaran
    console.log('Data yang didaftarkan:', formData);
    alert('Pendaftaran berhasil! Silakan log in.');
    navigate('/'); // Arahkan ke halaman log in
  };

  return (
    <div className="register-container">
      {/* Sisi Kiri: Gambar */}
      <div className="register-left">
        <img
          src={loginImage}
          alt="Office Space"
          className="register-image"
        />
      </div>

      {/* Sisi Kanan: Form */}
      <div className="register-right">
        <div className="register-card">
          <h4 className="register-title">Register</h4>
          <p className="register-subtitle">
            Create an account to access the system
          </p>

          <form onSubmit={handleRegister}>
            {/* Input Username */}
            <div className="register-input-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                name="username"
                placeholder="Create your username"
                value={formData.username}
                onChange={handleInputChange}
                required
              />
            </div>

            {/* Input Password */}
            <div className="register-input-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Create your password"
                value={formData.password}
                onChange={handleInputChange}
                required
              />
            </div>

            {/* Input Konfirmasi Password */}
            <div className="register-input-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                required
              />
            </div>

            {/* Tombol Register dan Kembali */}
            <button type="submit" className="register-button">
              Register
            </button>
            <button
              type="button"
              className="back-to-login-button"
              onClick={() => navigate('/')}
            >
              Back to Log In
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
