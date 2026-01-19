import React from 'react';
import { Link } from 'react-router-dom';
import { Header } from '../components/Header';
import { Sidebar } from '../components/Sidebar';
import { useData } from '../context/DataContext';
import { formatRelativeTime } from '../utils/mockData';
import { useSidebar } from '../hooks/useSidebar';
import '../styles/layout.css';
import '../styles/components.css';

export function EmployeeDashboard() {
  const { getAnalysesByEmployee } = useData();
  const { sidebarOpen, toggleSidebar, closeSidebar } = useSidebar();
  const recentAnalyses = getAnalysesByEmployee('emp_1');

  const getVerdictBadgeClass = (verdict) => {
    switch (verdict) {
      case 'Feasible':
        return 'badge-success';
      case 'Conditional':
        return 'badge-warning';
      case 'Not Recommended':
        return 'badge-danger';
      default:
        return 'badge-primary';
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
        <Sidebar role="employee" isOpen={sidebarOpen} onClose={closeSidebar} />
        <main className="main-content">
          <div className="page-header">
            <h1>Welcome back, Alex 👋</h1>
            <p className="page-subtitle">Manage your feasibility analyses</p>
          </div>

          {/* Quick Action */}
          <div style={{ marginBottom: 'var(--spacing-xl)' }}>
            <Link to="/new-analysis" className="btn btn-primary">
              + New Analysis
            </Link>
          </div>

          {/* Recent Analyses */}
          <section>
            <h2 style={{ marginBottom: 'var(--spacing-lg)' }}>Recent Analyses</h2>
            {recentAnalyses.length === 0 ? (
              <div style={{ textAlign: 'center', padding: 'var(--spacing-2xl)', backgroundColor: 'var(--color-gray-50)', borderRadius: 'var(--border-radius-lg)' }}>
                <p>No analyses yet. <Link to="/new-analysis">Create your first analysis</Link></p>
              </div>
            ) : (
              <div style={{ display: 'grid', gap: 'var(--spacing-lg)' }}>
                {recentAnalyses.map((analysis) => (
                  <Link
                    key={analysis.id}
                    to={`/analysis-results/${analysis.id}`}
                    style={{ textDecoration: 'none' }}
                  >
                    <div className="card" style={{ cursor: 'pointer', transition: 'all var(--transition)' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 'var(--spacing-md)' }}>
                        <div>
                          <h4 style={{ marginBottom: 'var(--spacing-sm)' }}>{analysis.businessName}</h4>
                          <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)' }}>
                            {formatRelativeTime(analysis.createdAt)} • Founder: {analysis.founderName}
                          </p>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                          <div style={{ marginBottom: 'var(--spacing-sm)' }}>
                            <span className={`badge ${getVerdictBadgeClass(analysis.verdict)}`}>
                              {analysis.verdict}
                            </span>
                          </div>
                          <div style={{ fontSize: '18px', fontWeight: 'bold', color: 'var(--color-primary)' }}>
                            {analysis.score}%
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </section>
        </main>
      </div>
    </>
  );
}
