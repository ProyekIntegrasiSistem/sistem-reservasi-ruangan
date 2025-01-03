import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './lupaPassword.css';
import loginImage from 'src/assets/ruanganLogin.jpg';

function LupaPassword() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    newPassword: '',
    confirmPassword: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleResetPassword = (e) => {
    e.preventDefault();

    if (formData.newPassword !== formData.confirmPassword) {
      alert('Password baru dan konfirmasi password tidak cocok!');
      return;
    }

    // Simulasi penyimpanan data
    console.log('Password berhasil diubah untuk username:', formData.username);
    alert('Password berhasil diubah!');
    navigate('/'); // Arahkan kembali ke halaman log in
  };

  return (
    <div className="forgot-password-container">
      {/* Sisi Kiri: Gambar */}
      <div className="forgot-password-left">
        <img
          src={loginImage}
          alt="Office Space"
          className="forgot-password-image"
        />
      </div>

      {/* Sisi Kanan: Form */}
      <div className="forgot-password-right">
        <div className="forgot-password-card">
          <h4 className="forgot-password-title">Reset Password</h4>
          <p className="forgot-password-subtitle">
            Please enter your username and set a new password.
          </p>

          <form onSubmit={handleResetPassword}>
            {/* Input Username */}
            <div className="forgot-password-input-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                name="username"
                placeholder="Enter your username"
                value={formData.username}
                onChange={handleInputChange}
                required
              />
            </div>

            {/* Input Password Baru */}
            <div className="forgot-password-input-group">
              <label htmlFor="newPassword">New Password</label>
              <input
                type="password"
                id="newPassword"
                name="newPassword"
                placeholder="Enter new password"
                value={formData.newPassword}
                onChange={handleInputChange}
                required
              />
            </div>

            {/* Input Konfirmasi Password Baru */}
            <div className="forgot-password-input-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Confirm new password"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                required
              />
            </div>

            {/* Tombol Reset dan Kembali */}
            <button type="submit" className="forgot-password-button">
              Reset Password
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

export default LupaPassword;
