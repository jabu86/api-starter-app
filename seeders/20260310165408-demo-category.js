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


      await queryInterface.bulkInsert('categories', [{
          name: 'Male',
          createdAt: new Date(),
          updatedAt: new Date()
      },{
          name: 'Female',
          createdAt: new Date(),
          updatedAt: new Date()
      },{
          name: 'Electronics',
          createdAt: new Date(),
          updatedAt: new Date()
      },{
          name: 'Gifts',
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
   await queryInterface.bulkDelete('categories', null, {});

  }
};
