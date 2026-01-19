import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/layout.css';

export function Header({ hideNav = false, onMenuToggle }) {
  const handleMenuClick = () => {
    if (onMenuToggle) {
      onMenuToggle();
    }
  };

  return (
    <header className="header">
      <div className="header-content">
        <Link to="/" className="logo">BFA</Link>
        {!hideNav && (
          <>
            <button
              className="mobile-menu-btn"
              onClick={handleMenuClick}
              aria-label="Toggle menu"
            >
              ☰
            </button>
            <ul className="nav-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/demo-disclaimer">Demo</Link></li>
              <li><Link to="/feedback">Feedback</Link></li>
            </ul>
          </>
        )}
      </div>
    </header>
  );
}
