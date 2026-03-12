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

      await queryInterface.bulkInsert('product_images', [{
          product_id: 1,
          image:'product/image.png',
          createdAt: new Date(),
          updatedAt: new Date(),
      },{
          product_id: 1,
          image:'product/image2.png',
          createdAt: new Date(),
          updatedAt: new Date(),
      },{
          product_id: 1,
          image:'product/image3.png',
          createdAt: new Date(),
          updatedAt: new Date(),
      },{
          product_id: 1,
          image:'product/image4.png',
          createdAt: new Date(),
          updatedAt: new Date(),
      },{
          product_id: 2,
          image:'product/image.png',
          createdAt: new Date(),
          updatedAt: new Date(),
      },{
          product_id: 2,
          image:'product/image1.png',
          createdAt: new Date(),
          updatedAt: new Date(),
      },{
          product_id: 2,
          image:'product/image2.png',
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
    await queryInterface.bulkDelete('product_images', null, {});
  }
};
