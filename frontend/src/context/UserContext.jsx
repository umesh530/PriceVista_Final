// frontend/src/context/UserContext.jsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import * as userService from '../services/userService';

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const raw = localStorage.getItem('pv_user');
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  });
  const [loading, setLoading] = useState(false);

  // login: accepts credentials { email, password }
  const login = async (creds) => {
    setLoading(true);
    try {
      const data = await userService.login(creds);
      setUser(data);
      localStorage.setItem('pv_user', JSON.stringify(data));
      return { ok: true };
    } catch (err) {
      return { ok: false, message: err?.response?.data?.message || err.message };
    } finally {
      setLoading(false);
    }
  };

  // register: { name, email, password }
  const register = async (payload) => {
    setLoading(true);
    try {
      const data = await userService.register(payload);
      setUser(data);
      localStorage.setItem('pv_user', JSON.stringify(data));
      return { ok: true };
    } catch (err) {
      return { ok: false, message: err?.response?.data?.message || err.message };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('pv_user');
  };

  // optional: refresh profile on mount if token exists
  useEffect(() => {
    const tryRefresh = async () => {
      if (!user?.token) return;
      try {
        const profile = await userService.getProfile();
        setUser(prev => ({ ...prev, ...profile }));
      } catch (e) {
        // token invalid -> logout
        logout();
      }
    };
    tryRefresh();
    // eslint-disable-next-line
  }, []);

  return (
    <UserContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </UserContext.Provider>
  );
};
