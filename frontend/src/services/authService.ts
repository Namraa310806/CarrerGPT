import api from './api';

export interface LoginResponse {
  access: string;
  refresh: string;
  user: {
    id: number;
    email: string;
    name: string;
  };
}

export const register = async (email: string, name: string, password: string) => {
  const res = await api.post('/auth/register/', { email, name, password });
  return res.data;
};

export const login = async (email: string, password: string): Promise<LoginResponse> => {
  const res = await api.post('/auth/login/', { email, password });
  localStorage.setItem('access_token', res.data.access);
  localStorage.setItem('refresh_token', res.data.refresh);
  return res.data;
};

export const logout = () => {
  localStorage.clear();
};

export const getMe = async () => {
  const res = await api.get('/auth/me/');
  return res.data;
};
