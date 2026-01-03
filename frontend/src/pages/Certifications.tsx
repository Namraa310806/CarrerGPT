import { useState, useEffect } from 'react';
import api from '../services/api';

interface Certification {
  id: number;
  name: string;
  organization: string;
  issue_date: string;
  expiration_date: string | null;
  credential_id: string | null;
  credential_url: string | null;
}

const Certifications = () => {
  const [certifications, setCertifications] = useState<Certification[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCertifications = async () => {
      setLoading(true);
      setError('');

      try {
        const response = await api.get('/api/certifications/');
        setCertifications(response.data);
      } catch {
        setError('Failed to fetch certifications.');
      } finally {
        setLoading(false);
      }
    };

    fetchCertifications();
  }, []);

  const handleAddCertification = async () => {
    const newCertification = {
      name: 'New Certification',
      organization: 'Organization Name',
      issue_date: '2025-12-20',
      expiration_date: null,
      credential_id: '12345',
      credential_url: 'https://example.com',
    };

    try {
      const response = await api.post('/api/certifications/', newCertification);
      setCertifications((prev) => [...prev, response.data]);
    } catch {
      setError('Failed to add certification.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-2xl w-full">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Certifications</h1>

        {loading && <p>Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}

        <div className="grid grid-cols-1 gap-4">
          {certifications.map((cert) => (
            <div key={cert.id} className="border rounded-lg p-4 shadow-sm">
              <h2 className="text-lg font-medium text-gray-800">{cert.name}</h2>
              <p className="text-gray-700">{cert.organization}</p>
              <p className="text-gray-500">Issued: {cert.issue_date}</p>
              {cert.expiration_date && <p className="text-gray-500">Expires: {cert.expiration_date}</p>}
              {cert.credential_url ? (
                <a
                  href={cert.credential_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  View Credential
                </a>
              ) : (
                <p className="text-gray-500">No Credential URL</p>
              )}
            </div>
          ))}
        </div>

        <button
          onClick={handleAddCertification}
          className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded mt-4"
        >
          Add Certification
        </button>
      </div>
    </div>
  );
};

export default Certifications;