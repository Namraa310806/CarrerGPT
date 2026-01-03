import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { logout, getMe } from '../services/authService';

interface User {
  id: number;
  email: string;
  name: string;
}

export const Dashboard = () => {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    getMe().then(setUser).catch(() => navigate('/login'));
  }, [navigate]);

  if (!user) return <div className="flex items-center justify-center h-screen">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-600">CareerGPT</h1>
          <div className="flex items-center gap-4">
            <span className="text-gray-700">{user.email}</span>
            <button
              onClick={() => {
                logout();
                navigate('/login');
              }}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Resume Analyzer Card */}
          <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition">
            <div className="text-3xl mb-2">📄</div>
            <h2 className="text-xl font-bold text-gray-800 mb-2">Resume Analyzer</h2>
            <p className="text-gray-600 mb-4">Upload and get AI feedback on your resume.</p>
            <button
              onClick={() => navigate('/resume-analyzer')}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
            >
              Analyze Resume
            </button>
          </div>

          {/* GitHub Stats Card */}
          <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition">
            <div className="text-3xl mb-2">🐙</div>
            <h2 className="text-xl font-bold text-gray-800 mb-2">GitHub Stats</h2>
            <p className="text-gray-600 mb-4">View your GitHub profile insights.</p>
            <button
              onClick={() => navigate('/github-stats')}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
            >
              View Stats
            </button>
          </div>

          {/* Interview Coach Card */}
          <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition">
            <div className="text-3xl mb-2">🎤</div>
            <h2 className="text-xl font-bold text-gray-800 mb-2">Interview Coach</h2>
            <p className="text-gray-600 mb-4">Practice technical and HR interviews.</p>
            <button
              onClick={() => navigate('/interview-coach')}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
            >
              Start Practice
            </button>
          </div>

          {/* Roadmap Card */}
          <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition">
            <div className="text-3xl mb-2">🗺️</div>
            <h2 className="text-xl font-bold text-gray-800 mb-2">Learning Roadmap</h2>
            <p className="text-gray-600 mb-4">Get personalized learning paths by track.</p>
            <button
              onClick={() => navigate('/roadmap-viewer')}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
            >
              View Roadmap
            </button>
          </div>

          {/* Analytics Card */}
          <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition">
            <div className="text-3xl mb-2">📊</div>
            <h2 className="text-xl font-bold text-gray-800 mb-2">Analytics</h2>
            <p className="text-gray-600 mb-4">Track your progress across modules.</p>
            <button
              onClick={() => navigate('/analytics-dashboard')}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
            >
              View Analytics
            </button>
          </div>

          {/* Certificate Builder Card */}
          <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition">
            <div className="text-3xl mb-2">🏆</div>
            <h2 className="text-xl font-bold text-gray-800 mb-2">Certificates</h2>
            <p className="text-gray-600 mb-4">Generate certificates upon completion.</p>
            <button
              onClick={() => navigate('/certifications')}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
            >
              View Certificates
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
