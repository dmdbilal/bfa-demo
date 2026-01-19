import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './styles/globals.css';
import './styles/components.css';
import './styles/layout.css';
import './App.css';

// Context & Components
import { DataProvider } from './context/DataContext';
import { Toast } from './components/Toast';

// Pages
import { LandingPage } from './pages/LandingPage';
import { DemoDisclaimerPage } from './pages/DemoDisclaimerPage';
import { LoginPage } from './pages/LoginPage';
import { EmployeeDashboard } from './pages/EmployeeDashboard';
import { NewAnalysisPage } from './pages/NewAnalysisPage';
import { AnalysisProcessingPage } from './pages/AnalysisProcessingPage';
import { AnalysisResultsPage } from './pages/AnalysisResultsPage';
import { AdminDashboard } from './pages/AdminDashboard';
import { AdminCreateAnalysisPage } from './pages/AdminCreateAnalysisPage';
import { AdminEmployeesPage } from './pages/AdminEmployeesPage';
import { AdminAnalysesPage } from './pages/AdminAnalysesPage';
import { AdminWorkspacesPage } from './pages/AdminWorkspacesPage';
import { AdminLogsPage } from './pages/AdminLogsPage';
import { AdminSettingsPage } from './pages/AdminSettingsPage';
import { FeedbackPage } from './pages/FeedbackPage';
import { MyAnalysesPage, SharedWorkspacesPage } from './pages/PlaceholderPages';

function App() {
  return (
    <DataProvider>
      <Router>
        <Toast />
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/demo-disclaimer" element={<DemoDisclaimerPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/feedback" element={<FeedbackPage />} />

          {/* Employee Routes */}
          <Route path="/employee-dashboard" element={<EmployeeDashboard />} />
          <Route path="/my-analyses" element={<MyAnalysesPage />} />
          <Route path="/shared-workspaces" element={<SharedWorkspacesPage />} />
          <Route path="/new-analysis" element={<NewAnalysisPage />} />
          <Route path="/analysis-processing" element={<AnalysisProcessingPage />} />
          <Route path="/analysis-results/:id" element={<AnalysisResultsPage />} />

          {/* Admin Routes */}
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/admin-create-analysis" element={<AdminCreateAnalysisPage />} />
          <Route path="/admin-employees" element={<AdminEmployeesPage />} />
          <Route path="/admin-analyses" element={<AdminAnalysesPage />} />
          <Route path="/admin-workspaces" element={<AdminWorkspacesPage />} />
          <Route path="/admin-logs" element={<AdminLogsPage />} />
          <Route path="/admin-settings" element={<AdminSettingsPage />} />
        </Routes>
      </Router>
    </DataProvider>
  );
}

export default App;
