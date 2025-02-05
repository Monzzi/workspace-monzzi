import { useState, useEffect } from 'react';
import { useAuth } from '../components/AuthContext';
import UserDelete from '../components/UserDelete';

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
            console.log('[DEBUG] Respuesta del backend:', data);
            setUsers(data);
        })
        .catch((err) => setError(err.message));
    }, [user]);

    const removeUserFromList = (userId) => {
      console.log('Intentando eliminar usuario con ID:', userId);
      console.log('Lista actual de usuarios:', users);
      setUsers(users.filter(user => {
          console.log('Comparando:', user.id, userId, user.id !== userId);
          return user.id !== userId
      }));
      console.log('Nueva lista de usuarios:', users.filter(user => user.id !== userId));
  };

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
                            {u.email} --- Tipo de usuario: {u.type} --- ID: {u.id} --- Activo: {u.active !== undefined ? (u.active ? 'Sí' : 'No') : 'Desconocido'}
                            <UserDelete 
                                user={{
                                    id: String(u.id),
                                    email: u.email,
                                    type: u.type
                                }} 
                                onDelete={removeUserFromList} 
                            />
                        </li>
                    ))
                ) : (
                    <p>No hay usuarios</p>
                )}
            </ul>
        </div>
    );
};
   
export default Users;