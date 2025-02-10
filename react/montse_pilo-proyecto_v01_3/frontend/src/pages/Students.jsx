import { useState, useEffect } from 'react';
import { useAuth } from '../components/AuthContext';
import StudentDelete from '../components/StudentDelete';
import AddStudent from '../components/AddStudent';  

const Students = () => {
  const { user } = useAuth();
  const [students, setStudents] = useState([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStudents = async () => {
      if (!user || !user.teacherId) {
        setIsLoading(false);
        return;
      }

      try {
        const response = await fetch(
          `http://localhost:3000/api/teachers/${user.teacherId}/students`, 
          {
            headers: { 
              Authorization: `Bearer ${localStorage.getItem('token')}` 
            },
          }
        );

        if (!response.ok) {
          throw new Error('Error al obtener los estudiantes');
        }

        const data = await response.json();
        console.log('[DEBUG] Respuesta del backend (students):', data);
        setStudents(data);
        setError('');
      } catch (err) {
        console.error('[ERROR] Error al obtener estudiantes:', err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStudents();
  }, [user]);

  // función para actualizar la lista de estudiantes después de eliminar uno
  const removeStudentFromList = (studentId) => {
    setStudents(students.filter((s) => s.id !== studentId));
  };

  // función para actualizar lista cuando se agrega un estudiante
  const addStudentToList = (newStudent) => {
    setStudents([...students, newStudent]);
  };

  if (isLoading) {
    return <p>Cargando...</p>;
  }

  if (!user || user.role !== 'user') {
    return <p>No tienes permiso para ver esta página.</p>;
  }

  return (
    <div>
      <h2>Lista de Estudiantes</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul>
        {students.length > 0 ? (
          students.map((s) => (
            <div key={s.id}>
              {/* <li>{s.name} {s.last_name} --- DNI: {s.dni}</li> */}
              <StudentDelete student={s} onDelete={removeStudentFromList} />
            </div>
          ))
        ) : (
          <p>No hay estudiantes asignados.</p>
        )}
      </ul>

      <AddStudent onStudentAdded={addStudentToList} />
    </div>
);
};

export default Students;
