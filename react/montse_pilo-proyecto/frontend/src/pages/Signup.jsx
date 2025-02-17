import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../components/AuthContext';
import { validateDNI } from '../utils/validateDNI';

// Componente Signup: Permite registrar nuevos usuarios (admin o user (profesores))
const Signup = () => {
  const navigate = useNavigate();
  const { user } = useAuth(); 

  // Estados para el formulario
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [type, setType] = useState('user');  // 'user' para profesor, 'admin' para administrador
  const [dni, setDni] = useState('');
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Verificar que solo los admin pueden acceder a esta página
  useEffect(() => {
    console.log('[DEBUG] Montando Signup.jsx');
    console.log('[DEBUG] Usuario:', user); 

    if (!user || user.role !== 'admin') {
      console.log('[DEBUG] Usuario no autorizado, redirigiendo a /users');
      navigate('/users'); 
    }
  }, [user, navigate]);

  // Función principal para manejar el registro
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    // Validaciones del formulario
    if (type === 'user') {
      const dniError = validateDNI(dni);
      if (dniError) {
        setError(dniError);
        return;
      }
    }

    if (!email || !password || !type) {
      setError(
        'El email, la contraseña y el tipo de usuario son obligatorios.',
      );
      return;
    }

    if (type === 'user' && (!dni || !name || !lastName || !dateOfBirth)) {
      setError('Todos los datos del profesor son obligatorios.');
      return;
    }

    try {
      // Crear el usuario admin
      const newUser = { email, password, type };
      const userResponse = await fetch('http://localhost:3000/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newUser),
      });

      if (!userResponse.ok) {
        const errorData = await userResponse.json();
        throw new Error(errorData.message || 'Error al crear el usuario.');
      }

      const createdUser = await userResponse.json();
      console.log('[DEBUG] Usuario creado:', createdUser);

      // Crear datos adicionales para los user (profesores)
      if (type === 'user') {
        await createTeacher(createdUser.id);
      }

      // Mostrar mensaje de éxito y redireccionar
      setSuccessMessage(
        'Registro exitoso. Redirigiendo a la lista de usuarios...',
      );
      setTimeout(() => navigate('/users'), 2000);
    } catch (error) {
      setError(error.message);
    }
  };

  // Función para crear profesor. 
  const createTeacher = async (userId) => {
    const newTeacher = {
      dni,
      name,
      last_name: lastName,
      date_of_birth: dateOfBirth,
      user_id: userId,
    };

    try {
      const response = await fetch('http://localhost:3000/api/teachers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newTeacher),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al crear el profesor.');
      }

      console.log('[DEBUG] Profesor creado correctamente');
    } catch (error) {
      console.error('[ERROR] Error al crear el profesor:', error.message);
      setError(
        'El usuario se creó, pero hubo un problema al crear el profesor.',
      );
    }
  };

  return (
    <div className="add-student">
      <h3 className="add-student">Registro de Usuario</h3>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}

      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label>
          Contraseña:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <label>
          Tipo de usuario:
          <select value={type} onChange={(e) => setType(e.target.value)}>
            <option value="user">Profesor</option>
            <option value="admin">Admin</option>
          </select>
        </label>

        {type === 'user' && (
          <>
            <label>
              DNI:
              <input
                type="text"
                value={dni}
                onChange={(e) => setDni(e.target.value.toUpperCase())}
                placeholder="12345678A"
                maxLength="9"
                required
              />
            </label>
            <label>
              Nombre:
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </label>
            <label>
              Apellidos:
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </label>
            <label>
              Fecha de nacimiento:
              <input
                type="date"
                value={dateOfBirth}
                onChange={(e) => setDateOfBirth(e.target.value)}
                required
              />
            </label>
          </>
        )}
        <button type="submit">Registrar</button>
      </form>
    </div>
  );
};

export default Signup;
