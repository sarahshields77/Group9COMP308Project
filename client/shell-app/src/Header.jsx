import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function Header() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm px-4 mb-4 rounded">
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
      </div>
    </nav>
  );
}

export default Header;
