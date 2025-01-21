const express = require('express');
const router = express.Router();
const { Teacher, User } = require('../models'); // Importa los modelos
const { body, validationResult } = require('express-validator');

// Obtener todos los profesores
router.get('/', async (req, res) => {
  try {
    const teachers = await Teacher.findAll({ include: 'user' }); // Incluye la relación con `User`
    res.json(teachers);
  } catch (error) {
    console.error('Error al obtener los profesores:', error);
    res.status(500).json({ error: 'Error al obtener los profesores' });
  }
});

// Obtener un profesor por ID
router.get('/:id', async (req, res) => {
  try {
    const teacher = await Teacher.findByPk(req.params.id, { include: 'user' }); // Incluye la relación con `User`
    if (!teacher) {
      return res.status(404).json({ error: 'Profesor no encontrado' });
    }
    res.json(teacher);
  } catch (error) {
    console.error('Error al obtener el profesor:', error);
    res.status(500).json({ error: 'Error al obtener el profesor' });
  }
});

router.post(
  '/',
  [
    // Validaciones
    body('dni').notEmpty().withMessage('El DNI es obligatorio'),
    body('name').notEmpty().withMessage('El nombre es obligatorio'),
    body('last_name').notEmpty().withMessage('El apellido es obligatorio'),
    body('date_of_birth').isDate().withMessage('La fecha de nacimiento debe ser válida'),
    body('user_id').isInt().withMessage('El ID de usuario debe ser un número entero'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { dni, name, last_name, date_of_birth, user_id } = req.body;

    try {
      // Verificar si el usuario asociado existe
      const user = await User.findByPk(user_id);
      if (!user) {
        return res.status(404).json({ error: 'Usuario asociado no encontrado' });
      }

      // Crear el nuevo profesor
      const newTeacher = await Teacher.create({ dni, name, last_name, date_of_birth, user_id });
      res.status(201).json(newTeacher);
    } catch (error) {
      console.error('Error al crear el profesor:', error);

      // Manejo específico de errores de Sequelize
      if (error.name === 'SequelizeForeignKeyConstraintError') {
        return res.status(400).json({ error: 'Clave foránea no válida: el usuario no existe' });
      }

      res.status(500).json({ error: 'Error al crear el profesor' });
    }
  }
);

router.put('/:id', async (req, res) => {
  try {
    const { dni, name, last_name, date_of_birth, user_id } = req.body;

    // Busca al profesor por su ID
    const teacher = await Teacher.findByPk(req.params.id);
    if (!teacher) {
      return res.status(404).json({ error: 'Profesor no encontrado' });
    }

    // Verifica si el usuario asociado existe
    if (user_id) {
      const user = await User.findByPk(user_id);
      if (!user) {
        return res.status(404).json({ error: 'Usuario asociado no encontrado' });
      }
    }

    // Actualiza los datos del profesor
    await teacher.update({ dni, name, last_name, date_of_birth, user_id });
    res.json(teacher);
  } catch (error) {
    console.error('Error al actualizar el profesor:', error);
    res.status(500).json({ error: 'Error al actualizar el profesor' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const teacher = await Teacher.findByPk(req.params.id);

    if (!teacher) {
      return res.status(404).json({ error: 'Profesor no encontrado' });
    }

    // Verificar si tiene estudiantes asociados
    const students = await teacher.getStudents(); // Asumiendo que configuraste la relación
    if (students.length > 0) {
      return res.status(400).json({ error: 'No se puede eliminar un profesor con estudiantes asociados' });
    }

    // Eliminar el profesor
    await teacher.destroy();
    res.json({ message: 'Profesor eliminado correctamente' });
  } catch (error) {
    console.error('Error al eliminar el profesor:', error);
    res.status(500).json({ error: 'Error al eliminar el profesor' });
  }
});

module.exports = router;
