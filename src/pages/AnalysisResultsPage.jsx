import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Header } from '../components/Header';
import { Sidebar } from '../components/Sidebar';
import { useData } from '../context/DataContext';
import { useSidebar } from '../hooks/useSidebar';
import { formatRelativeTime } from '../utils/mockData';
import '../styles/layout.css';
import '../styles/components.css';

export function AnalysisResultsPage() {
  const { id: analysisId } = useParams();
  const { getAnalysis, addAuditEvent } = useData();
  const { sidebarOpen, toggleSidebar, closeSidebar } = useSidebar();
  const analysis = getAnalysis(analysisId);

  useEffect(() => {
    if (analysis) {
      addAuditEvent('ANALYSIS_VIEWED', {
        analysisId: analysis.id,
        businessName: analysis.businessName,
      });
    }
  }, [analysisId]);

  if (!analysis) {
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
            <div className="card">
              <p>Analysis not found. <Link to="/employee-dashboard">Return to dashboard</Link></p>
            </div>
          </main>
        </div>
      </>
    );
  }

  const getSeverityBadgeClass = (severity) => {
    switch (severity) {
      case 'high':
        return 'badge-danger';
      case 'medium':
        return 'badge-warning';
      case 'low':
        return 'badge-success';
      default:
        return 'badge-primary';
    }
  };

  const getVerdictColor = (verdict) => {
    switch (verdict) {
      case 'Feasible':
        return 'var(--color-success)';
      case 'Conditional':
        return 'var(--color-warning)';
      case 'Not Recommended':
        return 'var(--color-danger)';
      default:
        return 'var(--color-primary)';
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
            <h1>Analysis Results</h1>
            <p className="page-subtitle">{analysis.businessName}</p>
            <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)' }}>
              Created by {analysis.createdByName} • {formatRelativeTime(analysis.createdAt)}
            </p>
          </div>

          {/* Final Verdict Card */}
          <div className="card" style={{ marginBottom: 'var(--spacing-xl)', borderLeft: `4px solid ${getVerdictColor(analysis.verdict)}` }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
              <div>
                <h2 style={{ marginBottom: 'var(--spacing-sm)' }}>{analysis.verdict}</h2>
                <p style={{ color: 'var(--color-text-secondary)' }}>
                  This business idea has been evaluated and analyzed based on market, financial, and team factors.
                </p>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--color-primary)' }}>
                  {analysis.score}%
                </div>
                <p style={{ marginBottom: 0, fontSize: '13px', color: 'var(--color-text-secondary)' }}>Confidence</p>
              </div>
            </div>
          </div>

          {/* Metrics Grid */}
          <section style={{ marginBottom: 'var(--spacing-xl)' }}>
            <h2 style={{ marginBottom: 'var(--spacing-lg)' }}>Key Metrics</h2>
            <div className="grid grid-cols-3">
              <div className="metric-card">
                <div className="metric-value" style={{ color: 'var(--color-success)' }}>💪</div>
                <div className="metric-label">Market Opportunity</div>
                <div style={{ fontSize: '1.125rem', fontWeight: '600', marginTop: 'var(--spacing-sm)' }}>{analysis.marketOpportunity}</div>
              </div>
              <div className="metric-card">
                <div className="metric-value" style={{ color: 'var(--color-warning)' }}>⚖️</div>
                <div className="metric-label">Financial Health</div>
                <div style={{ fontSize: '1.125rem', fontWeight: '600', marginTop: 'var(--spacing-sm)' }}>{analysis.financialHealth}</div>
              </div>
              <div className="metric-card">
                <div className="metric-value" style={{ color: 'var(--color-primary)' }}>👥</div>
                <div className="metric-label">Team Readiness</div>
                <div style={{ fontSize: '1.125rem', fontWeight: '600', marginTop: 'var(--spacing-sm)' }}>{analysis.teamReadiness}</div>
              </div>
            </div>
          </section>

          {/* Risks Section */}
          <section style={{ marginBottom: 'var(--spacing-xl)' }}>
            <h2 style={{ marginBottom: 'var(--spacing-lg)' }}>Top Risks</h2>
            <div style={{ display: 'grid', gap: 'var(--spacing-lg)' }}>
              {analysis.risks.map((risk, idx) => (
                <div key={idx} className="card">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                    <div style={{ flex: 1 }}>
                      <h4 style={{ marginBottom: 'var(--spacing-sm)' }}>{risk.title}</h4>
                      <p style={{ fontSize: '14px', color: 'var(--color-text-secondary)' }}>{risk.description}</p>
                    </div>
                    <span className={`badge ${getSeverityBadgeClass(risk.severity)}`} style={{ marginLeft: 'var(--spacing-md)' }}>
                      {risk.severity}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Recommendations */}
          <section style={{ marginBottom: 'var(--spacing-xl)' }}>
            <h2 style={{ marginBottom: 'var(--spacing-lg)' }}>Recommendations</h2>
            <div className="card" style={{ backgroundColor: 'var(--color-primary-light)' }}>
              <ol style={{ marginLeft: 'var(--spacing-lg)', marginBottom: 0 }}>
                {analysis.recommendations.map((rec, idx) => (
                  <li key={idx} style={{ marginBottom: 'var(--spacing-md)' }}>
                    {rec}
                  </li>
                ))}
              </ol>
            </div>
          </section>

          {/* Action Buttons */}
          <section style={{ display: 'flex', gap: 'var(--spacing-md)', flexWrap: 'wrap' }}>
            <button className="btn btn-primary">
              Share to Workspace
            </button>
            <div className="tooltip-container">
              <button className="btn btn-disabled" style={{ cursor: 'not-allowed' }}>
                Export PDF
              </button>
              <span className="tooltip-text">PDF export not available in demo</span>
            </div>
            <Link to="/employee-dashboard" className="btn btn-secondary">
              Back to Dashboard
            </Link>
          </section>
        </main>
      </div>
    </>
  );
}
