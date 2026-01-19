import React, { useState } from 'react';
import { Sidebar } from './Sidebar';
import '../styles/layout.css';

export function Layout({ role = 'employee', children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleMenuToggle = (isOpen) => {
    setSidebarOpen(isOpen);
  };

  const handleSidebarClose = () => {
    setSidebarOpen(false);
  };

  return (
    <div className="layout">
      {/* Mobile overlay for sidebar */}
      {sidebarOpen && (
        <div
          className="sidebar-overlay"
          onClick={handleSidebarClose}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 97,
          }}
        />
      )}
      <Sidebar
        role={role}
        isOpen={sidebarOpen}
        onClose={handleSidebarClose}
      />
      <main className="main-content">
        {children}
      </main>
    </div>
  );
}
