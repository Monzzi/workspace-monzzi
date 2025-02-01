import { useAuth } from '../components/AuthContext';

const Dashboard = () => {
  const { user, logout } = useAuth();
  console.log('[INFO] Usuario en Dashboard:', user); // control

  if (!user) {
    return <p>Cargando usuario...</p>;
  }

  return (
    <div>
      <h2>Bienvenido, {user.email}</h2>
      <p>Tu rol es: {user.role}</p>
      <button onClick={logout}>Cerrar sesión</button>
    </div>
  );
};

export default Dashboard;
