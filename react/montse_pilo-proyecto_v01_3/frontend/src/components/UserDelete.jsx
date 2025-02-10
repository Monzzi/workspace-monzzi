import { useState } from 'react';
import PropTypes from 'prop-types';

const UserDelete = ({ user, onDelete }) => {
    const [error, setError] = useState('');

    if (!user || !user.id) {
        console.error("Error: user no está definido o no tiene ID.");
        return null;
    }
    
    const handleDelete = async () => {
            if (!window.confirm('¿Seguro que quieres eliminar este usuario?')) {
                return;
            }
            console.log('Iniciando eliminación del usuario:', user.id);

        try {
            const response = await fetch(
                `http://localhost:3000/api/users/${user.id}`,
                {
                    method: 'DELETE',
                    headers: { 
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    }
                },
            );

            if (!response.ok) {
                const errorData = await response.json();
                alert(`No se puede eliminar este usuario, porque tiene un profesor asociado.`);
                throw new Error(errorData.message || 'Error al eliminar el usuario.'); 

            }


            console.log('✅ Usuario eliminado exitosamente en el backend');
            onDelete(user.id);
            console.log('✅ Callback onDelete ejecutado');
        } catch (error) {
            console.error('❌ Error en eliminación:', error);
            setError(error.message);
        }
    };
    return (
         <button 
            onClick={handleDelete}
            className="delete-button"
        >
            Eliminar
        </button>
    );
};

UserDelete.propTypes = {
    user: PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string,
        role: PropTypes.string,
    }).isRequired,
    onDelete: PropTypes.func.isRequired,
};

export default UserDelete;
