const express = require('express');
const router = express.Router();
const { Student, Teacher } = require('../models'); // Importa los modelos
const { body, validationResult } = require('express-validator');

// Obtener todos los estudiantes
router.get('/', async (req, res) => {
  try {
    const students = await Student.findAll({ include: 'teacher' }); // Incluye la relación con `Teacher`
    res.json(students);
  } catch (error) {
    console.error('Error al obtener los estudiantes:', error);
    res.status(500).json({ error: 'Error al obtener los estudiantes' });
  }
});

// Obtener un estudiante por ID
router.get('/:id', async (req, res) => {
  try {
    const student = await Student.findByPk(req.params.id, { include: 'teacher' }); // Incluye la relación con `Teacher`
    if (!student) {
      return res.status(404).json({ error: 'Estudiante no encontrado' });
    }
    res.json(student);
  } catch (error) {
    console.error('Error al obtener el estudiante:', error);
    res.status(500).json({ error: 'Error al obtener el estudiante' });
  }
});

// Crear un nuevo estudiante
router.post(
  '/',
  [
    // Validaciones
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
      // Verificar si el profesor asociado existe
      const teacher = await Teacher.findByPk(teacher_id);
      if (!teacher) {
        return res.status(404).json({ error: 'Profesor asociado no encontrado' });
      }

      // Crear el nuevo estudiante
      const newStudent = await Student.create({ dni, name, last_name, date_of_birth, teacher_id });
      res.status(201).json(newStudent);
    } catch (error) {
      console.error('Error al crear el estudiante:', error);
      res.status(500).json({ error: 'Error al crear el estudiante' });
    }
  }
);

// Actualizar un estudiante por ID
router.put('/:id', async (req, res) => {
  try {
    const { dni, name, last_name, date_of_birth, teacher_id } = req.body;

    // Buscar el estudiante por su ID
    const student = await Student.findByPk(req.params.id);
    if (!student) {
      return res.status(404).json({ error: 'Estudiante no encontrado' });
    }

    // Si se envía un teacher_id, verificar que exista
    if (teacher_id) {
      const teacher = await Teacher.findByPk(teacher_id);
      if (!teacher) {
        return res.status(404).json({ error: 'Profesor asociado no encontrado' });
      }
    }

    // Actualizar los datos del estudiante
    await student.update({ dni, name, last_name, date_of_birth, teacher_id });
    res.json(student);
  } catch (error) {
    console.error('Error al actualizar el estudiante:', error);
    res.status(500).json({ error: 'Error al actualizar el estudiante' });
  }
});

// Eliminar un estudiante por ID
router.delete('/:id', async (req, res) => {
  try {
    const student = await Student.findByPk(req.params.id);

    if (!student) {
      return res.status(404).json({ error: 'Estudiante no encontrado' });
    }

    // Eliminar el estudiante
    await student.destroy();
    res.json({ message: 'Estudiante eliminado correctamente' });
  } catch (error) {
    console.error('Error al eliminar el estudiante:', error);
    res.status(500).json({ error: 'Error al eliminar el estudiante' });
  }
});

module.exports = router;
