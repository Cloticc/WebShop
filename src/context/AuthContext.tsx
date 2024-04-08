// AuthContext.tsx

import React, { createContext, useState } from 'react';

interface AuthContextType { 
  isAuthenticated: boolean; 
  login: () => void; 
  logout: () => void; 
}

export const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps { 
  children: React.ReactNode; 
}


export const AuthProvider =  ({ children }: AuthProviderProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = () => setIsAuthenticated(true);
  const logout = () => setIsAuthenticated(false);

const value = { isAuthenticated, login, logout };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};