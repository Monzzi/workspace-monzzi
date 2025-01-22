const express = require('express');
const router = express.Router();
const { Student, Teacher } = require('../models'); // Importa los modelos
const { body, validationResult } = require('express-validator');

// GET: Obtener todos los estudiantes
router.get('/', async (req, res) => {
  try {
    const students = await Student.findAll({ include: 'teacher' });
    res.json(students);
  } catch (error) {
    console.log(`[ERROR] Error al obtener los estudiantes: ${error.message}`);
    res.status(500).json({ error: 'Error al obtener los estudiantes' });
  }
});

// GET: Obtener un estudiante por ID
router.get('/:id', async (req, res) => {
  try {
    const student = await Student.findByPk(req.params.id, { include: 'teacher' });
    if (!student) {
      return res.status(404).json({ error: 'Estudiante no encontrado' });
    }
    res.json(student);
  } catch (error) {
    console.log(`[ERROR] Error al obtener el estudiante: ${error.message}`);
    res.status(500).json({ error: 'Error al obtener el estudiante' });
  }
});

// POST: Crear un nuevo estudiante
router.post('/',
  [
    body('dni').notEmpty().withMessage('El DNI es obligatorio'),
    body('name').notEmpty().withMessage('El nombre es obligatorio'),
    body('last_name').notEmpty().withMessage('El apellido es obligatorio'),
    body('date_of_birth').isDate().withMessage('La fecha de nacimiento debe ser válida'),
    body('teacher_id').isInt().withMessage('El ID del profesor debe ser un número entero'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { dni, name, last_name, date_of_birth, teacher_id } = req.body;

    try {
      const teacher = await Teacher.findByPk(teacher_id);
      if (!teacher) {
        return res.status(404).json({ error: 'Profesor asociado no encontrado' });
      }

      const newStudent = await Student.create({ dni, name, last_name, date_of_birth, teacher_id });
      res.status(201).json(newStudent);
    } catch (error) {
      console.log(`[ERROR] Error al crear el estudiante: ${error.message}`);
      res.status(500).json({ error: 'Error al crear el estudiante' });
    }
  }
);

// PUT: Actualizar un estudiante por ID
router.put('/:id', async (req, res) => {
  try {
    const { dni, name, last_name, date_of_birth, teacher_id } = req.body;

    const student = await Student.findByPk(req.params.id);
    if (!student) {
      return res.status(404).json({ error: 'Estudiante no encontrado' });
    }

    if (teacher_id) {
      const teacher = await Teacher.findByPk(teacher_id);
      if (!teacher) {
        return res.status(404).json({ error: 'Profesor asociado no encontrado' });
      }
    }

    await student.update({ dni, name, last_name, date_of_birth, teacher_id });
    res.json(student);
  } catch (error) {
    console.log(`[ERROR] Error al actualizar el estudiante: ${error.message}`);
    res.status(500).json({ error: 'Error al actualizar el estudiante' });
  }
});

// DELETE: Eliminar un estudiante por ID
router.delete('/:id', async (req, res) => {
  try {
    const student = await Student.findByPk(req.params.id);

    if (!student) {
      return res.status(404).json({ error: 'Estudiante no encontrado' });
    }

    await student.destroy();
    res.json({ message: 'Estudiante eliminado correctamente' });
  } catch (error) {
    console.log(`[ERROR] Error al eliminar el estudiante: ${error.message}`);
    res.status(500).json({ error: 'Error al eliminar el estudiante' });
  }
});

module.exports = router;
