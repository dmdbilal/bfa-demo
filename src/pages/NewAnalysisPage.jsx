import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '../components/Header';
import { Sidebar } from '../components/Sidebar';
import { useData } from '../context/DataContext';
import { createAnalysis } from '../utils/mockData';
import { useSidebar } from '../hooks/useSidebar';
import '../styles/layout.css';
import '../styles/components.css';

export function NewAnalysisPage() {
  const navigate = useNavigate();
  const { addAnalysis } = useData();
  const { sidebarOpen, toggleSidebar, closeSidebar } = useSidebar();
  const [formData, setFormData] = useState({
    businessName: '',
    founderName: '',
    experience: '',
  });
  const [dragActive, setDragActive] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    startAnalysis();
  };

  const startAnalysis = () => {
    if (formData.founderName.trim() && formData.experience.trim()) {
      const analysis = createAnalysis({
        businessName: formData.businessName,
        founderName: formData.founderName,
        experience: formData.experience,
        createdBy: 'emp_1',
        createdByName: 'Alex Johnson',
      });
      addAnalysis(analysis);
      sessionStorage.setItem('currentAnalysisId', analysis.id);
      navigate('/analysis-processing');
    } else {
      alert('Please fill in all fields');
    }
  };

  const handleUseSampleFiles = () => {
    // Populate form with sample data
    setFormData({
      businessName: 'CloudSync Technologies',
      founderName: 'Emily Rodriguez',
      experience: 'experienced',
    });
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
            <h1>New Analysis</h1>
            <p className="page-subtitle">Upload a business proposal document to analyze</p>
          </div>

          <div className="card" style={{ maxWidth: '800px' }}>
            {/* Upload Box */}
            <div
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              style={{
                border: `2px dashed ${dragActive ? 'var(--color-primary)' : 'var(--color-border)'}`,
                borderRadius: 'var(--border-radius-lg)',
                padding: 'var(--spacing-2xl)',
                textAlign: 'center',
                cursor: 'pointer',
                backgroundColor: dragActive ? 'var(--color-primary-light)' : 'var(--color-gray-50)',
                transition: 'all var(--transition)',
                marginBottom: 'var(--spacing-lg)',
              }}
            >
              <div style={{ fontSize: '2.5rem', marginBottom: 'var(--spacing-md)' }}>📁</div>
              <h3 style={{ marginBottom: 'var(--spacing-sm)' }}>Drag and drop your file here</h3>
              <p style={{ color: 'var(--color-text-secondary)', marginBottom: 'var(--spacing-md)' }}>
                or click to browse (Demo: No real file upload)
              </p>
              <button
                className="btn btn-tertiary"
                onClick={() => startAnalysis()}
              >
                Browse Files
              </button>
            </div>

            <div style={{ textAlign: 'center', marginBottom: 'var(--spacing-lg)' }}>
              <button onClick={handleUseSampleFiles} className="btn btn-secondary">
                Use Sample Files
              </button>
            </div>

            <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: 'var(--spacing-lg)', marginTop: 'var(--spacing-lg)' }}>
              {/* Form Fields */}
              <div className="form-group">
                <label htmlFor="businessName">Business Name</label>
                <input
                  type="text"
                  id="businessName"
                  name="businessName"
                  className="form-control"
                  placeholder="e.g., My Startup Inc"
                  value={formData.businessName}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="founderName">Founder Name *</label>
                <input
                  type="text"
                  id="founderName"
                  name="founderName"
                  className="form-control"
                  placeholder="e.g., John Smith"
                  value={formData.founderName}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="experience">Experience Level *</label>
                <select
                  id="experience"
                  name="experience"
                  className="form-control"
                  value={formData.experience}
                  onChange={handleInputChange}
                >
                  <option value="">Select experience level</option>
                  <option value="first-time">First-time founder</option>
                  <option value="experienced">1-3 years experience</option>
                  <option value="serial">Serial entrepreneur</option>
                </select>
              </div>

              <button
                onClick={startAnalysis}
                className="btn btn-primary btn-block"
                style={{ marginTop: 'var(--spacing-lg)' }}
              >
                Start Analysis
              </button>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
