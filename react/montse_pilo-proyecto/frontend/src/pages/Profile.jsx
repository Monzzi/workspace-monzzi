import { useAuth } from "../components/AuthContext";

const Profile = () => {
  const { user } = useAuth();

  if (!user) {
    return <p className='propile-loading'>Cargando tu perfil...</p>;
  }

  return (
    <div className="profile-container">
        <h3>Perfil del usuario</h3>
        <p>Email: {user.email}</p>
        <p>Rol en la organización: {user.role === 'admin' ? 'Administración' : 'Profesorado'}</p>
  
          {user.role === 'admin' ? (
            <p>Eres un administrador y puedes gestionar usuarios.</p>
          ) : (
            <p>Formas parte del profesorado y puedes ver a tus estudiantes clicando estudiantes.</p>
          )}
        </div>
      );
    };
    
export default Profile;