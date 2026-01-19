import React from 'react';
import { Header } from '../components/Header';
import { Sidebar } from '../components/Sidebar';
import { useData } from '../context/DataContext';
import { useSidebar } from '../hooks/useSidebar';
import '../styles/layout.css';
import '../styles/components.css';

export function AdminSettingsPage() {
  const { resetData } = useData();
  const { sidebarOpen, toggleSidebar, closeSidebar } = useSidebar();

  const handleReset = () => {
    if (confirm('Are you sure? This will clear all demo data and reset to initial state.')) {
      resetData();
    }
  };

  return (
    <>
      <Header hideNav={false} onMenuToggle={toggleSidebar} />
      <div className="layout">
        {sidebarOpen && (
          <div
            className="sidebar-overlay"
            onClick={closeSidebar}
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
        <Sidebar role="admin" isOpen={sidebarOpen} onClose={closeSidebar} />
      <main className="main-content">
        <div className="page-header">
          <h1>Settings</h1>
          <p className="page-subtitle">System configuration and admin controls</p>
        </div>

        {/* Company Settings */}
        <section style={{ marginBottom: 'var(--spacing-xl)' }}>
          <h2 style={{ marginBottom: 'var(--spacing-lg)' }}>Company Settings</h2>
          <div className="card">
            <div className="form-group">
              <label>Company Name</label>
              <input
                type="text"
                className="form-control"
                value="Business Feasibility Analyzer (BFA)"
                disabled
                style={{ backgroundColor: 'var(--color-gray-50)' }}
              />
            </div>
            <div className="form-group">
              <label>Demo Mode</label>
              <input
                type="text"
                className="form-control"
                value="Active"
                disabled
                style={{ backgroundColor: 'var(--color-gray-50)' }}
              />
              <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)', marginTop: 'var(--spacing-sm)' }}>
                This is a demo environment. No real data is stored or processed.
              </p>
            </div>
          </div>
        </section>

        {/* Data Management */}
        <section style={{ marginBottom: 'var(--spacing-xl)' }}>
          <h2 style={{ marginBottom: 'var(--spacing-lg)' }}>Data Management</h2>
          <div className="card">
            <p style={{ marginBottom: 'var(--spacing-lg)', color: 'var(--color-text-secondary)' }}>
              All demo data is stored in your browser's local storage. You can reset it at any time.
            </p>
            <button onClick={handleReset} className="btn btn-danger">
              🗑️ Reset All Demo Data
            </button>
            <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)', marginTop: 'var(--spacing-md)' }}>
              This will clear all created analyses and return to initial mock data.
            </p>
          </div>
        </section>

        {/* API & Integration */}
        <section>
          <h2 style={{ marginBottom: 'var(--spacing-lg)' }}>About This Demo</h2>
          <div className="card">
            <ul style={{ marginLeft: 'var(--spacing-lg)', marginBottom: 0 }}>
              <li style={{ marginBottom: 'var(--spacing-md)' }}>
                <strong>Frontend Only:</strong> No backend server or API calls
              </li>
              <li style={{ marginBottom: 'var(--spacing-md)' }}>
                <strong>Local Storage:</strong> All data persists in your browser
              </li>
              <li style={{ marginBottom: 'var(--spacing-md)' }}>
                <strong>No Authentication:</strong> No real login required
              </li>
              <li style={{ marginBottom: 'var(--spacing-md)' }}>
                <strong>Mock Data:</strong> All analyses use simulated results
              </li>
              <li>
                <strong>UI-Only Interactions:</strong> File uploads and AI analysis are simulated
              </li>
            </ul>
          </div>
        </section>
        </main>
      </div>
    </>
  );
}
