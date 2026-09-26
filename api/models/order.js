'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Order.belongsTo(models.User, {
        foreignKey : "user_id",
        as: "user"
      });

      Order.hasMany(models.OrderItem, {
        foreignKey : "order_id",
        as: "item"
      });
    }
  }
  Order.init({
    user_id: DataTypes.INTEGER,
    status: DataTypes.STRING,
    total: DataTypes.DECIMAL,
    shipping_first_name: DataTypes.STRING,
    shipping_last_name: DataTypes.STRING,
    shipping_address: DataTypes.STRING,
    shipping_address_2: DataTypes.STRING,
    shipping_city: DataTypes.STRING,
    shipping_province: DataTypes.STRING,
    shipping_postal_code: DataTypes.STRING,
    shipping_country: DataTypes.STRING,
    payment_status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};