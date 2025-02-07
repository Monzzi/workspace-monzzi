import { useState } from 'react';
import PropTypes from 'prop-types';

const UserDelete = ({ user, onDelete }) => {
    const [error, setError] = useState('');

    if (!user || !user.id) {
        console.error("❌ Error: user no está definido o no tiene ID.");
        return null;  // 🔥 Evitamos que el componente crashee si `user` no está definido.
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
                        // 'Content-Type': 'application/json'
                    }
                },
                console.log('ID del usuario a eliminar:', user.id)

            );

            console.log('Respuesta del servidor:', response.status);


            if (!response.ok) {
                const errorData = await response.json();
                alert(`No se puede eliminar este usuario, porque tiene un profesor asociado.`);
                throw new Error(errorData.message || 'Error al eliminar el usuario.'); 

            }
            
            console.log('Usuario eliminado exitosamente');

            onDelete(user.id);  // ✅ Actualiza la lista sin recargar la página
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <span className="ml-2">
            <button 
                onClick={handleDelete}
                className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
            >
                Eliminar
            </button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </span>
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
