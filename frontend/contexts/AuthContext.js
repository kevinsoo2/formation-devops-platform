'use client';
import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load from localStorage on mount
    const savedToken = localStorage.getItem('token');
    if (savedToken) {
      setToken(savedToken);
      fetchUser(savedToken);
    } else {
      setLoading(false);
    }
  }, []);

  async function fetchUser(authToken) {
    try {
      const res = await fetch(`${API_URL}/api/auth/me`, {
        headers: { Authorization: `Bearer ${authToken}` }
      });
      if (res.ok) {
        const data = await res.json();
        setUser(data.data);
      } else {
        // Token invalid, clear
        localStorage.removeItem('token');
        setToken(null);
        setUser(null);
      }
    } catch (e) {
      console.error('fetchUser error:', e);
    } finally {
      setLoading(false);
    }
  }

  async function login(username, password) {
    const res = await fetch(`${API_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Erreur de connexion');
    localStorage.setItem('token', data.data.token);
    setToken(data.data.token);
    setUser(data.data.user);
    return data.data.user;
  }

  async function register(username, email, password, displayName) {
    const res = await fetch(`${API_URL}/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, email, password, displayName }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Erreur d\'inscription');
    localStorage.setItem('token', data.data.token);
    setToken(data.data.token);
    setUser(data.data.user);
    return data.data.user;
  }

  function logout() {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
  }

  async function refreshUser() {
    if (token) {
      await fetchUser(token);
    }
  }

  return (
    <AuthContext.Provider value={{ user, token, loading, login, register, logout, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}
