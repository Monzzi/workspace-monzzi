'use strict';

const bcrypt = require('bcrypt');

module.exports = {
  async up(queryInterface, Sequelize) {
    // Crear contraseñas encriptadas
    const hashedPasswords = await Promise.all([
      bcrypt.hash('adminPass123', 10), // Contraseña para el admin
      bcrypt.hash('teacherPass456', 10), // Contraseña para el primer profesor
      bcrypt.hash('teacherPass789', 10), // Contraseña para el segundo profesor
    ]);

    // Insertar primeros datos en la tabla 'users'
    await queryInterface.bulkInsert('users', [
      {
        email: 'admin@example.com',
        password: hashedPasswords[0],
        type: 'admin',
        active: true,
      },
      {
        email: 'teacher1@example.com',
        password: hashedPasswords[1],
        type: 'user',
        active: true,
      },
      {
        email: 'teacher2@example.com',
        password: hashedPasswords[2],
        type: 'user',
        active: false,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    // Eliminar los registros insertados
    await queryInterface.bulkDelete('users', null, {});
  },
};
