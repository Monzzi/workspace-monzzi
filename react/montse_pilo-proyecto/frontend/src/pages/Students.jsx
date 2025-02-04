import { useState, useEffect } from 'react';
import { useAuth } from '../components/AuthContext';

const Students = () => {
  const { user } = useAuth();
  const [students, setStudents] = useState([]);
  const [error, setError] = useState('');

  // Log completo y detallado del objeto user
  console.log('[DEBUG] USER COMPLETO:', JSON.stringify(user, null, 2));

  // Log de todas las propiedades del user
  useEffect(() => {
    if (user) {
      Object.keys(user).forEach(key => {
        console.log(`[DEBUG] Propiedad ${key}:`, user[key]);
      });
    }
  }, [user]);

  useEffect(() => {
    console.log('[DEBUG] Detalles completos del usuario:', {
      userExists: !!user,
      teacherId: user?.teacherId,
      role: user?.role,
      token: localStorage.getItem('token')
    });

    if (!user) {
      console.log('[DEBUG] user aún no está cargado en Students.jsx. Esperando...');
      return;
    }

    // Añadimos más logs de depuración
    console.log('[DEBUG] Tipo de teacherId:', typeof user.teacherId);
    console.log('[DEBUG] Valor de teacherId:', user.teacherId);
    console.log('[DEBUG] ¿teacherId es undefined?:', user.teacherId === undefined);
    console.log('[DEBUG] ¿teacherId es null?:', user.teacherId === null);

    // Modificamos la condición de verificación
    if (user.teacherId === undefined || user.teacherId === null) {
      console.log('[DEBUG] teacherId aún no está definido en Students.jsx. Esperando...');
      return;
    }

    if (user.role === 'user') {
      console.log('[DEBUG] Haciendo petición a:', `http://localhost:3000/api/teachers/${user.teacherId}/students`);

      fetch(`http://localhost:3000/api/teachers/${user.teacherId}/students`, { 
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Error al obtener los estudiantes');
          }
          return response.json();
        })
        .then((data) => {
          console.log('[DEBUG] Respuesta del backend (students):', data);
          setStudents(data);
        })
        .catch((err) => {
          console.error('[ERROR] Error al obtener estudiantes:', err);
          setError(err.message);
        });
    }
  }, [user]); // ✅ useEffect solo se ejecuta cuando user cambia.

  if (!user || user.role !== 'user') {
    return <p>No tienes permiso para ver esta página.</p>;
  }

  return (
    <div>
      <h2>Lista de Estudiantes</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul>
        {students.length > 0 ? (
          students.map((s) => <li key={s.id}>{s.name} - {s.email}</li>)
        ) : (
          <p>No hay estudiantes asignados.</p>
        )}
      </ul>
    </div>
  );
};

export default Students;