// components/UserDelete.jsx
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
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                }
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
        try {
            // Obtener el profesor
            const teacherResponse = await fetch(
                `http://localhost:3000/api/teachers?user_id=${userId}`,
                {
                    headers: { 
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                }
            );

            const teacherData = await teacherResponse.json();
            const teacher = teacherData.find(t => t.user_id === Number(userId));
            
            if (!teacher) {
                throw new Error('No se encontró el profesor asociado');
            }

            // Verificar si tiene estudiantes
            const studentCount = await checkTeacherStudents(teacher.id);
            if (studentCount > 0) {
                throw new Error(`No se puede eliminar este profesor porque tiene ${studentCount} estudiante(s) asignado(s). El profesor debe eliminar primero sus estudiantes.`);
            }

            // Si no tiene estudiantes, proceder con el borrado
            const deleteResponse = await fetch(
                `http://localhost:3000/api/teachers/${teacher.id}`,
                {
                    method: 'DELETE',
                    headers: { 
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                }
            );

            if (!deleteResponse.ok) {
                throw new Error('Error al eliminar el profesor');
            }

            return true;
        } catch (error) {
            throw error;
        }
    };

    const handleDelete = async () => {
        if (!window.confirm('¿Seguro que quieres eliminar este usuario?')) {
            return;
        }

        setIsDeleting(true);
        setError('');

        try {
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
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                }
            );

            if (!response.ok) {
                throw new Error('Error al eliminar el usuario');
            }

            onDelete(user.id);
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
            {error && (
                <div className="error-message">
                    {error}
                </div>
            )}
        </div>
    );
};

UserDelete.propTypes = {
    user: PropTypes.shape({
        id: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
        email: PropTypes.string
    }).isRequired,
    onDelete: PropTypes.func.isRequired,
};

export default UserDelete;