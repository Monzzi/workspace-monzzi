'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('students', [
      {
        dni: '11223344C',
        name: 'Alice',
        last_name: 'Brown',
        date_of_birth: '2005-04-10',
        teacher_id: 3, // Relación con el primer profesor
      },
      {
        dni: '55667788D',
        name: 'Bob',
        last_name: 'Green',
        date_of_birth: '2007-09-15',
        teacher_id: 4, // Relación con el segundo profesor
      },
    ]);
  },

  async down (queryInterface, Sequelize) {
   await queryInterface.bulkDelete('students', null, {});
  }
};
