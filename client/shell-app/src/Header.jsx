// shell-app/src/Header.jsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function Header() {
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
      <div className="collapse navbar-collapse">
        <ul className="navbar-nav me-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/auth">Auth</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/community">Community</Link>
          </li>
          <li className="nav-item">
            <span className="nav-link disabled">Business</span>
          </li>
          <li className="nav-item">
            <span className="nav-link disabled">Events</span>
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
