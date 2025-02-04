import { useState, useEffect } from 'react';
import { useAuth } from '../components/AuthContext';


const Users = () => {
    const { user } = useAuth();
    const [users, setUsers] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
    if (!user) return;
    if (user.role!=='admin') return;
       
      
    fetch('http://localhost:3000/api/users', {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
  })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error al obtener el listado de usuarios');
        }
        return response.json();
      })
     .then((data) => {
        console.log('[DEBUG] Respuesta del backend:', data); // 🔍 Ver qué devuelve el backend
        setUsers(data);
      })
      .catch((err) => setError(err.message));
  }, [user]);

  if (!user || user.role !== 'admin') {
    return <h1>Acceso no autorizado</h1>;
  }

  return (
    <div>
      <h2>Listado de usuarios</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul>
        {users.length > 0 ? (
    users.map((u) => (
      <li key={u.id}>
        {u.email} --- Tipo de usuario: {u.type} --- Usuario: {u.id} --- Active: {u.active !== undefined ? (u.active ? 'true' : 'false') : 'Desconocido'}
      </li>
    ))
            ) : (
          <p>No hay usuarios</p>
        )}
      </ul>
    </div>
  );
}
   
export default Users;
  