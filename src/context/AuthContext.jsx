import React, { createContext, useState, useEffect, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check local storage for persistent session
    const storedUser = localStorage.getItem('reniec-session');
    const tempUser = sessionStorage.getItem('reniec-session');
    
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else if (tempUser) {
      setUser(JSON.parse(tempUser));
    }
    setLoading(false);
  }, []);

  const login = (email, password, remember) => {
    // Demo credentials
    if (email === 'admin@reniec.pe' && password === 'admin123') {
      const adminUser = {
        email: 'admin@reniec.pe',
        fullName: 'Administrador RENIEC',
        role: 'Super Admin',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=256&auto=format&fit=crop'
      };
      
      setUser(adminUser);
      
      if (remember) {
        localStorage.setItem('reniec-session', JSON.stringify(adminUser));
      } else {
        sessionStorage.setItem('reniec-session', JSON.stringify(adminUser));
      }
      return { success: true };
    }
    return { success: false, message: 'Credenciales inválidas. Por favor intente de nuevo.' };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('reniec-session');
    sessionStorage.removeItem('reniec-session');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
