import { Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getMe } from '../services/authService';

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const [isAuth, setIsAuth] = useState<boolean | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (!token) {
      setIsAuth(false);
      return;
    }
    getMe()
      .then(() => setIsAuth(true))
      .catch(() => {
        localStorage.clear();
        setIsAuth(false);
      });
  }, []);

  if (isAuth === null) return <div>Loading...</div>;
  if (!isAuth) return <Navigate to="/login" />;
  return <>{children}</>;
};
