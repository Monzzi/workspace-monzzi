import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './components/AuthContext';
import Layout from './components/Layout';
import Login from './pages/Login';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Users from './pages/Users';
import Students from './pages/Students';
import ProtectedRoute from './components/ProtectedRoute';
import Signup from './pages/Signup';
import './index.css';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />

          <Route path="/" element={<Layout />}>
            <Route path="profile" element={<ProtectedRoute />}>
              <Route index element={<Profile />} />
            </Route>
            <Route path="users" element={<ProtectedRoute />}>
              <Route index element={<Users />} />
            </Route>

            <Route path="students" element={<ProtectedRoute />}>
              <Route index element={<Students />} />
            </Route>

            <Route path="signup" element={<Signup />} />
            
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
