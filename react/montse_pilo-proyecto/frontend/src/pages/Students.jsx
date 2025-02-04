import { useState, useEffect } from 'react';
import { useAuth } from '../components/AuthContext';

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
          students.map((s) => <li key={s.id}>{s.name} {s.last_name} --- DNI: {s.dni}</li>)
        ) : (
          <p>No hay estudiantes asignados.</p>
        )}
      </ul>
    </div>
  );
};

export default Students;