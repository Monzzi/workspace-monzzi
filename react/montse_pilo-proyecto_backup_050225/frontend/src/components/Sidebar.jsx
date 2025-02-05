import { Link } from 'react-router-dom';
import { useAuth } from '../components/AuthContext';

const Sidebar = () => {
  const { user, logout } = useAuth(); // Obtener usuario y función logout

  // Si el usuario no está definido, mostramos un mensaje
  if (!user) {
    return <p className="sidebar-loading">Cargando menú...</p>;
  }

  return (
    <nav className="sidebar">
      <h2>Menú</h2>
      <ul>
        <li>
          <Link to="/profile">Perfil</Link>
        </li>

        {/* 🔹 MOSTRAR SEGÚN EL ROL DEL USUARIO */}
        {user.role === 'admin' && (
          <li>
            <Link to="/users">Usuarios</Link>
          </li>
        )}
        {user.role === 'user' && (
          <li>
            <Link to="/students">Estudiantes</Link>
          </li>
        )}

        <li>
          <button onClick={logout} className="logout-button">Logout</button>
        </li>
      </ul>
    </nav>
  );
};

export default Sidebar;
