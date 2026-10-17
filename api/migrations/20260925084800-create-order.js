'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Orders', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_id: {
        type: Sequelize.INTEGER
      },
      status: {
        type: Sequelize.STRING
      },
      total: {
        type: Sequelize.DECIMAL
      },
      // shipping_first_name: {
      //   type: Sequelize.STRING
      // },
      // shipping_last_name: {
      //   type: Sequelize.STRING
      // },
      shipping_address: {
        type: Sequelize.STRING
      },
      shipping_address_2: {
        type: Sequelize.STRING
      },
      shipping_city: {
        type: Sequelize.STRING
      },
      shipping_province: {
        type: Sequelize.STRING
      },
      shipping_postal_code: {
        type: Sequelize.STRING
      },
      shipping_country: {
        type: Sequelize.STRING
      },
      payment_method: {
        type: Sequelize.STRING
      },
      tax_price: {
        type: Sequelize.STRING
      },
      shipping_price: {
        type: Sequelize.STRING
      },
      is_paid: {
        type: Sequelize.BOOLEAN
      },
      is_delivered: {
        type: Sequelize.BOOLEAN
      },
      paid_at: {
        type: Sequelize.DATE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Orders');
  }
};