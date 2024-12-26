import React from "react";
import { Link } from "react-router-dom";
import "./navbar.css";
import logoImage from 'src/assets/logo.png';

function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light px-4">
          {/* Logo */}
          <div className="navbar-brand fw-bold d-flex align-items-center">
            <img src={logoImage} alt= "Logo Rentroom" className="logo-image" />
          </div>

          {/* Navigasi */}
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link" to="/dashboard"> Dashboard
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/ruangan"> Ruangan
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/pinjaman"> Pinjaman
                </Link>
              </li>
            </ul>

            {/* Tombol Logout */}
            <button className="btn btn-danger ms-auto"
            onClick={() => (window.location.href = "/")}>
              <i className="bi bi-box-arrow-right"></i> Log out
            </button>
          </div>
        </nav>
      );
}

export default Navbar;
