'use strict';

const {DataTypes} = require("sequelize");
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
    await queryInterface.bulkInsert('products', [{
        name: 'Samsung Phone',
        slug: 'samsung-phone',
        brand_id: 3,
        category_id: 1,
        description: "This is a small phone number",
        price: '300',
        in_stock: false,
        active: true,
        quantity: 10,
        createdAt: new Date(),
        updatedAt: new Date(),

    },{
        name: 'Nike Sneakers',
        slug: 'nike-sneakers',
        brand_id: 5,
        category_id: 2,
        description: "This are nice shoes to have for running and other activties",
        price: '500',
        in_stock: true,
        quantity: 10,
        active: true,
        createdAt: new Date(),
        updatedAt: new Date(),
    }], {});
  },


  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     *
     */
    await queryInterface.bulkDelete('products', null, {});
  }
};
