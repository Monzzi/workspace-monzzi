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
        const newUser = {
          id: decoded.userId,
          email: decoded.email,
          role: decoded.type || decoded.role,
          teacherId: decoded.teacherId,
        };
        
        console.log('[DEBUG] Usuario que se guardará en AuthContext:', newUser);
        setUser(newUser);
        

      } catch (error) {
        console.error('Error al decodificar el token:', error);
        localStorage.removeItem('token');
        setUser(null);
        navigate('/login');
      }
    }
  }, []);

  useEffect(() => {
    console.log('[DEBUG] user actualizado en AuthContext:', user);
  }, [user]);
  
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
