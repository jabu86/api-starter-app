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
    await queryInterface.bulkInsert('profiles', [{
        user_id: '1',
        bio: "John Doe bio must go here",
        image: "/images/profile.png",
        createdAt: new Date(),
        updatedAt: new Date()
    },{
        user_id: '2',
        bio: "Mary Smith's bio must go here",
        image: "/images/profile.png",
        createdAt: new Date(),
        updatedAt: new Date()
    },{
        user_id: '3',
        bio: "Admin User's bio must go here",
        image: "/images/profile.png",
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
    await queryInterface.bulkDelete('profiles', null, {});
  }
};
