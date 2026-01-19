import React from 'react';
import { Link } from 'react-router-dom';
import { Header } from '../components/Header';
import { Sidebar } from '../components/Sidebar';
import { useData } from '../context/DataContext';
import { useSidebar } from '../hooks/useSidebar';
import '../styles/layout.css';
import '../styles/components.css';

export function AdminWorkspacesPage() {
  const { workspaces, employees, getAllAnalyses } = useData();
  const { sidebarOpen, toggleSidebar, closeSidebar } = useSidebar();
  const analyses = getAllAnalyses();

  const getWorkspaceData = (ws) => {
    const members = ws.members.map((memberId) => {
      const emp = employees.find((e) => e.id === memberId);
      return emp ? emp.name : 'Unknown';
    });
    const workspaceAnalyses = analyses.filter((a) => a.workspaceId === ws.id);
    return { members, analysisCount: workspaceAnalyses.length };
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
          <h1>Workspaces</h1>
          <p className="page-subtitle">Team collaboration spaces</p>
        </div>

        {workspaces.length === 0 ? (
          <div className="card" style={{ textAlign: 'center', padding: 'var(--spacing-xl)' }}>
            <p>No workspaces yet</p>
          </div>
        ) : (
          <div style={{ display: 'grid', gap: 'var(--spacing-lg)' }}>
            {workspaces.map((ws) => {
              const data = getWorkspaceData(ws);
              return (
                <div key={ws.id} className="card">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                    <div style={{ flex: 1 }}>
                      <h4 style={{ marginBottom: 'var(--spacing-md)' }}>{ws.name}</h4>
                      <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)', marginBottom: 'var(--spacing-sm)' }}>
                        Members: {data.members.join(', ')}
                      </p>
                      <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)', marginBottom: 0 }}>
                        {data.analysisCount} analysis {data.analysisCount !== 1 ? 'analyses' : 'analysis'}
                      </p>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div className="metric-card" style={{ minWidth: '100px' }}>
                        <div className="metric-value">{data.members.length}</div>
                        <div className="metric-label">Members</div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
        </main>
      </div>
    </>
  );
}
