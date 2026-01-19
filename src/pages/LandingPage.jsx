import React from 'react';
import { Link } from 'react-router-dom';
import { Header } from '../components/Header';
import '../styles/layout.css';
import '../styles/components.css';

export function LandingPage() {
  return (
    <>
      <Header hideNav={false} />
      <main style={{ paddingTop: 'var(--spacing-3xl)', paddingBottom: 'var(--spacing-3xl)' }}>
        <div className="container">
          {/* Hero Section */}
          <section style={{ textAlign: 'center', marginBottom: 'var(--spacing-3xl)' }}>
            <h1 style={{ fontSize: '2.5rem', marginBottom: 'var(--spacing-md)' }}>
              Smart Feasibility Analysis for Business Ideas
            </h1>
            <p style={{ fontSize: '1.125rem', color: 'var(--color-text-secondary)', marginBottom: 'var(--spacing-xl)', maxWidth: '600px', margin: '0 auto var(--spacing-xl)' }}>
              Business Feasibility Analyzer (BFA) helps entrepreneurs and teams quickly evaluate the viability of new business proposals. Upload documents, get intelligent analysis, and make confident decisions.
            </p>
            <div style={{ display: 'flex', gap: 'var(--spacing-md)', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link to="/demo-disclaimer" className="btn btn-primary btn-lg" style={{ width: 'auto', minWidth: '200px' }}>
                Try Demo
              </Link>
              <Link to="/feedback" className="btn btn-secondary btn-lg" style={{ width: 'auto', minWidth: '200px' }}>
                Give Feedback
              </Link>
            </div>
          </section>

          {/* Flow Illustration Section */}
          <section style={{ marginBottom: 'var(--spacing-3xl)' }}>
            <h2 style={{ textAlign: 'center', marginBottom: 'var(--spacing-2xl)' }}>How It Works</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 'var(--spacing-2xl)', maxWidth: '1000px', margin: '0 auto' }}>
              {/* Step 1 */}
              <div style={{ textAlign: 'center' }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '80px',
                  height: '80px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--color-primary-light)',
                  margin: '0 auto var(--spacing-lg)',
                  fontSize: '2rem'
                }}>
                  📄
                </div>
                <h3>Upload</h3>
                <p>Provide your business proposal document</p>
              </div>

              {/* Arrow */}
              <div style={{ textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontSize: '2rem', color: 'var(--color-primary)' }}>→</span>
              </div>

              {/* Step 2 */}
              <div style={{ textAlign: 'center' }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '80px',
                  height: '80px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--color-primary-light)',
                  margin: '0 auto var(--spacing-lg)',
                  fontSize: '2rem'
                }}>
                  🔍
                </div>
                <h3>Analyze</h3>
                <p>AI-powered intelligent analysis</p>
              </div>

              {/* Arrow */}
              <div style={{ textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontSize: '2rem', color: 'var(--color-primary)' }}>→</span>
              </div>

              {/* Step 3 */}
              <div style={{ textAlign: 'center' }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '80px',
                  height: '80px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--color-primary-light)',
                  margin: '0 auto var(--spacing-lg)',
                  fontSize: '2rem'
                }}>
                  📊
                </div>
                <h3>Review</h3>
                <p>Get detailed insights and recommendations</p>
              </div>

              {/* Arrow */}
              <div style={{ textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontSize: '2rem', color: 'var(--color-primary)' }}>→</span>
              </div>

              {/* Step 4 */}
              <div style={{ textAlign: 'center' }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '80px',
                  height: '80px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--color-primary-light)',
                  margin: '0 auto var(--spacing-lg)',
                  fontSize: '2rem'
                }}>
                  ✅
                </div>
                <h3>Decide</h3>
                <p>Make informed business decisions</p>
              </div>
            </div>
          </section>

          {/* Features Section */}
          <section style={{ marginBottom: 'var(--spacing-3xl)' }}>
            <h2 style={{ textAlign: 'center', marginBottom: 'var(--spacing-2xl)' }}>Key Features</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 'var(--spacing-xl)', maxWidth: '1000px', margin: '0 auto' }}>
              <div className="card">
                <h4 style={{ marginBottom: 'var(--spacing-md)' }}>📈 Market Analysis</h4>
                <p>Evaluate market size, competition, and growth potential with data-driven insights.</p>
              </div>
              <div className="card">
                <h4 style={{ marginBottom: 'var(--spacing-md)' }}>💰 Financial Assessment</h4>
                <p>Review financial projections and burn rates to assess sustainability.</p>
              </div>
              <div className="card">
                <h4 style={{ marginBottom: 'var(--spacing-md)' }}>⚠️ Risk Identification</h4>
                <p>Identify potential risks early and get mitigation strategies.</p>
              </div>
              <div className="card">
                <h4 style={{ marginBottom: 'var(--spacing-md)' }}>👥 Team Evaluation</h4>
                <p>Assess team experience, capabilities, and execution likelihood.</p>
              </div>
              <div className="card">
                <h4 style={{ marginBottom: 'var(--spacing-md)' }}>📋 Detailed Report</h4>
                <p>Get comprehensive analysis with actionable recommendations.</p>
              </div>
              <div className="card">
                <h4 style={{ marginBottom: 'var(--spacing-md)' }}>🔄 Collaboration</h4>
                <p>Share analyses with team members and collaborate on decisions.</p>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section style={{ textAlign: 'center', padding: 'var(--spacing-2xl)', backgroundColor: 'var(--color-primary-light)', borderRadius: 'var(--border-radius-lg)' }}>
            <h2 style={{ marginBottom: 'var(--spacing-md)' }}>Ready to Evaluate Your Idea?</h2>
            <p style={{ marginBottom: 'var(--spacing-lg)' }}>Try the BFA demo now. No signup required, no real data uploaded.</p>
            <Link to="/demo-disclaimer" className="btn btn-primary">
              Start Demo
            </Link>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer style={{ borderTop: '1px solid var(--color-border)', padding: 'var(--spacing-2xl)', marginTop: 'var(--spacing-3xl)', textAlign: 'center', color: 'var(--color-text-secondary)', fontSize: '13px' }}>
        <p>Business Feasibility Analyzer - Demo Only | All data is sample data</p>
      </footer>
    </>
  );
}
