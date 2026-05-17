import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      localStorage.setItem('token', token);
      loadUser();
    } else {
      delete axios.defaults.headers.common['Authorization'];
      localStorage.removeItem('token');
      setIsAuthenticated(false);
      setUser(null);
      setLoading(false);
    }
  }, [token]);

  const loadUser = async () => {
    try {
      const res = await axios.get('http://localhost:5001/api/users/me');
      setUser(res.data.data);
      setIsAuthenticated(true);
    } catch (err) {
      setToken(null);
    }
    setLoading(false);
  };

  const register = async (formData) => {
    try {
      const res = await axios.post('http://localhost:5001/api/users', formData);
      setToken(res.data.data.token);
    } catch (err) {
      throw err.response?.data?.error || 'Registration failed';
    }
  };

  const login = async (formData) => {
    try {
      const res = await axios.post('http://localhost:5001/api/users/login', formData);
      setToken(res.data.data.token);
    } catch (err) {
      throw err.response?.data?.error || 'Login failed';
    }
  };

  const logout = () => {
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, isAuthenticated, loading, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
