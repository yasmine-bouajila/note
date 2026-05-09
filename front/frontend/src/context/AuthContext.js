import { createContext, useEffect, useState } from 'react';
import API from '../services/api';

export const AuthContext = createContext();

export function AuthProvider({ children }) {

  const [token, setToken] = useState(() => localStorage.getItem('token') || '');
  const [loading, setLoading] = useState(false);

  // save token
  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
  }, [token]);

  // 🔥 LOGIN
  const login = async (credentials) => {
    setLoading(true);

    try {
      const res = await API.post('/login', credentials);

      setToken(res.data.token);

      return res.data;

    } catch (err) {
      console.log('Login error', err.response?.data);
      throw err;

    } finally {
      setLoading(false);
    }
  };

  // 🔥 REGISTER (si tu l'as)
  const register = async (data) => {
    setLoading(true);

    try {
      const res = await API.post('/register', data);

      setToken(res.data.token);

      return res.data;

    } finally {
      setLoading(false);
    }
  };

  // 🔥 LOGOUT
  const logout = async () => {
    try {
      await API.post('/logout');
    } catch (e) {}

    setToken('');
  };

  return (
    <AuthContext.Provider value={{ token, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}