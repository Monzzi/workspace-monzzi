import { useState, useEffect } from 'react';
import { useAuth } from '../components/AuthContext';
import UserDelete from '../components/UserDelete';
import UserStatus from '../components/UserStatus';

// Componente Users: Gestiona la lista de usuarios del sistema (solo accesible por admin)
const Users = () => {
  const { user } = useAuth();
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');

  // Función para cargar la lista de usuarios desde el backend
  const loadUsers = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/users', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });

      if (!response.ok) {
        throw new Error('Error al obtener el listado de usuarios');
      }
      const data = await response.json();
      setUsers(data);
    } catch (err) {
      setError(err.message);
    }
  };

  // Cargar la lista de usuarios al montar el componente
  useEffect(() => {
    // Solo cargar la lista si el usuario es admin
    if (!user || user.role !== 'admin') return;
    loadUsers();
  }, [user]);

  // Manejador para actualizar la lista cuando se elimina un usuario
  const handleUserDeleted = (userId) => {
    setUsers((prevUsers) => prevUsers.filter((u) => Number(u.id) !== userId));
  };

  // Manejador para actualizar la lista cuando cambia el estado de un usuario
  const handleStatusChange = (updatedUser) => {
    setUsers((prevUsers) =>
      prevUsers.map((u) => (u.id === updatedUser.id ? updatedUser : u)),
    );
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

              <div className="user-actions">
                <UserStatus
                  user={{
                    id: String(u.id),
                    active: !!u.active,
                  }}
                  onStatusChange={(updatedUser) =>
                    handleStatusChange(updatedUser)
                  }
                />
                <UserDelete
                  user={{
                    id: String(u.id),
                    email: u.email,
                    type: u.type,
                  }}
                  onDelete={handleUserDeleted}
                />
              </div>
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
