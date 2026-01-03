import { useState } from 'react';
import api from '../services/api';

interface GitHubStats {
  repositories: number;
  stars: number;
  topLanguages: string[];
}

export const GitHubStats = () => {
  const [username, setUsername] = useState('');
  const [stats, setStats] = useState<GitHubStats | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username) {
      setError('Please enter a GitHub username.');
      return;
    }

    setLoading(true);
    setError('');
    setStats(null);

    try {
      const response = await api.post('/cp/github/', { username });
      setStats(response.data);
    } catch (err: unknown) {
      const error = err as { response?: { data?: { detail?: string } } };
      setError(error.response?.data?.detail || 'Failed to fetch GitHub stats.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-lg w-full">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">GitHub Stats</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium mb-2">GitHub Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter GitHub username"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-medium py-2 rounded-lg transition"
          >
            {loading ? 'Fetching...' : 'Fetch Stats'}
          </button>
        </form>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mt-4">
            {error}
          </div>
        )}

        {stats && (
          <div className="mt-6">
            <h2 className="text-xl font-bold text-gray-800 mb-2">Stats</h2>
            <pre className="bg-gray-100 p-4 rounded-lg text-sm text-gray-700">
              {JSON.stringify(stats, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default GitHubStats;