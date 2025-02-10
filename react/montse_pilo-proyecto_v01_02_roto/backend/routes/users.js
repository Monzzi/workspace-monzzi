const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { User } = require('../models');

// GET: Obtener todos los usuarios
router.get('/', async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    console.log(`[ERROR] Error al obtener los usuarios: ${error.message}`);
    res.status(500).json({ error: 'Error al obtener los usuarios' });
  }
});

// GET: Obtener un usuario por su ID
router.get('/:id', async (req, res) => {
  try {
    const userInstance = await User.findByPk(req.params.id);
    if (!userInstance) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    res.json(userInstance);
  } catch (error) {
    console.log(`[ERROR] Error al obtener el usuario: ${error.message}`);
    res.status(500).json({ error: 'Error al obtener el usuario' });
  }
});

// GET: Obtener el estado activo de un usuario
router.get('/:id/active', async (req, res) => {
  try {
    const { id } = req.params;
    const userInstance = await User.findByPk(id, { attributes: ['active'] });
    if (!userInstance) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    res.json(userInstance);
  } catch (error) {
    console.log(`[ERROR] Error al obtener el estado del usuario: ${error.message}`);
    res.status(500).json({ error: 'Error al obtener el estado del usuario' });
  }
});

// POST: Crear un nuevo usuario
router.post('/', async (req, res) => {
  try {
    const { email, password, type, active } = req.body;

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: 'El correo electrónico ya está registrado' });
    }

    if (!email || !password) {
      return res.status(400).json({ error: 'El correo electrónico y la contraseña son obligatorios' });
    }

    const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS, 10) || 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = await User.create({ email, password: hashedPassword, type, active });
    res.status(201).json(newUser);
  } catch (error) {
    console.log(`[ERROR] Error al crear el usuario: ${error.message}`);
    res.status(500).json({ error: 'Error al crear el usuario' });
  }
});

// POST: Activar un usuario inactivo
router.post('/:id/active', async (req, res) => {
  try {
    const { id } = req.params;
    const userInstance = await User.findByPk(id);
    if (!userInstance) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    await userInstance.update({ active: true });
    res.json(userInstance);
  } catch (error) {
    console.log(`[ERROR] Error al activar el usuario: ${error.message}`);
    res.status(500).json({ error: 'Error al activar el usuario' });
  }
});

// PUT: Actualizar usuario
router.put('/:id', async (req, res) => {
  try {
    const { email, password, type, active } = req.body;
    const userInstance = await User.findByPk(req.params.id);
    if (!userInstance) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    const updatedFields = { email, type, active };

    if (password) {
      const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS, 10) || 10;
      updatedFields.password = await bcrypt.hash(password, saltRounds);
    }

    await userInstance.update(updatedFields);
    res.json(userInstance);
  } catch (error) {
    console.log(`[ERROR] Error al actualizar el usuario: ${error.message}`);
    res.status(500).json({ error: 'Error al actualizar el usuario' });
  }
});

// DELETE: Eliminar usuario
router.delete('/:id', async (req, res) => {
  try {
    const userInstance = await User.findByPk(req.params.id, { include: ['teacher'] });
    if (!userInstance) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    if (userInstance.teacher) {
      return res.status(400).json({ error: 'No se puede eliminar un usuario con un profesor asociado' });
    }

    await userInstance.destroy();
    res.json({ message: 'Usuario eliminado correctamente' });
  } catch (error) {
    console.log(`[ERROR] Error al eliminar el usuario: ${error.message}`);
    res.status(500).json({ error: 'Error al eliminar el usuario' });
  }
});

module.exports = router;
