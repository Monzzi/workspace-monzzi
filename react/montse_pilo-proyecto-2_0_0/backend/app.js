require('dotenv').config();
const express = require('express');
const mustacheExpress = require('mustache-express');
const path = require('path');
const session = require('express-session');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const db = require('./models');
const { User, Teacher } = require('./models');
const { isAuthenticated, isAdmin } = require('./middlewares/auth');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware global (Relacionado con el punto 3: Middleware para manejar datos JSON y formularios)
app.use(express.json()); // Parsear JSON
app.use(express.urlencoded({ extended: true })); // Manejar datos enviados desde formularios

// Configuración de sesiones (Relacionado con el punto 7: Gestión de sesiones para login/logout)
app.use(
  session({
    secret: 'clau_molt_secreta',
    resave: false,
    saveUninitialized: false,
  }),
);

// Habilitar acceso al frontend
app.use(cors());

// Configuración del motor de vistas (Relacionado con el punto 7: Renderización de plantillas)
app.engine('html', mustacheExpress());
app.set('view engine', 'html');
app.set('views', path.join(__dirname, 'views'));

// Servir archivos estáticos (Relacionado con el punto 7: CSS y recursos estáticos para vistas)
app.use(express.static(path.join(__dirname, 'public')));

// Importar rutas (Relacionado con el punto 3: Rutas para CRUD de users, teachers, students)
const usersRouter = require('./routes/users');
const teachersRouter = require('./routes/teachers');
const studentsRouter = require('./routes/students');

// Rutas inicial con mensaje de saludo.
app.get('/', (req, res) => {
  res.send(
    '¡Bienvenid@ a la API del proyecto final de Express de Montse Pilo!',
  );
});

app.use('/api/users', usersRouter); // Punto 3: CRUD para usuarios
app.use('/api/teachers', teachersRouter); // Punto 3: CRUD para profesores
app.use('/api/students', studentsRouter); // Punto 3: CRUD para estudiantes

// Ruta para renderizar la vista de login (Relacionado con el punto 7: GET /login)
app.get('/login', (req, res) => {
  res.render('login');
});

// Manejo del login (Relacionado con el punto 8: POST /login para iniciar sesión)
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.render('error-login', {
      message: 'Todos los campos son obligatorios',
    });
  }
  try {
    const user = await User.findOne({
      where: { email: username },
      include: { model: Teacher, as: 'teacher' },
    });
    if (!user) {
      return res.render('error-login', { message: 'Usuario no encontrado' });
    }
    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return res.render('error-login', { message: 'Contraseña incorrecta' });
    }
    // Crear sesión
    req.session.isLoggedIn = true;
    req.session.user = {
      id: user.id,
      email: user.email,
      type: user.type,
      active: user.active,
      name: user.teacher ? user.teacher.name : 'Usuario sin nombre',
    };
    return res.redirect('/home');
  } catch (error) {
    res.status(500).send('Error en el servidor');
  }
});

// Cerrar sesión (Relacionado con el punto 11: POST /logout para eliminar sesión)
app.post('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      res.status(500).send('Error al cerrar la sesión');
      return;
    }
    res.redirect('/login');
  });
});

// Ruta del home (Relacionado con el punto 10: GET /home muestra contenido según tipo de usuario)
app.get('/home', isAuthenticated, (req, res) => {
  const { user } = req.session;
  if (user.type === 'admin') {
    return res.redirect('/users');
  }
  res.render('home', { user });
});

// Ruta para listar usuarios (Relacionado con el punto 9: GET /users protegido para usuarios admin)
app.get('/users', isAuthenticated, isAdmin, async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: ['id', 'email', 'type', 'active'],
    });
    res.render('users', { users });
  } catch (error) {
    res.status(500).send('Error al cargar los usuarios');
  }
});

// Generar token JWT (Relacionado con el punto 12: POST /api/token para autenticación con JWT)
app.post('/api/token', async (req, res) => {
  const { email, password } = req.body;
  console.log(`[INFO] Email recibido: ${email}`);
  console.log(`[INFO] Password recibido: ${password}`);

  try {
    const user = await User.findOne({ where: { email } });
    console.log(`[INFO] Usuario encontrado: ${user ? 'Sí' : 'No'}`);

    if (!user) {
      return res.status(401).json({ error: 'Usuario no encontrado' });
    }
    console.log(`[INFO] Datos del usuario:`, user.toJSON());

    const isValidPassword = await bcrypt.compare(password, user.password);
    console.log(`[INFO] Contraseña válida: ${isValidPassword}`);

    if (!isValidPassword) {
      return res.status(401).json({ error: 'Contraseña incorrecta' });
    }

    let teacherId = null;
    if (user.type === 'user') { // 🔹 Si es profesor, buscamos su `id` en `teachers`
      const teacher = await Teacher.findOne({ where: { user_id: user.id } });
      if (!teacher) {
        console.log(`[WARNING] No se encontró teacherId para el usuario ${user.email}`);
      }

      teacherId = teacher ? teacher.id : null;
    }

    console.log(`[INFO] teacherId asignado: ${teacherId}`);

    const token = jwt.sign(
      {
        userId: user.id, // 🔹 ID en la tabla `users`
        email: user.email,
        type: user.type,
        teacherId, // 🔹 Ahora `teacherId` se obtiene correctamente
      },
      'clau_molt_secreta', // Recuerda usar un archivo .env para esta clave
      { expiresIn: '20m' },
    );

    console.log('[INFO] Token generado correctamente:', token);
    res.json({ token });
  } catch (error) {
    console.log(`[ERROR] Ha ocurrido un problema en /api/token: ${error.message}`);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Manejo de errores para rutas no definidas
app.use((req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});

// Manejo de errores global
app.use((err, req, res, next) => {
  res.status(500).json({ error: 'Error interno del servidor' });
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} http://localhost:${PORT}`);
});
