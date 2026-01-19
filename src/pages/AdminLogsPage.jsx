import React from 'react';
import { Header } from '../components/Header';
import { Sidebar } from '../components/Sidebar';
import { useData } from '../context/DataContext';
import { useSidebar } from '../hooks/useSidebar';
import { formatDate, formatRelativeTime } from '../utils/mockData';
import '../styles/layout.css';
import '../styles/components.css';

export function AdminLogsPage() {
  const { getAuditLog } = useData();
  const { sidebarOpen, toggleSidebar, closeSidebar } = useSidebar();
  const logs = getAuditLog(100);

  const getActionDescription = (event) => {
    switch (event.action) {
      case 'ANALYSIS_CREATED':
        return `📊 Analysis created: "${event.details.businessName}" by ${event.details.createdBy}`;
      case 'ANALYSIS_VIEWED':
        return `👁️ Analysis viewed: "${event.details.businessName}"`;
      default:
        return event.action;
    }
  };

  const getActionBadgeColor = (action) => {
    if (action.includes('CREATED')) return 'badge-success';
    if (action.includes('VIEWED')) return 'badge-primary';
    if (action.includes('DELETED')) return 'badge-danger';
    return 'badge-primary';
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
          <h1>Audit Logs</h1>
          <p className="page-subtitle">System activity and event history</p>
        </div>

        {logs.length === 0 ? (
          <div className="card" style={{ textAlign: 'center', padding: 'var(--spacing-xl)' }}>
            <p>No events logged yet</p>
          </div>
        ) : (
          <div style={{ display: 'grid', gap: 'var(--spacing-md)' }}>
            {logs.map((event) => (
              <div key={event.id} className="card" style={{ padding: 'var(--spacing-md) var(--spacing-lg)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', gap: 'var(--spacing-md)' }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ marginBottom: 'var(--spacing-sm)' }}>
                      <span className={`badge ${getActionBadgeColor(event.action)}`} style={{ marginRight: 'var(--spacing-sm)' }}>
                        {event.action}
                      </span>
                    </div>
                    <p style={{ marginBottom: 'var(--spacing-sm)', fontWeight: '500' }}>
                      {getActionDescription(event)}
                    </p>
                    <div style={{ display: 'flex', gap: 'var(--spacing-lg)', fontSize: '13px', color: 'var(--color-text-secondary)' }}>
                      <p style={{ marginBottom: 0 }}>{formatRelativeTime(event.timestamp)}</p>
                      <p style={{ marginBottom: 0 }}>{formatDate(event.timestamp)}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        </main>
      </div>
    </>
  );
}
