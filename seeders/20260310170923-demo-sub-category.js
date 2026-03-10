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
     *
    */

      await queryInterface.bulkInsert('sub_categories', [{
          name: 'Clothing',
          category_id: 1,
          createdAt: new Date(),
          updatedAt: new Date()
      },{
          name: 'Shoes',
          category_id: 1,
          createdAt: new Date(),
          updatedAt: new Date()
      },{
          name: 'Accessories',
          category_id: 1,
          createdAt: new Date(),
          updatedAt: new Date()
      },{
          name: 'Clothing',
          category_id: 2,
          createdAt: new Date(),
          updatedAt: new Date()
      }, {
          name: 'Shoes',
          category_id: 2,
          createdAt: new Date(),
          updatedAt: new Date()
      },{
          name: 'Accessories',
          category_id: 2,
          createdAt: new Date(),
          updatedAt: new Date()
      },{
          name: 'Computer',
          category_id: 3,
          createdAt: new Date(),
          updatedAt: new Date()

      },{
          name: 'Phone',
          category_id: 3,
          createdAt: new Date(),
          updatedAt: new Date()
      },{
          name: 'Tablet',
          category_id: 3,
          createdAt: new Date(),
          updatedAt: new Date()
      },{
          name: 'Gifts for Men',
          category_id: 4,
          createdAt: new Date(),
          updatedAt: new Date()
      },{
          name: 'Gifts for Women',
          category_id: 4,
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
    await queryInterface.bulkDelete('sub_categories', null, {});
  }
};
