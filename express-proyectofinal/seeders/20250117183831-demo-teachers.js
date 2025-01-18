'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('teachers', [
      {
        dni: '12345678A',
        name: 'Forrest',
        last_name: 'Gump',
        date_of_birth: '1980-01-15',
        user_id: 4, // Relación con el primer usuario
      },
      {
        dni: '87654321B',
        name: 'Jenny',
        last_name: 'Gump',
        date_of_birth: '1985-06-20',
        user_id: 5, // Relación con el segundo usuario
      },
    ]);
  },

  async down (queryInterface, Sequelize) {
   await queryInterface.bulkDelete('teachers', null, {});
  },
};
