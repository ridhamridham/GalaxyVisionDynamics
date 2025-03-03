import React from "react";
import { Link } from "react-router-dom";
import logo from "../Images/Logo.jpeg";
import { useState } from "react";

function Navbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  return (
    <>
      {/* Top Navbar */}
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container">
          {/* Brand with Logo */}
          <Link className="navbar-brand d-flex align-items-center" to="/">
            <img
              src={logo}
              alt="Galaxy Resort Logo"
              style={{
                height: "40px",
                width: "40px",
                borderRadius: "50%", // Makes it circular
                objectFit: "cover",
              }}
            />
            Galaxy Resort
          </Link>

          {/* Navbar Toggler for Mobile */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Navbar Links */}
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/booking">
                  Booking
                </Link>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  id="navbarDropdown"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded={isDropdownOpen}
                  onClick={toggleDropdown}
                >
                  Login
                </a>
                <div
                  className={`dropdown-menu ${isDropdownOpen ? "show" : ""}`}
                  aria-labelledby="navbarDropdown"
                >
                  <Link className="dropdown-item" to="/login">
                    User Login
                  </Link>
                  <Link className="dropdown-item" to="/admin-login">
                    Admin Login
                  </Link>
                </div>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to="/registration">
                  Registration
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/contact">
                  Contact Us
                </Link>
              </li>
              {/* Book Now Button */}
              <li className="nav-item">
                <Link className="btn btn-primary" to="/dashboard">
                  Book Now
                </Link>
              </li>
              <li className="nav-item">
                <Link className="btn btn-primary" to="/AdminDashboard">
                  Admin-Dashboard
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Theme Toggle Dropdown */}
      <div className="dropdown position-fixed bottom-0 end-0 mb-3 me-3 bd-mode-toggle">
        <button
          className="btn btn-bd-primary py-2 dropdown-toggle d-flex align-items-center"
          id="bd-theme"
          type="button"
          aria-expanded="false"
          data-bs-toggle="dropdown"
          aria-label="Toggle theme (auto)"
        >
          <svg className="bi my-1 theme-icon-active" width="1em" height="1em">
            <use href="#circle-half"></use>
          </svg>
          <span className="visually-hidden" id="bd-theme-text">
            Toggle theme
          </span>
        </button>
        <ul
          className="dropdown-menu dropdown-menu-end shadow"
          aria-labelledby="bd-theme-text"
        >
          <li>
            <button
              type="button"
              className="dropdown-item d-flex align-items-center"
              data-bs-theme-value="light"
              aria-pressed="false"
            >
              <svg className="bi me-2 opacity-50" width="1em" height="1em">
                <use href="#sun-fill"></use>
              </svg>
              Light
              <svg className="bi ms-auto d-none" width="1em" height="1em">
                <use href="#check2"></use>
              </svg>
            </button>
          </li>
          <li>
            <button
              type="button"
              className="dropdown-item d-flex align-items-center"
              data-bs-theme-value="dark"
              aria-pressed="false"
            >
              <svg className="bi me-2 opacity-50" width="1em" height="1em">
                <use href="#moon-stars-fill"></use>
              </svg>
              Dark
              <svg className="bi ms-auto d-none" width="1em" height="1em">
                <use href="#check2"></use>
              </svg>
            </button>
          </li>
          <li>
            <button
              type="button"
              className="dropdown-item d-flex align-items-center active"
              data-bs-theme-value="auto"
              aria-pressed="true"
            >
              <svg className="bi me-2 opacity-50" width="1em" height="1em">
                <use href="#circle-half"></use>
              </svg>
              Auto
              <svg className="bi ms-auto d-none" width="1em" height="1em">
                <use href="#check2"></use>
              </svg>
            </button>
          </li>
        </ul>
      </div>
    </>
  );
}

export default Navbar;
