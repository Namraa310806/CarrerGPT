import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Dashboard } from './pages/Dashboard';
import { ProtectedRoute } from './components/ProtectedRoute';
import ResumeAnalyzer from './pages/ResumeAnalyzer';
import { GitHubStats } from './pages/GitHubStats'; // Adjusted to named import to comply with verbatimModuleSyntax
import InterviewCoach from './pages/InterviewCoach';
import RoadmapViewer from './pages/RoadmapViewer';
import AnalyticsDashboard from './pages/AnalyticsDashboard';
import Certifications from './pages/Certifications';
import './index.css';
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route path="/resume-analyzer" element={<ResumeAnalyzer />} />
        <Route path="/github-stats" element={<GitHubStats />} />
        <Route path="/interview-coach" element={<InterviewCoach />} />
        <Route path="/roadmap-viewer" element={<RoadmapViewer />} />
        <Route path="/analytics-dashboard" element={<AnalyticsDashboard />} />
        <Route path="/certifications" element={<Certifications />} />
        <Route path="/" element={<Navigate to="/dashboard" />} />
      </Routes>
    </Router>
  );
}

export default App;
