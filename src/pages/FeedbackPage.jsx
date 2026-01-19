import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Header } from '../components/Header';
import '../styles/layout.css';
import '../styles/components.css';

export function FeedbackPage() {
  const [feedback, setFeedback] = useState({ usefulness: '', suggestions: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleUsefulnessClick = (value) => {
    setFeedback((prev) => ({ ...prev, usefulness: value }));
  };

  const handleSuggestionsChange = (e) => {
    setFeedback((prev) => ({ ...prev, suggestions: e.target.value }));
  };

  const handleSubmit = () => {
    if (feedback.usefulness) {
      setSubmitted(true);
      setTimeout(() => {
        window.location.href = '/';
      }, 2000);
    }
  };

  return (
    <>
      <Header hideNav={true} />
      <main
        className="main-content main-content-no-sidebar"
        style={{
          minHeight: 'calc(100vh - 60px)',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <div className="card" style={{ maxWidth: '500px', width: '100%' }}>
          {!submitted ? (
            <>
              <div className="card-header">
                <h1 style={{ marginBottom: 0, textAlign: 'center' }}>Your Feedback Matters 💙</h1>
              </div>

              <div className="card-body">
                <div className="form-group">
                  <label style={{ marginBottom: 'var(--spacing-md)', display: 'block', textAlign: 'center', fontWeight: '600' }}>
                    Would this tool be useful to you?
                  </label>
                  <div style={{ display: 'flex', gap: 'var(--spacing-md)', marginBottom: 'var(--spacing-lg)' }}>
                    <button
                      onClick={() => handleUsefulnessClick('yes')}
                      className={`btn ${feedback.usefulness === 'yes' ? 'btn-primary' : 'btn-secondary'}`}
                      style={{ flex: 1 }}
                    >
                      Yes 👍
                    </button>
                    <button
                      onClick={() => handleUsefulnessClick('maybe')}
                      className={`btn ${feedback.usefulness === 'maybe' ? 'btn-primary' : 'btn-secondary'}`}
                      style={{ flex: 1 }}
                    >
                      Maybe 🤔
                    </button>
                    <button
                      onClick={() => handleUsefulnessClick('no')}
                      className={`btn ${feedback.usefulness === 'no' ? 'btn-primary' : 'btn-secondary'}`}
                      style={{ flex: 1 }}
                    >
                      No 👎
                    </button>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="suggestions">Any suggestions or feedback?</label>
                  <textarea
                    id="suggestions"
                    className="form-control"
                    placeholder="Tell us what you think..."
                    value={feedback.suggestions}
                    onChange={handleSuggestionsChange}
                  />
                </div>
              </div>

              <div className="card-footer">
                <button
                  onClick={handleSubmit}
                  disabled={!feedback.usefulness}
                  className="btn btn-primary btn-block"
                >
                  Submit Feedback
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="card-header">
                <h1 style={{ marginBottom: 0, textAlign: 'center' }}>Thank You! ✨</h1>
              </div>
              <div className="card-body" style={{ textAlign: 'center', padding: 'var(--spacing-xl)' }}>
                <p>Your feedback has been received. We appreciate your input!</p>
                <p style={{ marginBottom: 0, fontSize: '13px', color: 'var(--color-text-secondary)' }}>
                  Redirecting in 2 seconds...
                </p>
              </div>
            </>
          )}
        </div>
      </main>
    </>
  );
}
