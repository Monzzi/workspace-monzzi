import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    console.log('[INFO] Token en localStorage:', token); // control.

    if (token) {
      try {
        const decoded = jwtDecode(token);
        console.log('[INFO] Token decodificado:', decoded); // control.
        setUser({
          // Guardamos la información del usuario
          email: decoded.email,
          role: decoded.type || decoded.role,
        });
      } catch (error) {
        console.error('Error al decodificar el token:', error);
        localStorage.removeItem('token');
        setUser(null);
        navigate('/login');
      }
    }
  }, []);

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ user, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
