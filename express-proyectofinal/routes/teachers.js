const express = require('express');
const router = express.Router();
const { Teacher, Student, User } = require('../models'); // Importa los modelos
const { body, validationResult } = require('express-validator');

// GET: Obtener todos los profesores
router.get('/', async (req, res) => {
  try {
    const teachers = await Teacher.findAll({ include: 'user' });
    res.json(teachers);
  } catch (error) {
    console.log(`[ERROR] Error al obtener los profesores: ${error.message}`);
    res.status(500).json({ error: 'Error al obtener los profesores' });
  }
});

// GET: Obtener un profesor por ID
router.get('/:id', async (req, res) => {
  try {
    const teacher = await Teacher.findByPk(req.params.id, { include: 'user' });
    if (!teacher) {
      return res.status(404).json({ error: 'Profesor no encontrado' });
    }
    res.json(teacher);
  } catch (error) {
    console.log(`[ERROR] Error al obtener el profesor: ${error.message}`);
    res.status(500).json({ error: 'Error al obtener el profesor' });
  }
});

// GET: Obtener estudiantes de un profesor (Punto 5)
router.get('/:id/students', async (req, res) => {
  try {
    const { id } = req.params;

    const teacherInstance = await Teacher.findByPk(id, {
      include: [{ model: User, as: 'user' }],
    });

    if (!teacherInstance) {
      return res.status(404).json({ error: 'Profesor no encontrado' });
    }
    if (!teacherInstance.user.active) {
      return res.status(401).json({ error: 'El usuario asociado al profesor no está activo' });
    }

    const students = await Student.findAll({
      where: { teacher_id: id },
      order: [['date_of_birth', 'ASC']],
    });

    res.json(students);
  } catch (error) {
    console.log(`[ERROR] Error al obtener los estudiantes del profesor: ${error.message}`);
    res.status(500).json({ error: 'Error al obtener los estudiantes del profesor' });
  }
});

// POST: Crear un nuevo profesor
router.post('/',
  [
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
      const user = await User.findByPk(user_id);
      if (!user) {
        return res.status(404).json({ error: 'Usuario asociado no encontrado' });
      }

      const newTeacher = await Teacher.create({ dni, name, last_name, date_of_birth, user_id });
      res.status(201).json(newTeacher);
    } catch (error) {
      console.log(`[ERROR] Error al crear el profesor: ${error.message}`);
      res.status(500).json({ error: 'Error al crear el profesor' });
    }
  }
);

// PUT: Actualizar un profesor
router.put('/:id', async (req, res) => {
  try {
    const { dni, name, last_name, date_of_birth, user_id } = req.body;

    const teacher = await Teacher.findByPk(req.params.id);
    if (!teacher) {
      return res.status(404).json({ error: 'Profesor no encontrado' });
    }

    if (user_id) {
      const user = await User.findByPk(user_id);
      if (!user) {
        return res.status(404).json({ error: 'Usuario asociado no encontrado' });
      }
    }

    await teacher.update({ dni, name, last_name, date_of_birth, user_id });
    res.json(teacher);
  } catch (error) {
    console.log(`[ERROR] Error al actualizar el profesor: ${error.message}`);
    res.status(500).json({ error: 'Error al actualizar el profesor' });
  }
});

// DELETE: Eliminar un profesor
router.delete('/:id', async (req, res) => {
  try {
    const teacherInstance = await Teacher.findByPk(req.params.id, {
      include: ['students'],
    });

    if (!teacherInstance) {
      return res.status(404).json({ error: 'Profesor no encontrado' });
    }

    if (teacherInstance.students && teacherInstance.students.length > 0) {
      return res.status(400).json({ error: 'No se puede eliminar un profesor con estudiantes asociados' });
    }

    await teacherInstance.destroy();
    res.json({ message: 'Profesor eliminado correctamente' });
  } catch (error) {
    console.log(`[ERROR] Error al eliminar el profesor: ${error.message}`);
    res.status(500).json({ error: 'Error al eliminar el profesor' });
  }
});

module.exports = router;
