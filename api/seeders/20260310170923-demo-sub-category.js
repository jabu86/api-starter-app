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
     *
    */

      await queryInterface.bulkInsert('subcategories', [{
          name: 'Clothing',
          slug: 'clothing',
          category_id: 1,
          description: "Regular clothing for any event.",
          createdAt: new Date(),
          updatedAt: new Date()
      },{
          name: 'Shoes',
          slug: 'shoes',
          category_id: 1,
          description: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution",
          createdAt: new Date(),
          updatedAt: new Date()
      },{
          name: 'Accessories',
          slug: 'accessories',
          description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
          category_id: 1,
          createdAt: new Date(),
          updatedAt: new Date()
      },{
          name: 'Clothing',
          slug: 'clothing',
          description: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution",
          category_id: 2,
          createdAt: new Date(),
          updatedAt: new Date()
      }, {
          name: 'Shoes',
          slug: 'shoes',
          category_id: 2,
          description: "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC",
          createdAt: new Date(),
          updatedAt: new Date()
      },{
          name: 'Accessories',
          slug: 'accessories',
          category_id: 2,
          description: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable.",
          createdAt: new Date(),
          updatedAt: new Date()
      },{
          name: 'Computer',
          slug: 'computer',
          category_id: 3,
          description: "The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from \"de Finibus Bonorum et Malorum\" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.",
          createdAt: new Date(),
          updatedAt: new Date()

      },{
          name: 'Phone',
          slug: 'phone',
          category_id: 3,
          description: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable.",
          createdAt: new Date(),
          updatedAt: new Date()
      },{
          name: 'Tablet',
          slug: 'tablet',
          category_id: 3,
          description: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable.",
          createdAt: new Date(),
          updatedAt: new Date()
      },{
          name: 'Gifts for Men',
          slug: 'gifts-for-men',
          category_id: 4,
          description: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable.",
          createdAt: new Date(),
          updatedAt: new Date()
      },{
          name: 'Gifts for Women',
          slug: 'gifts-for-women',
          description: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable.",
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
    await queryInterface.bulkDelete('subcategories', null, {});
  }
};
