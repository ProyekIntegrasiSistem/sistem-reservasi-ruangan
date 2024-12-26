import React from 'react'
import { useNavigate } from 'react-router-dom'
import './login.css'
import loginImage from 'src/assets/ruanganLogin.jpg'

function Login() {
  // Navigasi ke Dashboard
  const navigate = useNavigate()

  const handleLogin = (e) => {
    e.preventDefault();
    navigate('/dashboard')
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

            {/* Tombol Log in*/}
            <button type="submit" className="login-button">Log In</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login
