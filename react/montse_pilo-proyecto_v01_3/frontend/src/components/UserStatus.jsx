 /* Componente para cambiar el estado activo/inactivo de un usuario
   * 
   * Este componente permite alternar el estado de un usuario y 
   * muestra visualmente si está activo o inactivo
   */
import { useState } from 'react';
import PropTypes from 'prop-types';

// Componente para cambiar el estado activo/inactivo de un usuario
const UserStatus = ({ user, onStatusChange }) => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState('');

  const toggleStatus = async () => {
    setIsUpdating(true);
    setError('');

    try {
      const response = await fetch(
        `http://localhost:3000/api/users/${user.id}`,
        {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            active: !user.active,
          }),
        },
      );

      if (!response.ok) {
        throw new Error('Error al cambiar el estado del usuario');
      }

      const updatedUser = await response.json();
      onStatusChange(updatedUser);
    } catch (error) {
      setError('Error al actualizar el estado: ' + error.message);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="status-container">
      <button
        onClick={toggleStatus}
        className={`status-button ${user.active ? 'active' : 'inactive'}`}
        disabled={isUpdating}
      >
        {isUpdating ? 'Actualizando...' : user.active ? 'Activo' : 'Inactivo'}
      </button>
      {error && <div className="error-message">{error}</div>}
    </div>
  );
};

UserStatus.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.string.isRequired,
    active: PropTypes.bool.isRequired,
  }).isRequired,
  onStatusChange: PropTypes.func.isRequired,
};

export default UserStatus;
