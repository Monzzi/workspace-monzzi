import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext(); // Creamos el contexto de autenticación

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Estado para almacenar el usuario autenticado
  const [isInitializing, setIsInitializing] = useState(true); // Estado para saber si estamos inicializando
  const navigate = useNavigate();

  // useEffect para inicializar la autenticación cuando se carga la aplicación
  useEffect(() => {
    const initializeAuth = () => {
      const token = localStorage.getItem('token');
      console.log(
        '[INFO] Inicializando autenticación. Token presente:',
        !!token,
      );

      if (!token) {
        setIsInitializing(false);
        return;
      }

      try {
        const decoded = jwtDecode(token); // Decodificar el token
        console.log('[INFO] Token decodificado:', decoded);

        // Validar que el token tiene la información necesaria
        if (!decoded.userId || !decoded.email) {
          throw new Error('Token inválido: falta información esencial');
        }

        // Validamos la expiración del token
        const currentTime = Date.now() / 1000;
        if (decoded.exp && decoded.exp < currentTime) {
          throw new Error('Token expirado');
        }

        // Crear objeto de usuario con la información del token
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
        navigate('/login');
      } finally {
        setIsInitializing(false);
      }
    };

    initializeAuth();
  }, [navigate]);

  // Funciones para cerrar sesión
  const logout = () => {
    console.log('[INFO] Cerrando sesión');
    localStorage.removeItem('token');
    setUser(null);
    navigate('/login');
  };

  // Función para iniciar sesión
  const login = (token) => {
    try {
      localStorage.setItem('token', token);
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
      // Aseguramos limpiar el estado si hay error
      localStorage.removeItem('token');
      setUser(null);
      throw error;
    }
  };

  // Objeto con los valores que proporciona el contexto de autenticación
  const value = {
    user,
    setUser,
    logout,
    login,
    isInitializing,
  };

  if (isInitializing) {
    return null; // O un componente de loading si lo prefieres
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Hook para acceder al contexto de autenticación
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
};
