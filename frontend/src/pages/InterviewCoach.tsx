import { useState } from 'react';
import api from '../services/api';

export const InterviewCoach = () => {
  const [question, setQuestion] = useState<string | null>(null);
  const [answer, setAnswer] = useState('');
  const [feedback, setFeedback] = useState<string | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchQuestion = async () => {
    setLoading(true);
    setError('');
    setFeedback(null);
    setQuestion(null);

    try {
      const response = await api.get('/interview/question/');
      setQuestion(response.data.question);
    } catch (err: unknown) {
      const error = err as { response?: { data?: { detail?: string } } };
      setError(error.response?.data?.detail || 'Failed to fetch question.');
    } finally {
      setLoading(false);
    }
  };

  const submitAnswer = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!answer) {
      setError('Please provide an answer.');
      return;
    }

    setLoading(true);
    setError('');
    setFeedback(null);

    try {
      const response = await api.post('/interview/submit/', { question, answer });
      setFeedback(response.data.feedback);
    } catch (err: unknown) {
      const error = err as { response?: { data?: { detail?: string } } };
      setError(error.response?.data?.detail || 'Failed to submit answer.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-lg w-full">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Interview Coach</h1>

        {!question && (
          <button
            onClick={fetchQuestion}
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-medium py-2 rounded-lg transition"
          >
            {loading ? 'Fetching...' : 'Get Question'}
          </button>
        )}

        {question && (
          <div>
            <h2 className="text-lg font-medium text-gray-800 mb-4">{question}</h2>
            <form onSubmit={submitAnswer} className="space-y-4">
              <textarea
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Type your answer here..."
                rows={5}
              />
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-medium py-2 rounded-lg transition"
              >
                {loading ? 'Submitting...' : 'Submit Answer'}
              </button>
            </form>
          </div>
        )}

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mt-4">
            {error}
          </div>
        )}

        {feedback && (
          <div className="mt-6">
            <h2 className="text-xl font-bold text-gray-800 mb-2">Feedback</h2>
            <p className="bg-gray-100 p-4 rounded-lg text-sm text-gray-700">{feedback}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default InterviewCoach;