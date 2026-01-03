import { useState } from 'react';
import api from '../services/api';

interface Roadmap {
  weeks: {
    topics: string[];
  }[];
}

export const RoadmapViewer = () => {
  const [track, setTrack] = useState('');
  const [roadmap, setRoadmap] = useState<Roadmap | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchRoadmap = async () => {
    if (!track) {
      setError('Please select a track.');
      return;
    }

    setLoading(true);
    setError('');
    setRoadmap(null);

    try {
      const response = await api.get(`/roadmap/preview/?track=${track}`);
      setRoadmap(response.data);
    } catch (err: unknown) {
      const error = err as { response?: { data?: { detail?: string } } };
      setError(error.response?.data?.detail || 'Failed to fetch roadmap.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-lg w-full">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Learning Roadmap</h1>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Select Track</label>
          <select
            value={track}
            onChange={(e) => setTrack(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">-- Select a Track --</option>
            <option value="sde">Software Development Engineer</option>
            <option value="data-science">Data Science</option>
            <option value="frontend">Frontend Development</option>
            <option value="backend">Backend Development</option>
          </select>
        </div>

        <button
          onClick={fetchRoadmap}
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-medium py-2 rounded-lg transition"
        >
          {loading ? 'Fetching...' : 'View Roadmap'}
        </button>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mt-4">
            {error}
          </div>
        )}

        {roadmap && (
          <div className="mt-6">
            <h2 className="text-xl font-bold text-gray-800 mb-2">Roadmap</h2>
            <ul className="list-disc pl-5 space-y-2">
              {roadmap.weeks.map((week, index) => (
                <li key={index}>
                  <strong>Week {index + 1}:</strong> {week.topics.join(', ')}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default RoadmapViewer;