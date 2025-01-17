const express = require('express');
const students = require('./repositories/students');
const { body, validationResult } = require('express-validator'); // añadimos la dependencia ejercicio 3 clase 4
const app = express();
const port = 3000;
app.use(express.json());

// Primer endpoint que viene de base.
app.get('/', (req, res) => {
  // Se define la cabecera HTTP con el tipo de contenido
  res.set('Content-Type', 'text/plain');
  // Se responde, en el cuerpo de la respuesta con el mensaje "Hello World!!"
  res.status(200).send('Hello World!!');
});

// Endpoint para obtener todos los estudiantes.
app.get('/students', (req, res) => {
  students.getAll().then((results) => res.json(results));
});

// Endpoint para insertar estudiantes. Con sus validaciones de email y fecha de nacimiento.
app.post('/students',
  [
    body('email').isEmail().withMessage('Email is not valid'), // validamos que sea un email
    body('date_of_birth').isDate().withMessage('Date of birth is not valid, must be YYYY-MM-DD'), // validamos que sea una fecha correcta
  ],
  (req, res) => {
    console.log('Datos recibidos:', req.body); // Log para depuración, por errores de depuración con DELETE

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array()
      });
    };

  if (!req.body.name || !req.body.last_name || !req.body.date_of_birth) {
    return res.status(422).send('All fields are required (name, last_name, date_of_birth)');
  }

  students.insert(req.body)
    .then((results) => {
      res.json({ success: true, message: 'Student was saved successfully' });
    })
    .catch((err) => {
      res.json({ success: false, message: err.message });
    });
});

// Ejercicios Clase 4
// Ejercicio 0 porque me he equivocado al crear un registro id 4 con postman.
// Endpoint para borrar estudiantes por id.
app.delete('/students/:id', async (req, res) => {
  const id = parseInt(req.params.id, 10);

  if (isNaN(id)) {
    return res.status(400).json({ message: 'ID must be a number' });
  }
  try {
    const result = await students.deleteById(id);

    if (result) {
      res.json({ success: true, message: 'Student was deleted successfully' });
    } else {
      res.status(404).json({ success: false, message: "Student doesn't exist" });
    }
  } catch (err) {
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// Ejercicio 1 clase 4. Endpoint get para obtener estudiantes por id.
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