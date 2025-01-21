const express = require('express');
const students = require('./repositories/students');
const { body, validationResult } = require('express-validator');
const app = express();
const port = 3000;
app.use(express.json());

app.get('/students', (req, res) => {
  students.getAll().then((results) => res.json(results));
});

app.post('/students',
  [
    body('email').isEmail().withMessage('Email is not valid'),
    body('date_of_birth').isDate().withMessage('Date of birth is not valid, must be YYYY-MM-DD'),
  ],
  async (req, res) => {
    // Primero validamos el formato de los datos
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, last_name, date_of_birth, email, active } = req.body;

    try {
      // Comprobamos si existe un estudiante con ese email
      const existingStudent = await students.getByEmail(email);

      // Si existe un estudiante con ese email, devolvemos error
      if (existingStudent) {
        return res.status(422).json({
          success: false,
          message: 'A user already exists with this email'
        });
      }

      // Si no existe, procedemos a crear el nuevo estudiante
      await students.insert({ name, last_name, date_of_birth, email, active });
      res.status(201).json({ success: true, message: 'Student was saved successfully' });

    } catch (error) {
      console.error('Error al insertar el estudiante:', error);

      if (error.name === 'SequelizeValidationError') {
        return res.status(400).json({
          success: false,
          message: 'Validation error',
          details: error.errors.map(err => err.message),
        });
      }

      // Otros errores no controlados
      res.status(500).json({
        success: false,
        message: 'Internal server error',
      });
    }
  }
);

// Ejercicio 1 clase 5 endpoint get para obtener estudiante por id.
app.get('/students/:id', async (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) {
    return res.status(400).json({ message: 'ID must be a number' });
  }
  try {
    const student = await students.getById(id); // Llama a la función getById
    if (student) {
      res.json(student); // Devuelve los datos del estudiante si existe
    } else {
      res.status(404).json({ message: 'Student doesn’t exist' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.listen(port, () => {
  console.log(`Example server listening on http://localhost:${port}`);
});
