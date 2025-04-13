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
    <div className="fixed-width-nav-container">
      <nav className="navbar navbar-expand-lg shadow-sm px-4 mb-4">
        <div className="container">
          {/* Logo on far left */}
          <Link className="navbar-brand fw-bold" to="/">🏡 Community Connect</Link>

          {/* Navigation links in the middle */}
          <div className="navbar-center-wrapper">
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

            <div className="collapse navbar-collapse justify-content-center" id="mainNavbar">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link className="nav-link" to="/community">Community</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/community/events">Events</Link>
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
            </div>
          </div>
          
          {/* Theme Toggle Button on far right */}
          <div className="theme-toggle-wrapper ms-auto">
            <button 
              onClick={() => setDarkMode(!darkMode)}
              className={`theme-toggle ${darkMode ? 'dark' : 'light'}`}
              aria-label={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              <div className="toggle-track">
                <div className="toggle-sun">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M8 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0zm0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13zm8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5zM3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8zm10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0zm-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zm9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707zM4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708z"/>
                  </svg>
                </div>
                <div className="toggle-moon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M6 .278a.768.768 0 0 1 .08.858 7.208 7.208 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277.527 0 1.04-.055 1.533-.16a.787.787 0 0 1 .81.316.733.733 0 0 1-.031.893A8.349 8.349 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.752.752 0 0 1 6 .278z"/>
                  </svg>
                </div>
                <div className="toggle-thumb"></div>
              </div>
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Header;
