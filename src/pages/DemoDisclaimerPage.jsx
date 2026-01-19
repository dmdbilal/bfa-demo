import React from 'react';
import { Link } from 'react-router-dom';
import { Header } from '../components/Header';
import '../styles/layout.css';
import '../styles/components.css';

export function DemoDisclaimerPage() {
  return (
    <>
      <Header hideNav={true} />
      <main className="main-content main-content-no-sidebar" style={{ minHeight: 'calc(100vh - 60px)', justifyContent: 'center', alignItems: 'center' }}>
        <div className="card" style={{ maxWidth: '500px', width: '100%' }}>
          <div className="card-header">
            <h1 style={{ marginBottom: 0 }}>⚠️ Demo Mode</h1>
          </div>
          <div className="card-body">
            <p style={{ marginBottom: 'var(--spacing-lg)' }}>This is a demonstration of the Business Feasibility Analyzer. Please note:</p>
            <ul style={{ marginLeft: 'var(--spacing-lg)', marginBottom: 'var(--spacing-lg)' }}>
              <li style={{ marginBottom: 'var(--spacing-md)' }}>
                <strong>No real files are uploaded.</strong> All file uploads are simulated.
              </li>
              <li style={{ marginBottom: 'var(--spacing-md)' }}>
                <strong>No real analysis is performed.</strong> Results are sample data for demonstration purposes.
              </li>
              <li style={{ marginBottom: 'var(--spacing-md)' }}>
                <strong>Results are mock data.</strong> Not based on actual business evaluation.
              </li>
              <li>
                <strong>No real authentication.</strong> This is a UI demonstration only.
              </li>
            </ul>
            <div className="alert alert-info" style={{ marginBottom: 'var(--spacing-lg)' }}>
              ℹ️ This demo is designed to showcase the user interface and workflow. All interactions are simulated for evaluation purposes.
            </div>
          </div>
          <div className="card-footer">
            <Link to="/login" className="btn btn-primary btn-block">
              Continue to Demo
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
