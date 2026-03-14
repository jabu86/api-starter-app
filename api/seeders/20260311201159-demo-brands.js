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
    await queryInterface.bulkInsert('brands', [{
        name: 'Addids',
        slug: 'addids',
        image:'/brands/addids.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
    },{
        name: 'Converse All Star',
        slug: 'converse-all-star',
        image:'/brands/allstare.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
    },{
        name: 'Samsung',
        image:'/brands/samsung.jpg',
        slug: 'samsung',
        createdAt: new Date(),
        updatedAt: new Date(),
    },{
        name: 'Apple',
        slug: 'apple',
        image:'/brands/apple.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
    },{
        name: 'Nike',
        slug: 'nike',
        image:'/brands/nike.jpg',
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
    await queryInterface.bulkDelete('brands', null, {});
  }
};
