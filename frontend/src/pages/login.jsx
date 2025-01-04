import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api'; // Pastikan path sudah benar
import './login.css';
import loginImage from 'src/assets/ruanganLogin.jpg';

function Login() {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [errorMessage, setErrorMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/auth/login', credentials);
      const { user } = response.data;

      // Simpan role pengguna di localStorage
      localStorage.setItem('role', user.role);

      // Redirect berdasarkan role
      if (user.role === 'staff') {
        navigate('/dashboard'); // Halaman Staff
      } else if (user.role === 'user') {
        navigate('/reservasi'); // Halaman User
      }
    } catch (error) {
      console.error('Login failed:', error.response || error.message);
      setErrorMessage(error.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="login-container">
      {/* Sisi Kiri: Gambar */}
      <div className="login-left">
        <img src={loginImage} alt="Office Space" className="login-image" />
      </div>

      {/* Sisi Kanan: Form */}
      <div className="login-right">
        <div className="login-card">
          <h4 className="login-title">Welcome Back!</h4>
          <form onSubmit={handleLogin}>
            {/* Input Username */}
            <div className="login-input-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                name="username"
                value={credentials.username}
                onChange={handleInputChange}
                required
              />
            </div>

            {/* Input Password */}
            <div className="login-input-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={credentials.password}
                onChange={handleInputChange}
                required
              />
            </div>

            {/* Pesan Error */}
            {errorMessage && <p className="error-message">{errorMessage}</p>}

            {/* Tombol Login */}
            <button type="submit" className="login-button">Log In</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;