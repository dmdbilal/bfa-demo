import React from 'react';
import { Sidebar } from '../components/Sidebar';
import '../styles/layout.css';
import '../styles/components.css';

export function MyAnalysesPage() {
  return (
    <div className="layout">
      <Sidebar role="employee" />
      <main className="main-content">
        <div className="page-header">
          <h1>My Analyses</h1>
          <p className="page-subtitle">All your past feasibility analyses</p>
        </div>
        <div className="card">
          <p>My Analyses content coming soon...</p>
        </div>
      </main>
    </div>
  );
}

export function SharedWorkspacesPage() {
  return (
    <div className="layout">
      <Sidebar role="employee" />
      <main className="main-content">
        <div className="page-header">
          <h1>Shared Workspaces</h1>
          <p className="page-subtitle">Workspaces shared with your team</p>
        </div>
        <div className="card">
          <p>Shared Workspaces content coming soon...</p>
        </div>
      </main>
    </div>
  );
}
