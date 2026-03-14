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

      await queryInterface.bulkInsert('product_colors', [{
          product_id: 1,
          color_id:1,
          createdAt: new Date(),
          updatedAt: new Date(),
      },{
          product_id: 1,
          color_id:2,
          createdAt: new Date(),
          updatedAt: new Date(),
      },{
          product_id: 1,
          color_id:3,
          createdAt: new Date(),
          updatedAt: new Date(),
      },{
          product_id: 2,
          color_id:1,
          createdAt: new Date(),
          updatedAt: new Date(),
      },{
          product_id: 2,
          color_id:4,
          createdAt: new Date(),
          updatedAt: new Date(),
      },{
          product_id: 2,
          color_id:5,
          createdAt: new Date(),
          updatedAt: new Date(),
      }], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('product_colors', null, {});
     */
    await queryInterface.bulkDelete('product_colors', null, {});
  }
};
