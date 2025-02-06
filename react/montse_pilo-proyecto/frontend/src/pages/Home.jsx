import { useNavigate } from 'react-router-dom';
// import './styles/Home.css';

const Home = () => {
  const navigate = useNavigate(); // Hook para navegar

  return (
    <div className="home-container">
      <h2>Página de Inicio</h2>
      <p>Bienvenido a la aplicación.</p>
      <button className="login-button" onClick={() => navigate('/login')}>
        Iniciar Sesión
      </button>
    </div>
  );
};

export default Home;
