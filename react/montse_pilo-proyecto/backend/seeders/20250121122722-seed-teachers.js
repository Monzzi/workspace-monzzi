'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // Insertar primeros datos en la tabla 'teachers'
    await queryInterface.bulkInsert('teachers', [
      {
        dni: '12345678A',
        name: 'John',
        last_name: 'Doe',
        date_of_birth: '1980-01-01',
        user_id: 1,
      },
      {
        dni: '87654321B',
        name: 'Jane',
        last_name: 'Smith',
        date_of_birth: '1990-05-15',
        user_id: 2,
      },
      {
        dni: '52438294B',
        name: 'Jacky',
        last_name: 'Brown',
        date_of_birth: '1980-06-15',
        user_id: 3,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    // Eliminar todos los registros insertados en 'teachers'
    await queryInterface.bulkDelete('teachers', null, {});
  },
};
