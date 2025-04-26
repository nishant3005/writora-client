import { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() =>
    JSON.parse(localStorage.getItem('writora-user'))
  );
  const [token, setToken] = useState(() =>
    localStorage.getItem('writora-token')
  );

  const login = (userData, token) => {
    setUser(userData);
    setToken(token);
    localStorage.setItem('writora-user', JSON.stringify(userData));
    localStorage.setItem('writora-token', token);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('writora-user');
    localStorage.removeItem('writora-token');
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
