import PropTypes from 'prop-types';
import { useState } from 'react';
import { useAuth } from '../components/AuthContext';

const AddStudent = ({ onStudentAdded }) => {
    const { user } = useAuth();
    const [dni, setDni] = useState('');
    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccessMessage('');

        if (!dni || !name || !lastName || !dateOfBirth) {
            setError("Todos los campos son obligatorios.");
            return;
        }

        if (!user.teacherId) { 
            setError("Error: No se encontró el ID del profesor.");
            return;
        }

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
                throw new Error(errorData.message || "Error al crear el estudiante.");
            }

            const createdStudent = await response.json();
            setSuccessMessage("Estudiante creado correctamente.");
            setDni('');
            setName('');
            setLastName('');
            setDateOfBirth('');
            onStudentAdded(createdStudent); // Actualizar la lista de estudiantes

        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="add-student">
            <h3>Agregar nuevo estudiante</h3>
            {error && <p style={{ color: "red" }}>{error}</p>}
            {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}

            <form onSubmit={handleSubmit}>
                <label>
                    DNI:
                    <input
                        type="text"
                        value={dni}
                        onChange={(e) => setDni(e.target.value)}
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
                    Apellido:
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
                <button type="submit">Crear nuevo estudiante</button>
            </form>
        </div>
    );
};
AddStudent.propTypes = {
    onStudentAdded: PropTypes.func.isRequired,
};

export default AddStudent;
