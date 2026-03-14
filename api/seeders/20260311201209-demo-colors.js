'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

      await queryInterface.bulkInsert('colors', [{
          name: 'red',
          slug: 'red',
          createdAt: new Date(),
          updatedAt: new Date()

      },{
          name: 'green',
          slug: 'green',
          createdAt: new Date(),
          updatedAt: new Date(),
      },{
          name: 'blue',
          slug: 'blue',
          createdAt: new Date(),
          updatedAt: new Date()

      },{
          name: 'purple',
          slug: 'purple',
          createdAt: new Date(),
          updatedAt: new Date()
      },{
          name: 'silver',
          slug: 'silver',
          createdAt: new Date(),
          updatedAt: new Date()
      }], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('colors', null, {});
  }
};
