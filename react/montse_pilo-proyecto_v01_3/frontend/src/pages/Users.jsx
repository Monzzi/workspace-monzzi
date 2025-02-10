// pages/Users.jsx
import { useState, useEffect } from 'react';
import { useAuth } from '../components/AuthContext';
import UserDelete from '../components/UserDelete';

const Users = () => {
    const { user } = useAuth();
    const [users, setUsers] = useState([]);
    const [error, setError] = useState('');

    // Función para cargar usuarios
    const loadUsers = async () => {
        console.log('🔄 Cargando usuarios...');

        try {
            const response = await fetch('http://localhost:3000/api/users', {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
            });

            if (!response.ok) {
                throw new Error('Error al obtener el listado de usuarios');
            }
            const data = await response.json();
            console.log('📥 Usuarios cargados:', data);

            setUsers(data);
        } catch (err) {
            console.error('❌ Error cargando usuarios:', err);

            setError(err.message);
        }
    };

    // Cargar usuarios al montar el componente
    useEffect(() => {
        if (!user || user.role !== 'admin') return;
        loadUsers();
    }, [user]);

    // Función para manejar la eliminación
    const handleUserDeleted = (userId) => {
        console.log('🗑️ Manejando eliminación de usuario:', userId);

        // convertimos useriD a número para la comparación
        const userIdNum = Number(userId);
        setUsers(prevUsers => prevUsers.filter(u => u.id !== userIdNum));
        };

    if (!user || user.role !== 'admin') {
        return <h1>Acceso no autorizado</h1>;
    }

    return (
        <div className="users-container">
            <div className="users-header">
                <h2 className="users-title">Gestión de Usuarios</h2>
            </div>

            {error && <div className="error-message">{error}</div>}

            <div className="users-list">
                {users.length > 0 ? (
                    users.map((u) => (
                        <div key={u.id} className="user-item">
                            <div className="user-info">
                                <div className="user-email">{u.email}</div>
                                <div className="user-type">
                                    Rol: {u.type === 'admin' ? 'Administrador' : 'Profesor'}
                                </div>
                            </div>
                            <div className={`user-status ${u.active ? 'active' : 'inactive'}`}>
                                {u.active ? 'Activo' : 'Inactivo'}
                            </div>
                            <UserDelete 
                                user={{
                                    id: String(u.id),
                                    email: u.email,
                                    type: u.type
                                }} 
                                onDelete={handleUserDeleted}
                            />
                        </div>
                    ))
                ) : (
                    <p className="empty-message">No hay usuarios registrados</p>
                )}
            </div>
        </div>
    );
};

export default Users;