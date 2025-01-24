require('dotenv').config();
const express = require('express');
const db = require('./models');
const mustacheExpress = require('mustache-express');
const path = require('path');
const session = require('express-session');
const bcrypt = require('bcrypt');
const { User } = require('./models');
const { isAuthenticated, isAdmin } = require('./middlewares/auth');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json()); // Parsear JSON

// Configurar sesiones
app.use(session({
  secret: 'clau_molt_secreta',
  resave: false,
  saveUninitialized: false,
}));

// Configurar el motor de plantillas Mustache
app.engine('html', mustacheExpress());
app.set('view engine', 'html');
app.set('views', path.join(__dirname, 'views')); // Carpeta de vistas

// Servir archivos estáticos como CSS e imágenes
app.use(express.static(path.join(__dirname, 'public')));
// Middleware para manejar datos enviados desde formularios
app.use(express.urlencoded({ extended: true }));

// Rutas
const usersRouter = require('./routes/users');
const teachersRouter = require('./routes/teachers');
const studentsRouter = require('./routes/students');

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('¡Bienvenido a la API del proyecto final!');
});

// // Añadir las rutas de usuarios, profesores y estudiantes
app.use('/api/users', usersRouter);
app.use('/api/teachers', teachersRouter);
app.use('/api/students', studentsRouter);




app.get('/login', (req, res) => {
  res.render('login');
});

app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Buscar al usuario por email
    const user = await User.findOne({ where: { email: username } });

    if (!user) {
      // Usuario no encontrado
      return res.render('error-login', { message: 'Usuario no encontrado' });
    }

    // Verificar la contraseña
    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      // Contraseña incorrecta
      return res.render('error-login', { message: 'Contraseña incorrecta' });
    }

    // Crear sesión
    req.session.isLoggedIn = true;
    req.session.user = {
      id: user.id,
      email: user.email,
      type: user.type,
      active: user.active,
    };

    // Redirigir a /home
    return res.redirect('/home');
  } catch (error) {
    console.error(`[ERROR] ${error.message}`);
    res.status(500).send('Error en el servidor');
  }
});

app.post('/logout', (req, res) => {
  // acabar la session
  req.session.destroy((err) => {
    if (err) {
      console.error(`[ERROR] ${err.message}`);
      res.status(500).send('Error al cerrar la sesión');
    }
    res.redirect('/login');
  });
});

app.get('/home', isAuthenticated, (req, res) => {
  const user = req.session.user;
  if (user.type === 'admin') {
    return res.redirect('/users');
  }
  console.log('usuario logueado:', user);
  res.render('home', { user });
});

app.get('/users', isAuthenticated, isAdmin, async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: ['id', 'email', 'type', 'active'],
    });
    console.log('users:', users);

    res.render('users', { users });
  } catch (error) {
    console.error(`[ERROR] ${error.message}`);
    res.status(500).send('Error al cargar los usuarios');
  }
});

app.post('/api/token', async (req, res) => {
  const { username, password } = req.body;

  try {
    // verificar si el usuario existe
    const user = await User.findOne({ where: { email: username } });

    if (!user) {
      return res.status(401).json({ error: 'Usuario no encontrado' });
    }

    // verificar si la contraseña es correcta
    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return res.status(401).json({ error: 'Contraseña incorrecta' });
    }

    // generar el token
    const token = jwt.sign(
      { email: user.email },
      'clau_molt_secreta',
      { expiresIn: '15m' }
    );

    res.json({ token });
  } catch (error) {
    console.error(`[ERROR] ${error.message}`);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Manejo de rutas no definidas (404)
app.use((req, res, next) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});

// Manejo de errores global
app.use((err, req, res, next) => {
  console.log(`[ERROR] ${err.message}`);
  res.status(500).json({ error: 'Error interno del servidor' });
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} http://localhost:${PORT}`);
});
