import React, { createContext, useState, useEffect } from 'react';
import * as authStorage from '../services/authStorage';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    const token = await authStorage.getToken();
    if (token) {
      setUser({ token });
    }
  };

  const login = async (token) => {
    await authStorage.storeToken(token);
    setUser({ token });
  };

  const logout = async () => {
    await authStorage.removeToken();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};