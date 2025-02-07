import { useState } from 'react';
import PropTypes from 'prop-types';

const StudentDelete = ({ student, onDelete }) => {
    const [error, setError] = useState('');

    const handleDelete = async () => {
        if (!window.confirm('¿Seguro que quieres eliminar el estudiante?')) {
            return;
        }

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
        }
    };

    return (
        <li>
            {student.name} {student.last_name} --- DNI: {student.dni}
            <button onClick={handleDelete}>Eliminar</button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </li>
    );
};
StudentDelete.propTypes = {
    student: PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        last_name: PropTypes.string.isRequired,
        dni: PropTypes.string.isRequired,
    }).isRequired,
    onDelete: PropTypes.func.isRequired,
};

export default StudentDelete;
