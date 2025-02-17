// App.jsx
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
