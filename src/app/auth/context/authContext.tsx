import React, { createContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';

interface AuthContextType {
  isAuthenticated: boolean;
  user: any | null; // Sesuaikan dengan struktur data pengguna Anda
  login: (credentials: any) => Promise<void>; // Fungsi untuk login
  logout: () => void; // Fungsi untuk logout
  checkAuthStatus: () => Promise<void>; // Fungsi untuk memeriksa status autentikasi saat mount
}

export const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  user: null,
  login: async () => {},
  logout: () => {},
  checkAuthStatus: async () => {},
});

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  const checkAuthStatus = async () => {
    try {
      // Kirim permintaan ke backend untuk memeriksa apakah token/session masih valid
      const token = localStorage.getItem('authToken'); // Contoh penyimpanan token
      if (token) {
        const response = await axios.get('/api/auth/status', { // Ganti dengan endpoint backend Anda
          headers: { Authorization: `Bearer ${token}` },
        });
        if (response.data.isAuthenticated) {
          setIsAuthenticated(true);
          setUser(response.data.user); // Set data pengguna jika tersedia
        } else {
          setIsAuthenticated(false);
          setUser(null);
          localStorage.removeItem('authToken'); // Hapus token jika tidak valid
        }
      } else {
        setIsAuthenticated(false);
        setUser(null);
      }
    } catch (error) {
      console.error('Error checking auth status:', error);
      setIsAuthenticated(false);
      setUser(null);
      localStorage.removeItem('authToken');
    }
  };

  useEffect(() => {
    checkAuthStatus(); // Periksa status autentikasi saat komponen mount
  }, []);

  const login = async (credentials: any) => {
    try {
      const response = await axios.post('/api/login', credentials); // Ganti dengan endpoint login backend Anda
      const { token, userData } = response.data; // Asumsikan backend mengembalikan token dan data pengguna
      localStorage.setItem('authToken', token); // Simpan token
      setIsAuthenticated(true);
      setUser(userData);
      // Redirect pengguna ke halaman setelah login jika perlu
    } catch (error) {
      console.error('Login failed:', error);
      setIsAuthenticated(false);
      setUser(null);
      localStorage.removeItem('authToken');
      // Tampilkan pesan error kepada pengguna
      throw error; // Re-throw error agar komponen yang memanggil tahu ada masalah
    }
  };

  const logout = () => {
    localStorage.removeItem('authToken'); // Hapus token
    setIsAuthenticated(false);
    setUser(null);
    // Redirect pengguna ke halaman login jika perlu
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout, checkAuthStatus }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => React.useContext(AuthContext);