import { useState, useEffect } from 'react';
import api from '../services/api';

interface Analytics {
  resumeScore: number;
  githubStats: string;
  interviewAverage: number;
  roadmapProgress: string;
}

export const AnalyticsDashboard = () => {
  const [analytics, setAnalytics] = useState<Analytics | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchAnalytics = async () => {
      setLoading(true);
      setError('');

      try {
        const response = await api.get('/analytics/summary/');
        setAnalytics(response.data);
      } catch (err: unknown) {
        const error = err as { response?: { data?: { detail?: string } } };
        setError(error.response?.data?.detail || 'Failed to fetch analytics.');
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-2xl w-full">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Analytics Dashboard</h1>

        {loading && <p>Loading...</p>}

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        {analytics && (
          <div className="space-y-4">
            <div>
              <h2 className="text-lg font-medium text-gray-800">Resume Score</h2>
              <p className="text-gray-700">{analytics.resumeScore}</p>
            </div>

            <div>
              <h2 className="text-lg font-medium text-gray-800">GitHub Stats</h2>
              <p className="text-gray-700">{analytics.githubStats}</p>
            </div>

            <div>
              <h2 className="text-lg font-medium text-gray-800">Interview Average</h2>
              <p className="text-gray-700">{analytics.interviewAverage}</p>
            </div>

            <div>
              <h2 className="text-lg font-medium text-gray-800">Roadmap Progress</h2>
              <p className="text-gray-700">{analytics.roadmapProgress}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AnalyticsDashboard;