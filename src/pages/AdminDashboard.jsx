import React from 'react';
import { Header } from '../components/Header';
import { Sidebar } from '../components/Sidebar';
import { useData } from '../context/DataContext';
import { formatRelativeTime } from '../utils/mockData';
import { useSidebar } from '../hooks/useSidebar';
import '../styles/layout.css';
import '../styles/components.css';

export function AdminDashboard() {
  const { employees, getMetrics, getRecentActivity } = useData();
  const { sidebarOpen, toggleSidebar, closeSidebar } = useSidebar();
  const metrics = getMetrics();
  const recentActivity = getRecentActivity(8);

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
            <h1>Admin Dashboard 📊</h1>
            <p className="page-subtitle">Company-wide insights and metrics</p>
          </div>

          {/* Metrics Cards */}
          <section style={{ marginBottom: 'var(--spacing-xl)' }}>
            <div className="grid grid-cols-4">
              <div className="metric-card">
                <div className="metric-value" style={{ color: 'var(--color-primary)' }}>
                  {metrics.activeEmployees}
                </div>
                <div className="metric-label">Active Employees</div>
              </div>
              <div className="metric-card">
                <div className="metric-value" style={{ color: 'var(--color-success)' }}>
                  {metrics.totalAnalyses}
                </div>
                <div className="metric-label">Total Analyses</div>
              </div>
              <div className="metric-card">
                <div className="metric-value" style={{ color: 'var(--color-warning)' }}>
                  {metrics.averageScore}%
                </div>
                <div className="metric-label">Avg Confidence</div>
              </div>
              <div className="metric-card">
                <div className="metric-value" style={{ color: 'var(--color-primary)' }}>
                  {metrics.analysesThisMonth}
                </div>
                <div className="metric-label">This Month</div>
              </div>
            </div>
          </section>

          {/* Verdict Distribution */}
          <section style={{ marginBottom: 'var(--spacing-xl)' }}>
            <h2 style={{ marginBottom: 'var(--spacing-lg)' }}>Verdict Distribution</h2>
            <div className="grid grid-cols-4">
              <div className="card" style={{ textAlign: 'center', backgroundColor: 'var(--color-success-light)' }}>
                <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--color-success)', marginBottom: 'var(--spacing-sm)' }}>
                  {metrics.verdictCounts.feasible}
                </div>
                <p style={{ marginBottom: 0, fontSize: '13px', color: 'var(--color-text-secondary)' }}>Feasible</p>
              </div>
              <div className="card" style={{ textAlign: 'center', backgroundColor: 'var(--color-warning-light)' }}>
                <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--color-warning)', marginBottom: 'var(--spacing-sm)' }}>
                  {metrics.verdictCounts.conditional}
                </div>
                <p style={{ marginBottom: 0, fontSize: '13px', color: 'var(--color-text-secondary)' }}>Conditional</p>
              </div>
              <div className="card" style={{ textAlign: 'center', backgroundColor: 'var(--color-primary-light)' }}>
                <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--color-primary)', marginBottom: 'var(--spacing-sm)' }}>
                  {metrics.verdictCounts.adjustments}
                </div>
                <p style={{ marginBottom: 0, fontSize: '13px', color: 'var(--color-text-secondary)' }}>With Adjustments</p>
              </div>
              <div className="card" style={{ textAlign: 'center', backgroundColor: 'var(--color-danger-light)' }}>
                <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--color-danger)', marginBottom: 'var(--spacing-sm)' }}>
                  {metrics.verdictCounts.notRecommended}
                </div>
                <p style={{ marginBottom: 0, fontSize: '13px', color: 'var(--color-text-secondary)' }}>Not Recommended</p>
              </div>
            </div>
          </section>

          {/* Recent Activity */}
          <section>
            <h2 style={{ marginBottom: 'var(--spacing-lg)' }}>Recent Activity</h2>
            {recentActivity.length === 0 ? (
              <div className="card" style={{ textAlign: 'center', padding: 'var(--spacing-xl)' }}>
                <p>No activity yet</p>
              </div>
            ) : (
              <div style={{ display: 'grid', gap: 'var(--spacing-sm)' }}>
                {recentActivity.map((event) => (
                  <div
                    key={event.id}
                    className="card"
                    style={{ padding: 'var(--spacing-md) var(--spacing-lg)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 'var(--spacing-md)' }}
                  >
                    <div>
                      <p style={{ marginBottom: 'var(--spacing-sm)', fontWeight: '500' }}>
                        {event.action === 'ANALYSIS_CREATED'
                          ? `📊 Analysis created: ${event.details.businessName}`
                          : event.action === 'ANALYSIS_VIEWED'
                          ? `👁️ Analysis viewed: ${event.details.businessName}`
                          : event.action}
                      </p>
                      <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)', marginBottom: 0 }}>
                        {formatRelativeTime(event.timestamp)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        </main>
      </div>
    </>
  );
}
