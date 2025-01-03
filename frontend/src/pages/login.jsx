import React from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css';
import loginImage from 'src/assets/ruanganLogin.jpg';

function Login() {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    navigate('/dashboard'); // Navigasi ke dashboard
  };

  const handleLupaPassword = () => {
    navigate('/lupa-password'); // Navigasi ke halaman lupa password
  };

  const handleRegister = () => {
    navigate('/register'); // Navigasi ke halaman register
  };

  return (
    <div className="login-container">
      {/* Sisi Kiri: Gambar */}
      <div className="login-left">
        <img
          src={loginImage} 
          alt="Office Space"
          className="login-image"
        />
      </div>

      {/* Sisi Kanan: Form */}
      <div className="login-right">
        <div className="login-card">
          <h4 className="login-title">Welcome Back!</h4>
          <p className="login-subtitle">Please enter your identity</p>

          <form onSubmit={handleLogin}>
            {/* Input Username */}
            <div className="login-input-group">
              <label htmlFor="username">Username</label>
              <input type="text" id="username" required />
            </div>

            {/* Input Password */}
            <div className="login-input-group">
              <label htmlFor="password">Password</label>
              <input type="password" id="password" required />
            </div>

            {/* Tombol Log in */}
            <button type="submit" className="login-button">Log In</button>
          </form>

          {/* Tautan Lupa Password dan Register */}
          <div className="login-links">
            <span onClick={handleLupaPassword} className="link">
              Forgot Password?
            </span>
            <span onClick={handleRegister} className="link">
              Register
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
