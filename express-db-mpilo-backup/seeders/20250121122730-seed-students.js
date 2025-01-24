'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // Insertar datos en la tabla 'students'
    await queryInterface.bulkInsert('students', [
      {
        dni: '11223344C',
        name: 'Alice',
        last_name: 'Johnson',
        date_of_birth: '2005-07-20',
        teacher_id: 1, // Relacionado con el profesor con id 1
      },
      {
        dni: '55667788D',
        name: 'Bob',
        last_name: 'Brown',
        date_of_birth: '2006-03-12',
        teacher_id: 1, // Relacionado con el profesor con id 1
      },
      {
        dni: '99887766E',
        name: 'Charlie',
        last_name: 'White',
        date_of_birth: '2004-11-05',
        teacher_id: 2, // Relacionado con el profesor con id 2
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    // Eliminar todos los registros insertados en 'students'
    await queryInterface.bulkDelete('students', null, {});
  },
};
