import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Header } from '../components/Header';
import { Sidebar } from '../components/Sidebar';
import { useData } from '../context/DataContext';
import { useSidebar } from '../hooks/useSidebar';
import { formatRelativeTime } from '../utils/mockData';
import '../styles/layout.css';
import '../styles/components.css';

export function AdminEmployeesPage() {
  const { employees, getAnalysesByEmployee } = useData();
  const { sidebarOpen, toggleSidebar, closeSidebar } = useSidebar();
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  if (selectedEmployee) {
    const empAnalyses = getAnalysesByEmployee(selectedEmployee.id);
    const avgScore = empAnalyses.length > 0
      ? Math.round(empAnalyses.reduce((sum, a) => sum + a.score, 0) / empAnalyses.length)
      : 0;

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
          <button onClick={() => setSelectedEmployee(null)} className="btn btn-secondary btn-sm" style={{ marginBottom: 'var(--spacing-lg)' }}>
            ← Back to List
          </button>

          <div className="page-header">
            <h1>{selectedEmployee.name}</h1>
            <p className="page-subtitle">{selectedEmployee.role} • {selectedEmployee.email}</p>
          </div>

          <div className="grid grid-cols-3" style={{ marginBottom: 'var(--spacing-xl)' }}>
            <div className="metric-card">
              <div className="metric-value">{empAnalyses.length}</div>
              <div className="metric-label">Analyses Created</div>
            </div>
            <div className="metric-card">
              <div className="metric-value">{avgScore}%</div>
              <div className="metric-label">Average Score</div>
            </div>
            <div className="metric-card">
              <div className="metric-value" style={{ fontSize: '0.875rem' }}>
                <span className={`badge ${selectedEmployee.status === 'active' ? 'badge-success' : 'badge-warning'}`}>
                  {selectedEmployee.status}
                </span>
              </div>
              <div className="metric-label">Status</div>
            </div>
          </div>

          {empAnalyses.length > 0 && (
            <section>
              <h2 style={{ marginBottom: 'var(--spacing-lg)' }}>Recent Analyses</h2>
              <div style={{ display: 'grid', gap: 'var(--spacing-lg)' }}>
                {empAnalyses.slice(0, 5).map((analysis) => (
                  <div key={analysis.id} className="card">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <h4>{analysis.businessName}</h4>
                        <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)' }}>
                          {formatRelativeTime(analysis.createdAt)}
                        </p>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: '18px', fontWeight: 'bold', color: 'var(--color-primary)' }}>
                          {analysis.score}%
                        </div>
                        <p style={{ fontSize: '12px', marginBottom: 0 }}>{analysis.verdict}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </main>
      </div>
    </>
    );
  }

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
          <h1>Employees</h1>
          <p className="page-subtitle">Team member management and analytics</p>
        </div>

        <div style={{ display: 'grid', gap: 'var(--spacing-lg)' }}>
          {employees.map((emp) => (
            <div
              key={emp.id}
              className="card"
              onClick={() => setSelectedEmployee(emp)}
              style={{ cursor: 'pointer', transition: 'all var(--transition)' }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ flex: 1 }}>
                  <h4 style={{ marginBottom: 'var(--spacing-sm)' }}>{emp.name}</h4>
                  <p style={{ fontSize: '14px', color: 'var(--color-text-secondary)', marginBottom: 'var(--spacing-sm)' }}>
                    {emp.role}
                  </p>
                  <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)', marginBottom: 0 }}>
                    Last active: {formatRelativeTime(emp.lastActive)}
                  </p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <span className={`badge ${emp.status === 'active' ? 'badge-success' : 'badge-warning'}`}>
                    {emp.status}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
    </>
  );
}

export function AdminEmployeesPageOld() {
  return (
    <div className="layout">
      <Sidebar role="admin" />
      <main className="main-content">
        <div className="page-header">
          <h1>Employees</h1>
          <p className="page-subtitle">Manage team members</p>
        </div>
        <div className="card">
          <p>Employees management content coming soon...</p>
        </div>
      </main>
    </div>
  );
}
