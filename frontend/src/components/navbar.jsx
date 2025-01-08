import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./navbar.css";
import logoImage from 'src/assets/logo.png';



function Navbar({onActionClick}) {
    const navigate = useNavigate();
    const role = localStorage.getItem('role');

    function handleLogout() {
      localStorage.removeItem("role");

      navigate('/admin/login');
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light px-4">
          {/* Logo */}
          <div className="navbar-brand fw-bold d-flex align-items-center">
            <img src={logoImage} alt= "Logo Rentroom" className="logo-image" />
          </div>

          {/* Navigasi */}
          <div className="collapse navbar-collapse">
            {(onActionClick == null) && <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link" to="/admin"> Dashboard </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/admin/ruangan"> Ruangan </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/admin/pinjaman"> Pinjaman </Link>
              </li>
            </ul>}
            

            {/* Tombol Logout */}
            {
              (onActionClick == null)
                ? <button 
                  className="btn btn-danger ms-auto"
                  onClick={handleLogout}
                >
                  <i className="bi bi-box-arrow-right"></i> Log out
                </button>
                : <button
                  className="btn btn-info ms-auto"
                  onClick={onActionClick}
                >
                  + Pinjam Ruangan
                </button>
            }
          </div>
        </nav>
      );
}

export default Navbar;
