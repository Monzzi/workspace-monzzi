# Proyecto Frontend - Gestión Académica

Aplicación React que implementa un sistema de gestión académica con autenticación y diferentes roles de usuario.

## Roles y Funcionalidades

**Administrador - "admn"**
- Consultar su perfil
- Ver y gestionar todos los usuarios
- Crear nuevos profesores y administradores
- Eliminar usuarios. 
- Activar/desactivar usuarios

**Profesor - "user"**
- Ver su perfil personal
- Ver y gestionar sus estudiantes
- Añadir/eliminar estudiantes

## Pantallas Principales
- Login: Acceso al sistema
- Profile: Datos del usuario conectado
- Users: Lista y gestión de usuarios (solo admin)
- Students: Lista y gestión de estudiantes (solo user-profesor)

## Estrutura del frontend

frontend/
|
├── src/
│   ├── App.jsx               # Componente principal y configuración de rutas
│   ├── main.jsx              # Punto de entrada de la aplicación
│   ├── index.css             # Estilos globales
│   │
│   ├── components/           # Componentes reutilizables
│   │   ├── AddStudent.jsx    # Formulario para añadir estudiantes
│   │   ├── AuthContext.jsx   # Contexto de autenticación
│   │   ├── Layout.jsx        # Estructura común de la aplicación
│   │   ├── ProtectedRoute.jsx # Control de acceso a rutas
│   │   ├── Sidebar.jsx       # Menú lateral
│   │   ├── StudentDelete.jsx # Componente de eliminar estudiante
│   │   ├── UserDelete.jsx    # Componente de eliminar usuario
│   │   └── UserStatus.jsx    # Estado de activación de usuario
│   │
│   ├── pages/               # Páginas de la aplicación
│   │   ├── Login.jsx        # Página de inicio de sesión
│   │   ├── Profile.jsx      # Perfil de usuario
│   │   ├── Signup.jsx       # Registro de usuarios
│   │   ├── Students.jsx     # Gestión de estudiantes
│   │   └── Users.jsx        # Gestión de usuarios
│   │
│   ├── routes/             # Configuración de rutas
│   │   └── index.jsx       # Definición de rutas
│   │
│   └── utils/             # Utilidades
│       └── validateDNI.js # Validación de DNI
│
├── public/               # Archivos públicos
│   └── coding.png       # Logo de la aplicación
│
├── index.html           # HTML principal
└── package.json         # Dependencias y scripts


## Configuración inicial rápida global.

- **Instrucciones** de inicio rápido global aquí: 

[Readme.md](../Readme.md)

## Credenciales de acceso a la sesión para los dos tipos de usuarios

**Usuario admin:**
  - email: admin@example.com
  - Password: adminPass123

**Usuario user-profesor:**
  - Username: teacher1@example.com
  - Password: teacherPass456

## Inicio en caso de problemas con el inicio rápido

 ``` bash
 cd frontend
 npm run dev
 ``` 
 