import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../components/AuthContext'; // ✅ Importamos el contexto
import { jwtDecode } from 'jwt-decode';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { setUser } = useAuth(); // ✅ Obtenemos `setUser` desde el contexto

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.post('http://localhost:3000/api/token', {
        email,
        password,
      });

      console.log('[INFO] Respuesta del servidor:', response.data);

      const token = response.data.token;
      if (!token) throw new Error('No se recibió un token válido');

      localStorage.setItem('token', token); // ✅ Guardamos el token en localStorage

      const decoded = jwtDecode(token); // ✅ Decodificamos el token inmediatamente
      console.log('[INFO] Token decodificado tras login:', decoded);

      setUser({
        email: decoded.email,
        role: decoded.type || decoded.role, // ✅ Actualizamos `setUser` inmediatamente
      });

      navigate('/dashboard'); // ✅ Redirigimos al usuario
    } catch (err) {
      console.error('Error en login:', err);
      setError('Credenciales incorrectas');
    }
  };

  return (
    <div>
      <h2>Iniciar Sesión</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Correo"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Iniciar sesión</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default Login;
