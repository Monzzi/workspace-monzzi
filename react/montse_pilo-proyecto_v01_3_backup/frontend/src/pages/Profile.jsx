import { useAuth } from "../components/AuthContext";

const Profile = () => {
  const { user } = useAuth();

  if (!user) {
    return <p className='propile-loading'>Cargando tu perfil...</p>;
  }

  // función para obtener el texto del rol del usuario
  const getRoleText = (role) => {
    return role === 'admin' ? 'Administración' : 'Profesorado';
  };

  // función para obtener el texto según el rol del usuario

  const getRoleMessage = (role) => {
    if (role === 'admin') {
      return "Como administrador, tienes acceso a la gestión de usuarios y profesores. " +
             "Puedes crear nuevos usuarios, asignar roles y gestionar el sistema.";
    }
    return "Como profesor, puedes gestionar tu lista de estudiantes y ver su información. " +
           "Accede a 'Mis Estudiantes' en el menú lateral para ver y administrar tu clase.";
  };

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h2 className="profile-title">Mi Perfil</h2>
      </div>

      <div className="profile-info">
        <div className="info-item">
          <span className="info-label">Email</span>
          <div className="info-value">{user.email}</div>
        </div>

        <div className="info-item">
          <span className="info-label">Rol</span>
          <div className="info-value">
            <span className={`role-badge ${user.role}`}>
              {getRoleText(user.role)}
            </span>
          </div>
        </div>

        {user.role === 'user' && user.teacherId && (
          <div className="info-item">
            <span className="info-label">ID de Profesor</span>
            <div className="info-value">{user.teacherId}</div>
          </div>
        )}

        <div className="profile-message">
          <p>{getRoleMessage(user.role)}</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
