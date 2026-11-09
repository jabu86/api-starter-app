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

      await queryInterface.bulkInsert('sizes', [{
          size: 'XXL',
          slug: 'xxl',
          createdAt: new Date(),
          updatedAt: new Date(),
      },{
          size: 'XL',
          slug: 'xl',
          createdAt: new Date(),
          updatedAt: new Date(),
      },{
          size: 'L',
          slug: 'l',
          createdAt: new Date(),
          updatedAt: new Date(),
      },{
          size: 'XSS',
          slug: 'xss',
          createdAt: new Date(),
          updatedAt: new Date(),
      },{
          size: 'XS',
          slug: 'xs',
          createdAt: new Date(),
          updatedAt: new Date(),
      },{
          size: '10',
          slug: '10',
          createdAt: new Date(),
          updatedAt: new Date(),
      },{
          size: '9',
          slug: '9',
          createdAt: new Date(),
          updatedAt: new Date(),
      },{
          size: '8',
          slug: '8',
          createdAt: new Date(),
          updatedAt: new Date(),
      }], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('sizes', null, {});
  }
};
