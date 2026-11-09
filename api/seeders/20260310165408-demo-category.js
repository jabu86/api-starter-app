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
          slug: 'male',
          description: 'Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text.',
          createdAt: new Date(),
          updatedAt: new Date()
      },{
          name: 'Female',
          slug: 'female',
          description: "ontrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC",
          createdAt: new Date(),
          updatedAt: new Date()
      },{
          name: 'Electronics',
          slug: 'electronics',
          description: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.",
          createdAt: new Date(),
          updatedAt: new Date()
      },{
          name: 'Gifts',
          slug: 'gifts',
          description: 'The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those.',
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
