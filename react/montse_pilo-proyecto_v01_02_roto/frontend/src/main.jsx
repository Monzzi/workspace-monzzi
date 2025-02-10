import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Users from "./pages/Users";
import Students from "./pages/Students";
import Signup from "./pages/Signup";
import Sidebar from "./components/Sidebar";
import ProtectedRoute from "./components/ProtectedRoute"; 
import { AuthProvider } from "./components/AuthContext";  // ✅ Importamos el AuthProvider
import './index.css';

// Layout Principal con Sidebar
const Layout = () => (
  <AuthProvider>  {/* 🔥 AHORA AuthProvider ENVUELVE TODO */}
    <div className="app-layout">
      <Sidebar />
      <div className="content">
        <RouterProvider router={router} /> {/* 🔥 Aquí van todas las rutas */}
      </div>
    </div>
  </AuthProvider>
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />, // 🔥 Todo usa el Layout que ya tiene AuthProvider
    children: [
      { path: "", element: <Home /> }, 
      { path: "profile", element: <Profile /> },
      { path: "signup", element: <Signup /> },
      {
        path: "users",
        element: (
          <ProtectedRoute role="admin">
            <Users />
          </ProtectedRoute>
        ),
      },
      {
        path: "students",
        element: (
          <ProtectedRoute role="teacher">
            <Students />
          </ProtectedRoute>
        ),
      },
    ],
  },
  { path: "/login", element: <Login /> },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
