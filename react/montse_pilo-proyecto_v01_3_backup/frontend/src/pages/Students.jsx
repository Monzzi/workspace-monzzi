// pages/Students.jsx
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
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
          }
        );

        if (!response.ok) {
          throw new Error('Error al obtener los estudiantes');
        }

        const data = await response.json();
        setStudents(data);
        setError('');
      } catch (err) {
        console.error('Error al obtener estudiantes:', err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStudents();
  }, [user]);

  const handleStudentDeleted = (studentId) => {
    setStudents(currentStudents => 
      currentStudents.filter(student => student.id !== studentId)
    );
  };

  const handleStudentAdded = (newStudent) => {
    setStudents(currentStudents => [...currentStudents, newStudent]);
  };

  if (isLoading) {
    return <div className="loading-message">Cargando estudiantes...</div>;
  }

  if (!user || user.role !== 'user') {
    return <div className="error-message">No tienes permiso para ver esta página.</div>;
  }

  return (
    <div className="students-container">
      <div className="students-header">
        <h2 className="students-title">Gestión de Estudiantes</h2>
      </div>

      {error && <div className="error-message">{error}</div>}

      <div className="students-list">
        {students.length > 0 ? (
          students.map((student) => (
            <StudentDelete 
              key={student.id}
              student={student}
              onDelete={handleStudentDeleted}
            />
          ))
        ) : (
          <p className="empty-message">No hay estudiantes asignados.</p>
        )}
      </div>

      <div className="add-student-section">
        <AddStudent onStudentAdded={handleStudentAdded} />
      </div>
    </div>
  );
};

export default Students;