// Componente principal de la aplicación que configura:
// 1. El sistema de rutas con BrowserRouter
// 2. El contexto de autenticación con AuthProvider
// 3. Las rutas de la aplicación con AppRoutes
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './components/AuthContext';
import AppRoutes from './routes';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
