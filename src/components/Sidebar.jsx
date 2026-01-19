import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/layout.css';

export function Sidebar({ role = 'employee', isOpen = true, onClose }) {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const employeeMenuItems = [
    { path: '/employee-dashboard', label: '📊 Dashboard' },
    { path: '/my-analyses', label: '📋 My Analyses' },
    { path: '/shared-workspaces', label: '🤝 Shared Workspaces' },
  ];

  const adminMenuItems = [
    { path: '/admin-dashboard', label: '📊 Dashboard' },
    { path: '/admin-create-analysis', label: '➕ Create Analysis' },
    { path: '/admin-employees', label: '👥 Employees' },
    { path: '/admin-analyses', label: '📋 Analyses' },
    { path: '/admin-workspaces', label: '🏢 Workspaces' },
    { path: '/admin-logs', label: '📋 Audit Logs' },
    { path: '/admin-settings', label: '⚙️ Settings' },
  ];

  const menuItems = role === 'admin' ? adminMenuItems : employeeMenuItems;

  const handleLinkClick = () => {
    if (onClose) onClose();
  };

  return (
    <aside className={`sidebar ${isOpen ? 'active' : ''}`}>
      <div className="sidebar-header">
        {onClose && (
          <button 
            className="sidebar-close-btn" 
            onClick={onClose} 
            aria-label="Close menu"
            style={{ marginLeft: 'auto' }}
          >
            ✕
          </button>
        )}
      </div>
      <nav className="sidebar-nav">
        {menuItems.map((item) => (
          <li
            key={item.path}
            className={`sidebar-nav-item ${isActive(item.path) ? 'active' : ''}`}
          >
            <Link to={item.path} className="sidebar-nav-link" onClick={handleLinkClick}>
              {item.label}
            </Link>
          </li>
        ))}
      </nav>
      <div style={{ padding: '0 var(--spacing-lg)', marginTop: 'auto', borderTop: '1px solid var(--color-border)', paddingTop: 'var(--spacing-lg)' }}>
        <button
          onClick={() => {
            window.location.href = '/';
            if (onClose) onClose();
          }}
          className="btn btn-secondary btn-sm btn-block"
          style={{ marginTop: 'var(--spacing-md)' }}
        >
          Logout
        </button>
      </div>
    </aside>
  );
}
