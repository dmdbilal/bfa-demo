import React, { createContext, useState, useEffect, useCallback } from 'react';
import { mockEmployees, mockWorkspaces, createAuditEvent } from '../utils/mockData';

export const DataContext = createContext();

const STORAGE_KEY = 'bfa_demo_data';
const AUDIT_KEY = 'bfa_audit_log';

const initialState = {
  analyses: [],
  auditLog: [],
  employees: mockEmployees,
  workspaces: mockWorkspaces,
};

export function DataProvider({ children }) {
  const [state, setState] = useState(initialState);
  const [notifications, setNotifications] = useState([]);

  // Load from localStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem(STORAGE_KEY);
    if (savedData) {
      try {
        setState(JSON.parse(savedData));
      } catch (e) {
        console.error('Failed to load data:', e);
      }
    }
  }, []);

  // Save to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const addAnalysis = useCallback((analysis) => {
    setState((prev) => {
      const updated = { ...prev, analyses: [...prev.analyses, analysis] };
      return updated;
    });
    addAuditEvent('ANALYSIS_CREATED', {
      analysisId: analysis.id,
      businessName: analysis.businessName,
      createdBy: analysis.createdBy,
    });
    showNotification(`Analysis "${analysis.businessName}" created successfully`);
  }, []);

  const updateAnalysis = useCallback((analysisId, updates) => {
    setState((prev) => ({
      ...prev,
      analyses: prev.analyses.map((a) =>
        a.id === analysisId ? { ...a, ...updates } : a
      ),
    }));
  }, []);

  const getAnalysis = useCallback((analysisId) => {
    return state.analyses.find((a) => a.id === analysisId);
  }, [state.analyses]);

  const getAllAnalyses = useCallback(() => {
    return state.analyses;
  }, [state.analyses]);

  const getAnalysesByEmployee = useCallback((employeeId) => {
    return state.analyses.filter((a) => a.createdBy === employeeId);
  }, [state.analyses]);

  const addAuditEvent = useCallback((action, details) => {
    const event = createAuditEvent(action, details);
    setState((prev) => ({
      ...prev,
      auditLog: [event, ...prev.auditLog],
    }));
  }, []);

  const getAuditLog = useCallback((limit = 50) => {
    return state.auditLog.slice(0, limit);
  }, [state.auditLog]);

  const getMetrics = useCallback(() => {
    return {
      activeEmployees: state.employees.filter((e) => e.status === 'active').length,
      totalEmployees: state.employees.length,
      totalAnalyses: state.analyses.length,
      averageScore: state.analyses.length > 0
        ? Math.round(state.analyses.reduce((sum, a) => sum + a.score, 0) / state.analyses.length)
        : 0,
      analysesThisMonth: state.analyses.filter((a) => {
        const analysisMonth = new Date(a.createdAt).getMonth();
        const analysisYear = new Date(a.createdAt).getFullYear();
        const now = new Date();
        return analysisMonth === now.getMonth() && analysisYear === now.getFullYear();
      }).length,
      verdictCounts: {
        feasible: state.analyses.filter((a) => a.verdict === 'Feasible').length,
        conditional: state.analyses.filter((a) => a.verdict === 'Conditional').length,
        notRecommended: state.analyses.filter((a) => a.verdict === 'Not Recommended').length,
        adjustments: state.analyses.filter((a) => a.verdict === 'Feasible with Adjustments').length,
      },
    };
  }, [state.analyses, state.employees]);

  const showNotification = useCallback((message, type = 'success') => {
    const id = Math.random().toString(36).substr(2, 9);
    setNotifications((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setNotifications((prev) => prev.filter((n) => n.id !== id));
    }, 3000);
  }, []);

  const resetData = useCallback(() => {
    setState(initialState);
    localStorage.removeItem(STORAGE_KEY);
    showNotification('Demo data reset successfully', 'info');
  }, []);

  const getRecentActivity = useCallback((limit = 10) => {
    return state.auditLog.slice(0, limit);
  }, [state.auditLog]);

  const value = {
    // State
    analyses: state.analyses,
    employees: state.employees,
    workspaces: state.workspaces,
    auditLog: state.auditLog,
    notifications,

    // Analysis operations
    addAnalysis,
    updateAnalysis,
    getAnalysis,
    getAllAnalyses,
    getAnalysesByEmployee,

    // Audit operations
    addAuditEvent,
    getAuditLog,
    getRecentActivity,

    // Metrics
    getMetrics,

    // Notifications
    showNotification,

    // Admin
    resetData,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}

export function useData() {
  const context = React.useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within DataProvider');
  }
  return context;
}
