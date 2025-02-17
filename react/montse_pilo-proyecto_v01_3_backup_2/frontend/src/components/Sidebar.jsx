// Componente que muestra y gestiona las opciones del menú de navegación de la aplicación
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from './AuthContext';

const Sidebar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();

  // Si el usuario no está cargado, se muestra un mensaje de carga
  if (!user) {
    return (
      <div className="sidebar">
        <div className="sidebar-header">
          <h1>Cargando...</h1>
        </div>
      </div>
    );
  }

  // Si el usuario es un administrador, se muestran las opciones de gestión de usuarios
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h1>Panel de Control</h1>
      </div>

      <nav className="sidebar-nav">
        <ul className="nav-list">
          <li className="nav-item">
            <Link
              to="/profile"
              className={`nav-link ${
                location.pathname === '/profile' ? 'active' : ''
              }`}
            >
              Mi Perfil
            </Link>
          </li>

          {user.role === 'admin' && (
            <>
              <li className="nav-item">
                <Link
                  to="/users"
                  className={`nav-link ${
                    location.pathname === '/users' ? 'active' : ''
                  }`}
                >
                  Gestionar Usuarios
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/signup"
                  className={`nav-link ${
                    location.pathname === '/signup' ? 'active' : ''
                  }`}
                >
                  Crear Usuario
                </Link>
              </li>
            </>
          )}
          {user.role === 'user' && (   // Si el usuario es un usuario, se muestra la opción de ver sus estudiantes
            <li className="nav-item">
              <Link
                to="/students"
                className={`nav-link ${
                  location.pathname === '/students' ? 'active' : ''
                }`}
              >
                Mis Estudiantes
              </Link>
            </li>
          )}

          <li className="nav-item">
            <button onClick={logout} className="logout-button">
              Cerrar Sesión
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
