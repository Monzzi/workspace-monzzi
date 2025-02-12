import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../components/AuthContext'; // ✅ Importamos el contexto
import { jwtDecode } from 'jwt-decode';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { setUser } = useAuth(); // ✅ Obtenemos `setUser` desde el contexto

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

  // Validación básica
    if (!email || !password) {
      setError('Por favor, completa todos los campos');
      setIsLoading(false);
      return;
    }

    try {
      const response = await axios.post('http://localhost:3000/api/token', {
        email,
        password,
      });

      const token = response.data.token;
      if (!token) throw new Error('No se recibió un token válido');

      localStorage.setItem('token', token); // ✅ Guardamos el token en localStorage

      const decoded = jwtDecode(token); // ✅ Decodificamos el token inmediatamente
      setUser({
        email: decoded.email,
        role: decoded.type || decoded.role, // ✅ Actualizamos `setUser` inmediatamente
      });

      navigate('/profile');
    } catch (err) {
      console.error('Error en login:', err);
      setError(
        err.response?.data?.message || 
        'Error al iniciar sesión. Por favor, verifica tus credenciales.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <img 
          src="/coding.png" 
          alt="Logo de la aplicación" 
          className="login-logo"
        />
        
        <div className="login-title">
          <h2>¡Bienvenido/a!</h2>
          <p>Inicia sesión para acceder a tu panel</p>
        </div>

        <form onSubmit={handleLogin} className="login-form">
          <div className="login-form">
            <label htmlFor="email">Correo electrónico</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="ejemplo@correo.com"
              required
            />
          </div>

          <div className="login-form">
            <label htmlFor="password">Contraseña</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="********"
              required
            />
          </div>

          {error && <div className="error-message">{error}</div>}

          <button 
            type="submit" 
            className="login-button" 
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <span className="spinner"></span>
                Iniciando sesión...
              </>
            ) : (
              'Iniciar sesión'
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
