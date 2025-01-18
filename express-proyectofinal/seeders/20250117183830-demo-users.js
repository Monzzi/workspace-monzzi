'use strict';
const bcrypt = require('bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS, 10) || 10;

    await queryInterface.bulkInsert('users', [
      {
        email: 'lali@mendi.com',
        password: await bcrypt.hash('adminpassword', saltRounds),
        type: 'admin',
        active: true,
      },
      {
        email: 'mapi@poligono.com',
        password: await bcrypt.hash('userpassword', saltRounds),
        type: 'user',
        active: true,
      },
      {
        email: 'pigro@gresso.it',
        password: await bcrypt.hash('inactivepassword', saltRounds),
        type: 'user',
        active: false,
      },
    ]);
  },

  async down (queryInterface, Sequelize) {
   await queryInterface.bulkDelete('users', null, {});
  },
};
