import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Header } from '../components/Header';
import { Sidebar } from '../components/Sidebar';
import { useData } from '../context/DataContext';
import { useSidebar } from '../hooks/useSidebar';
import { formatRelativeTime } from '../utils/mockData';
import '../styles/layout.css';
import '../styles/components.css';

export function AdminAnalysesPage() {
  const { getAllAnalyses, employees } = useData();
  const analyses = getAllAnalyses();
  const [filterBy, setFilterBy] = useState('all');
  const [verdictFilter, setVerdictFilter] = useState('all');

  let filtered = analyses;

  if (filterBy !== 'all') {
    filtered = filtered.filter((a) => a.createdBy === filterBy);
  }

  if (verdictFilter !== 'all') {
    filtered = filtered.filter((a) => a.verdict === verdictFilter);
  }

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

  const getCreatorName = (createdBy) => {
    if (createdBy === 'admin') return 'Admin';
    const emp = employees.find((e) => e.id === createdBy);
    return emp ? emp.name : 'Unknown';
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
            <h1>All Analyses</h1>
            <p className="page-subtitle">Company-wide analysis history</p>
          </div>

          {/* Filters */}
          <div className="grid grid-cols-2" style={{ marginBottom: 'var(--spacing-lg)', gap: 'var(--spacing-md)' }}>
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label htmlFor="filterBy">Filter by Owner</label>
              <select
                id="filterBy"
              className="form-control"
              value={filterBy}
              onChange={(e) => setFilterBy(e.target.value)}
            >
              <option value="all">All</option>
              <option value="admin">Admin</option>
              {employees.map((emp) => (
                <option key={emp.id} value={emp.id}>
                  {emp.name}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label htmlFor="verdictFilter">Filter by Verdict</label>
            <select
              id="verdictFilter"
              className="form-control"
              value={verdictFilter}
              onChange={(e) => setVerdictFilter(e.target.value)}
            >
              <option value="all">All</option>
              <option value="Feasible">Feasible</option>
              <option value="Conditional">Conditional</option>
              <option value="Feasible with Adjustments">With Adjustments</option>
              <option value="Not Recommended">Not Recommended</option>
            </select>
          </div>
        </div>

        {/* Results */}
        <div>
          <p style={{ color: 'var(--color-text-secondary)', marginBottom: 'var(--spacing-lg)' }}>
            Showing {filtered.length} of {analyses.length} analyses
          </p>

          {filtered.length === 0 ? (
            <div className="card" style={{ textAlign: 'center', padding: 'var(--spacing-xl)' }}>
              <p>No analyses found</p>
            </div>
          ) : (
            <div style={{ display: 'grid', gap: 'var(--spacing-lg)' }}>
              {filtered.map((analysis) => (
                <Link
                  key={analysis.id}
                  to={`/analysis-results/${analysis.id}`}
                  style={{ textDecoration: 'none' }}
                >
                  <div className="card" style={{ cursor: 'pointer', transition: 'all var(--transition)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', gap: 'var(--spacing-lg)' }}>
                      <div style={{ flex: 1 }}>
                        <h4 style={{ marginBottom: 'var(--spacing-sm)' }}>{analysis.businessName}</h4>
                        <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)', marginBottom: 'var(--spacing-sm)' }}>
                          By {getCreatorName(analysis.createdBy)} • Founder: {analysis.founderName}
                        </p>
                        <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)', marginBottom: 0 }}>
                          {formatRelativeTime(analysis.createdAt)}
                        </p>
                      </div>
                      <div style={{ textAlign: 'right', minWidth: '150px' }}>
                        <div style={{ marginBottom: 'var(--spacing-sm)' }}>
                          <span className={`badge ${getVerdictBadgeClass(analysis.verdict)}`}>
                            {analysis.verdict}
                          </span>
                        </div>
                        <div style={{ fontSize: '20px', fontWeight: 'bold', color: 'var(--color-primary)' }}>
                          {analysis.score}%
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
        </main>
      </div>
    </>
  );
}
