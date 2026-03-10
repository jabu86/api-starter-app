const bcrypt = require('bcrypt');
'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

      await queryInterface.bulkInsert('users', [
          {
              name: 'John Doe',
              email: 'john@egmail.com',
              password: await bcrypt.hash('password', 10),
              createdAt: new Date(),
              updatedAt: new Date()
          },
          {
              name: 'Jane Smith',
              email: 'jane@gmail.com',
              password: await bcrypt.hash('password', 10),
              createdAt: new Date(),
              updatedAt: new Date()
          },
          {
              name: 'Admin User',
              email: 'admin@gmail.com',
              password: await bcrypt.hash('password', 10),
              createdAt: new Date(),
              updatedAt: new Date()
          }
      ], {});
  },

  async down (queryInterface, Sequelize) {

    await queryInterface.bulkDelete('users', null, {});
  }
};
