import { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isInitializing, setIsInitializing] = useState(true);

  useEffect(() => {
    const initializeAuth = () => {
      const token = localStorage.getItem('token');
      console.log('[INFO] Inicializando autenticación. Token presente:', !!token);

      if (!token) {
        setIsInitializing(false);
        return;
      }

      try {
        const decoded = jwtDecode(token);
        console.log('[INFO] Token decodificado:', decoded);

        if (!decoded.userId || !decoded.email) {
          throw new Error('Token inválido: falta información esencial');
        }

        // Validamos la expiración del token
        const currentTime = Date.now() / 1000;
        if (decoded.exp && decoded.exp < currentTime) {
          throw new Error('Token expirado');
        }

        const newUser = {
          id: decoded.userId,
          email: decoded.email,
          role: decoded.type || decoded.role,
          teacherId: decoded.teacherId || null,
        };

        console.log('[DEBUG] Usuario inicializado:', newUser);
        setUser(newUser);
      } catch (error) {
        console.error('[ERROR] Error al inicializar la autenticación:', error);
        localStorage.removeItem('token');
        setUser(null);
        window.location.href = "/login";  // ✅ SOLUCIÓN: Usa `window.location.href`
      } finally {
        setIsInitializing(false);
      }
    };

    initializeAuth();
  }, []);

  const logout = () => {
    console.log('[INFO] Cerrando sesión');
    localStorage.removeItem('token');
    setUser(null);
    window.location.href = "/login";  // 🔥 Redirige usando `window.location.href`
  };

  const login = (token) => {
    try {
      localStorage.setItem('token');
      const decoded = jwtDecode(token);
      const newUser = {
        id: decoded.userId,
        email: decoded.email,
        role: decoded.type || decoded.role,
        teacherId: decoded.teacherId || null,
      };
      setUser(newUser);
      console.log('[INFO] Usuario logueado exitosamente:', newUser);
    } catch (error) {
      console.error('[ERROR] Error al procesar el login:', error);
      throw error;
    }
  };

  const value = {
    user,
    setUser,
    logout,
    login,
    isInitializing
  };

  if (isInitializing) {
    return null; // O un componente de loading si lo prefieres
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthContext;