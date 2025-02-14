import PropTypes from 'prop-types';
import { useState } from 'react';
import { useAuth } from '../components/AuthContext'; // Contexto de autenticación para obtener el usuario.
import { validateDNI } from '../utils/validateDNI'; // Función para validar el DNI.

const AddStudent = ({ onStudentAdded }) => {
  const { user } = useAuth(); // Obtiene la info del usuario autenticado.
  // Estados para los campos del formulario y mensajes de error y éxito.
  const [dni, setDni] = useState(''); 
  const [name, setName] = useState(''); 
  const [lastName, setLastName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Función para enviar el formulario.
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    // Validación de los campos del formulario.
    if (!dni || !name || !lastName || !dateOfBirth) {
      setError('Todos los campos son obligatorios.');
      return;
    }

    // Validación del ID del profesor.
    if (!user.teacherId) {
      setError('Error: No se encontró el ID del profesor.');
      return;
    }
    // Validación del DNI.
    const dniError = validateDNI(dni);
    if (dniError) {
      setError(dniError);
      return;
    }
    // Creación del objeto con los datos del nuevo estudiante.
    const newStudent = {
      dni,
      name,
      last_name: lastName,
      date_of_birth: dateOfBirth,
      teacher_id: user.teacherId,
    };

    try {
      const response = await fetch('http://localhost:3000/api/students', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(newStudent),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al crear el estudiante.');
      }

      const createdStudent = await response.json();
      setSuccessMessage('Estudiante creado correctamente.');
      // Limpiar los campos del formulario.
      setDni('');
      setName('');
      setLastName('');
      setDateOfBirth('');
      // Llamar a la función que recibe el nuevo estudiante.
      onStudentAdded(createdStudent);
    } catch (error) {
      setError(error.message);
    }
  };

  // Formulario para añadir un nuevo estudiante.
  return (
    <div className="add-student">
      <h3>Agregar nuevo estudiante</h3>
      {error && <div className="error-message">{error}</div>}
      {successMessage && (
        <div className="success-message">{successMessage}</div>
      )}

      <form onSubmit={handleSubmit}>
        <label>
          DNI
          <input
            type="text"
            value={dni}
            onChange={(e) => setDni(e.target.value.toUpperCase())} // Actualizar el estado del DNI.
            placeholder="12345678X"
            maxLength={9}
            required
          />
        </label>
        <label>
          Nombre
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)} 
            placeholder="Nombre del estudiante"
            required
          />
        </label>
        <label>
          Apellidos
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Apellidos del estudiante"
            required
          />
        </label>
        <label>
          Fecha de nacimiento
          <input
            type="date"
            value={dateOfBirth}
            onChange={(e) => setDateOfBirth(e.target.value)}
            required
          />
        </label>
        <button type="submit">Crear nuevo estudiante</button>
      </form>
    </div>
  );
};

// Propiedades del componente.
AddStudent.propTypes = {
  onStudentAdded: PropTypes.func.isRequired, // Función que recibe el nuevo estudiante.
};

export default AddStudent;
