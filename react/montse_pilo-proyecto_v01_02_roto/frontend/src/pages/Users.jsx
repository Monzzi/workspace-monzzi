import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../components/AuthContext';
import UserDelete from '../components/UserDelete';

const Users = () => {
    const navigate = useNavigate();
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
        setUsers(prevUsers => {
            const updatedUsers = prevUsers.filter(user => String(user.id) !== String(userId));
            console.log('✅ Lista de usuarios después de eliminar:', updatedUsers);
            return [...updatedUsers];  // Creamos un nuevo array para asegurar la actualización
        });
    
        setTimeout(() => {
            console.log("🔥 Estado actualizado después de 100ms:", users);
        }, 100);
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
            
            <button onClick={() => {
                console.log('[DEBUG] Redirigiendo a /signup');
                navigate('/signup');
            }}>Crear usuario</button>
        </div>
    );
};
   
export default Users;
