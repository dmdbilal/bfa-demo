import React from 'react';
import { Link } from 'react-router-dom';
import { Header } from '../components/Header';
import '../styles/layout.css';
import '../styles/components.css';

export function LoginPage() {
  return (
    <>
      <Header hideNav={true} />
      <main className="main-content main-content-no-sidebar" style={{ minHeight: 'calc(100vh - 60px)', justifyContent: 'center', alignItems: 'center' }}>
        <div className="card" style={{ maxWidth: '500px', width: '100%' }}>
          <div className="card-header">
            <h1 style={{ marginBottom: 0, textAlign: 'center' }}>Sign In</h1>
          </div>
          <div className="card-body">
            <p style={{ textAlign: 'center', marginBottom: 'var(--spacing-xl)', color: 'var(--color-text-secondary)' }}>
              Demo only — no credentials required
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-md)' }}>
              <Link
                to="/employee-dashboard"
                className="btn btn-primary btn-lg"
              >
                Login as Employee
              </Link>
              <Link
                to="/admin-dashboard"
                className="btn btn-secondary btn-lg"
              >
                Login as Admin
              </Link>
            </div>
            <div style={{ marginTop: 'var(--spacing-xl)', padding: 'var(--spacing-md)', backgroundColor: 'var(--color-gray-50)', borderRadius: 'var(--border-radius-md)', textAlign: 'center', fontSize: '13px', color: 'var(--color-text-secondary)' }}>
              This is a simulated login. No credentials are required.
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
