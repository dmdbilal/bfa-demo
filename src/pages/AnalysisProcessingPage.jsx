import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useData } from '../context/DataContext';
import '../styles/layout.css';
import '../styles/components.css';

export function AnalysisProcessingPage() {
  const navigate = useNavigate();
  const { updateAnalysis } = useData();
  const [currentStep, setCurrentStep] = useState(0);
  const analysisId = sessionStorage.getItem('currentAnalysisId');

  const steps = [
    { id: 0, label: 'Extracting proposal text' },
    { id: 1, label: 'Normalizing financial data' },
    { id: 2, label: 'Analyzing competitors' },
    { id: 3, label: 'Scoring feasibility' },
  ];

  useEffect(() => {
    // Simulate processing steps sequentially
    const timer = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev < steps.length - 1) {
          return prev + 1;
        } else {
          // All steps completed, update analysis status and redirect
          clearInterval(timer);
          if (analysisId) {
            updateAnalysis(analysisId, { status: 'completed' });
          }
          setTimeout(() => {
            navigate(`/analysis-results/${analysisId}`);
          }, 500);
          return prev;
        }
      });
    }, 1500);

    return () => clearInterval(timer);
  }, [navigate, steps.length, analysisId, updateAnalysis]);

  if (!analysisId) {
    return (
      <main
        className="main-content main-content-no-sidebar"
        style={{
          minHeight: '100vh',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'var(--color-gray-50)',
        }}
      >
        <div className="card" style={{ maxWidth: '600px', width: '100%', textAlign: 'center' }}>
          <p>Error: No analysis found. <a href="/employee-dashboard">Return to dashboard</a></p>
        </div>
      </main>
    );
  }

  return (
    <main
      className="main-content main-content-no-sidebar"
      style={{
        minHeight: '100vh',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'var(--color-gray-50)',
      }}
    >
      <div className="card" style={{ maxWidth: '600px', width: '100%' }}>
        <div className="card-header">
          <h1 style={{ marginBottom: 0, textAlign: 'center' }}>Analyzing Proposal</h1>
        </div>

        <div className="card-body">
          <ul className="checklist">
            {steps.map((step, idx) => {
              let status = 'pending';
              if (idx < currentStep) {
                status = 'completed';
              } else if (idx === currentStep) {
                status = 'loading';
              }

              return (
                <li key={step.id} className="checklist-item">
                  <div
                    className={`checklist-icon ${status === 'completed' ? 'completed' : status === 'loading' ? 'loading' : ''}`}
                  >
                    {status === 'completed' ? '✓' : status === 'loading' ? <div className="spinner" style={{ marginLeft: '-4px' }} /> : ''}
                  </div>
                  <div className="checklist-text">
                    <p style={{ marginBottom: 0, fontWeight: status === 'loading' ? '600' : '400', color: status === 'pending' ? 'var(--color-text-secondary)' : 'inherit' }}>
                      {step.label}
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>

          <div style={{ textAlign: 'center', marginTop: 'var(--spacing-xl)', color: 'var(--color-text-secondary)' }}>
            <p>Please wait…</p>
          </div>
        </div>
      </div>
    </main>
  );
}
