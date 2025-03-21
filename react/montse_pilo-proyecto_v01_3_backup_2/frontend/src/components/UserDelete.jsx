/*Componente para eliminar un usuario 
 * Este componente es más complejo que StudentDelete porque:
 * 1. Verifica si el usuario está activo antes de eliminar
 * 2. Si es profesor, verifica que no tenga estudiantes asignados
 * 3. Maneja la eliminación en cascada (primero profesor, luego usuario)
 */
import { useState } from 'react';
import PropTypes from 'prop-types';

const UserDelete = ({ user, onDelete }) => {
  const [error, setError] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  const checkTeacherStudents = async (teacherId) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/teachers/${teacherId}/students`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        },
      );

      if (!response.ok) {
        throw new Error('Error al verificar estudiantes');
      }

      const students = await response.json();
      return students.length;
    } catch (error) {
      throw new Error('Error al verificar estudiantes: ' + error.message);
    }
  };

  const deleteTeacher = async (userId) => {
    // Obtener el profesor
    const teacherResponse = await fetch(
      `http://localhost:3000/api/teachers?user_id=${userId}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      },
    );

    if (!teacherResponse.ok) {
      throw new Error('Error al obtener el profesor');
    }

    const teacherData = await teacherResponse.json();
    const teacher = teacherData.find((t) => t.user_id === Number(userId));

    if (!teacher) {
      throw new Error('No se encontró el profesor asociado');
    }

    // Verificar si tiene estudiantes
    const studentCount = await checkTeacherStudents(teacher.id);
    if (studentCount > 0) {
      throw new Error(
        `No se puede eliminar este profesor porque tiene ${studentCount} estudiante(s) asignado(s). El profesor debe eliminar primero sus estudiantes.`,
      );
    }

    // Si no tiene estudiantes, proceder con el borrado
    const deleteResponse = await fetch(
      `http://localhost:3000/api/teachers/${teacher.id}`,
      {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      },
    );

    if (!deleteResponse.ok) {
      throw new Error('Error al eliminar el profesor');
    }

    return true;
  };

  const handleDelete = async () => {
    if (!window.confirm('¿Seguro que quieres eliminar este usuario?')) {
      return;
    }

    setIsDeleting(true);
    setError('');

    try {
      // Primero verificamos si el usuario está activo
      const userResponse = await fetch(
        `http://localhost:3000/api/users/${user.id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        },
      );

      const userData = await userResponse.json();

      // Si el usuario está inactivo, mostramos el mensaje y detenemos el proceso
      if (!userData.active) {
        setError(
          'El usuario debe estar activo para poder ser eliminado. Por favor, actívelo primero.',
        );
        return;
      }

      // Si es profesor, primero intentar eliminar el profesor
      if (user.type === 'user') {
        await deleteTeacher(user.id);
      }

      // Si llegamos aquí, podemos eliminar el usuario
      const response = await fetch(
        `http://localhost:3000/api/users/${user.id}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        },
      );

      if (!response.ok) {
        throw new Error('Error al eliminar el usuario');
      }

      onDelete(Number(user.id));
    } catch (error) {
      setError(error.message);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="delete-container">
      <button
        onClick={handleDelete}
        className="delete-button"
        disabled={isDeleting}
      >
        {isDeleting ? 'Procesando...' : 'Eliminar'}
      </button>
      {error && <div className="error-message">{error}</div>}
    </div>
  );
};

UserDelete.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    email: PropTypes.string,
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default UserDelete;
