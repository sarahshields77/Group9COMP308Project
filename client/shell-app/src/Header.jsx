// shell-app/src/Header.jsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useUserRole from './hooks/useUserRole';
import 'bootstrap/dist/css/bootstrap.min.css';

function Header() {
  const role = useUserRole(); // Custom hook to get logged-in user role
  const [darkMode, setDarkMode] = useState(() => {
    // Keep user preference in localStorage
    return localStorage.getItem("darkMode") === "true";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", darkMode ? "dark" : "light");
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  return (
    <nav className="navbar navbar-expand-lg shadow-sm px-4 mb-4 rounded">
      <Link className="navbar-brand fw-bold" to="/">🏡 Community Connect</Link>
      {/* Toggler for mobile view */}
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#mainNavbar"
        aria-controls="mainNavbar"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      {/* Collapsible content */}
      <div className="collapse navbar-collapse" id="mainNavbar">
        <ul className="navbar-nav me-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/community">Community</Link>
          </li>
          <li className="nav-item">
            <span className="nav-link disabled">Events</span>
          </li>
          <li className="nav-item">
            <span
              className="nav-link"
              style={{ cursor: "pointer" }}
              onClick={() => {
                document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                window.location.href = "/auth";
              }}
            >
              Logout
            </span>
          </li>
        </ul>

        <button
          onClick={() => setDarkMode(!darkMode)}
          className="btn btn-outline-secondary btn-sm"
        >
          {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
        </button>
      </div>
    </nav>
  );
}

export default Header;
