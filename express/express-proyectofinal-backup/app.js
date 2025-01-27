require('dotenv').config();
const express = require('express');
const db = require('./models');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json()); // middleware para parsear json

// ruta de ejemplo inicial.
app.get('/', (req, res) => {
  res.send('Hello World');
});

// Punto 3. Rutas CRUD para el modelo User
const usersRouter = require('./routes/users');
app.use('/api/users', usersRouter);

// Punto 3. Rutas CRUD para el modelo Teacher
const teachersRouter = require('./routes/teachers');
app.use('/api/teachers', teachersRouter);



// // Punto 3. Rutas CRUD para el modelo Student
const studentsRouter = require('./routes/students');
app.use('/api/students', studentsRouter);


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} http://localhost:${PORT}`);
});
