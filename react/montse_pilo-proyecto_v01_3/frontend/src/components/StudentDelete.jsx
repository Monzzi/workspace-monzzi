// components/StudentDelete.jsx
import { useState } from 'react';
import PropTypes from 'prop-types';

const StudentDelete = ({ student, onDelete }) => {
    const [error, setError] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDelete = async () => {
        if (!window.confirm('¿Seguro que quieres eliminar el estudiante?')) {
            return;
        }

        setIsDeleting(true);
        try {
            const response = await fetch(
                `http://localhost:3000/api/students/${student.id}`,
                {
                    method: 'DELETE',
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
                }
            );

            if (!response.ok) {
                throw new Error('Error al eliminar el estudiante');
            }

            onDelete(student.id);

        } catch (error) {
            setError(error.message);
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <div className="student-item">
            <div className="student-info">
                <div className="student-name">
                    {student.name} {student.last_name}
                </div>
                <div className="student-dni">
                    DNI: {student.dni}
                </div>
            </div>
            <button 
                onClick={handleDelete}
                className="delete-button"
                disabled={isDeleting}
            >
                {isDeleting ? 'Eliminando...' : 'Eliminar'}
            </button>
            {error && <div className="error-message">{error}</div>}
        </div>
    );
};

StudentDelete.propTypes = {
    student: PropTypes.shape({
        id: PropTypes.number.isRequired,  // Cambiado a number
        name: PropTypes.string.isRequired,
        last_name: PropTypes.string.isRequired,
        dni: PropTypes.string.isRequired,
    }).isRequired,
    onDelete: PropTypes.func.isRequired,  // Corregido a minúscula
};

export default StudentDelete;