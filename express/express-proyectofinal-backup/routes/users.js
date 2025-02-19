const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { User } = require('../models'); // Importamos el modelo user

router.get('/', async (req, res) => { // Ruta para obtener todos los usuarios
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    console.error('Error al obtener los usuarios:', error);
    res.status(500).json({ error: 'Error al obtener los usuarios' });
  }
});

router.get('/:id', async (req, res) => { // Ruta para obtener un usuario por su ID
  try {
    const userInstance = await User.findByPk(req.params.id);
    if (!userInstance) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    res.json(userInstance);
  } catch (error) {
    console.error('Error al obtener el usuario:', error);
    res.status(500).json({ error: 'Error al obtener el usuario' });
  }
});

// Punto 6 del proyecto. Crear endpoint GET /api/users/:id/active
router.get('/:id/active', async (req, res) => {
  try {
    const { id } = req.params;

    // Buscar al usuario por su ID
    const userInstance = await User.findByPk(id, {
      attributes: ['active'], // Solo queremos el campo active
    });

    if (!userInstance) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    // Devolver únicamente el estado active
    res.json(userInstance);
  } catch (error) {
    console.error('Error al obtener el estado del usuario:', error.message, error.stack);
    res.status(500).json({ error: 'Error al obtener el estado del usuario' });
  }
});


router.post('/', async (req, res) => { // Ruta para crear un nuevo usuario
  try {
    const { email, password, type, active } = req.body;

    // Verificar si el correo electrónico ya está registrado
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: 'El correo electrónico ya está registrado' });
    }

    // Validación básica
    if (!email || !password ) {
      return res.status(400).json({ error: 'El correo electrónico y la contraseña son obligatorios' });
    }

    // Encriptar la contraseña
    const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS, 10) || 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Crear nuevo usuario
    const newUser = await User.create({ email, password: hashedPassword, type, active });
    res.status(201).json(newUser);
  } catch (error) {
    console.error('Error al crear el usuario:', error);
    res.status(500).json({ error: 'Error al crear el usuario' });
  }
});

// Punto 6 del proyecto. Crear endpoint POST /api/users/:id/active

router.post('/:id/active', async (req, res) => {
  try {
    const { id } = req.params;
    // Buscar al usuario por su ID
    const userInstance = await User.findByPk(id);
    if (!userInstance) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    // Actualizar el campo "active" del usuario
    await userInstance.update({ active: true });

    res.json(userInstance);
  } catch (error) {
    console.error('Error al activar el usuario:', error);
    res.status(500).json({ error: 'Error al activar el usuario' });
  }
});


router.put('/:id', async (req, res) => { // Actualizar usuario
  try {
    const { email, password, type, active } = req.body;
    const userInstance = await User.findByPk(req.params.id); // Buscar el usuario por su ID
    if (!userInstance) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    // Crea un objeto para los campos que deseas actualizar
    const updatedFields = { email, type, active };

    if (password) {
      const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS, 10) || 10;
      updatedFields.password = await bcrypt.hash(password, saltRounds);
    }

    // Actualizar el usuario
    await userInstance.update(updatedFields);

    res.json(userInstance);
  } catch (error) {
    console.error('Error al actualizar el usuario:', error);
    res.status(500).json({ error: 'Error al actualizar el usuario' });
  }
});

router.delete('/:id', async (req, res) => { // Eliminar usuario
  try {
    console.log('Iniciando proceso de eliminación de usuario...');

    // Buscar el usuario por ID e incluir la relación con Teacher
    const userInstance = await User.findByPk(req.params.id, {
      include: ['teacher'], // Asegúrate de que este alias sea correcto
    });
    console.log('Usuario encontrado:', JSON.stringify(userInstance, null, 2));

    if (!userInstance) {
      console.log('Usuario no encontrado');
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    // Verificar si tiene un profesor asociado
    if (userInstance.teacher) {
      console.log('El usuario tiene un profesor asociado, no se puede eliminar');
      return res.status(400).json({ error: 'No se puede eliminar un usuario con un profesor asociado' });
    }


    await userInstance.destroy();
    res.json({ message: 'Usuario eliminado correctamente' });
  } catch (error) {
    console.error('Error al eliminar el usuario:', error.message, error.stack);
    res.status(500).json({ error: 'Error al eliminar el usuario' });

  }
});

module.exports = router;
