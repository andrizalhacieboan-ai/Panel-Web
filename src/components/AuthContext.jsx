import { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Cek localStorage saat load
    const savedUser = JSON.parse(localStorage.getItem('andri_user') || 'null');
    if (savedUser) setUser(savedUser);
  }, []);

  const login = async (phone, password) => {
    const res = await axios.post('/api/auth/login', { phone, password });
    if (res.data.success) {
      localStorage.setItem('andri_user', JSON.stringify(res.data.user));
      setUser(res.data.user);
    }
    return res.data;
  };

  const register = async (name, phone, password) => {
    const res = await axios.post('/api/auth/register', { name, phone, password });
    return res.data;
  };

  const logout = () => {
    localStorage.removeItem('andri_user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
