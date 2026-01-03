import { useState } from 'react';
import api from '../services/api';

interface Feedback {
  score: number;
  strengths: string[];
  gaps: string[];
  suggestions: string[];
}

export const ResumeAnalyzer = () => {
  const [file, setFile] = useState<File | null>(null);
  const [feedback, setFeedback] = useState<Feedback | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      setError('Please upload a file.');
      return;
    }

    setLoading(true);
    setError('');
    setFeedback(null);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await api.post('/resume/upload/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setFeedback(response.data);
    } catch (err: unknown) {
      const error = err as { response?: { data?: { detail?: string } } };
      setError(error.response?.data?.detail || 'Failed to analyze resume.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-lg w-full">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Resume Analyzer</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium mb-2">Upload your resume (PDF)</label>
            <input
              type="file"
              accept=".pdf"
              onChange={handleFileChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-medium py-2 rounded-lg transition"
          >
            {loading ? 'Analyzing...' : 'Analyze Resume'}
          </button>
        </form>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mt-4">
            {error}
          </div>
        )}

        {feedback && (
          <div className="mt-6">
            <h2 className="text-xl font-bold text-gray-800 mb-2">Feedback</h2>
            <pre className="bg-gray-100 p-4 rounded-lg text-sm text-gray-700">
              {JSON.stringify(feedback, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResumeAnalyzer;