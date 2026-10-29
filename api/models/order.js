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
    shipping_address: DataTypes.STRING,
    shipping_address_2: DataTypes.STRING,
    shipping_city: DataTypes.STRING,
    shipping_province: DataTypes.STRING,
    shipping_postal_code: DataTypes.STRING,
    shipping_country: DataTypes.STRING,
    payment_method:DataTypes.STRING,
    tax_price:DataTypes.STRING,
    shipping_price:DataTypes.STRING,
    is_paid:DataTypes.BOOLEAN,
    paid_at:DataTypes.DATE,
    is_delivered:DataTypes.BOOLEAN,
    delivered_at:DataTypes.DATE,
  }, {
    sequelize,
    modelName: 'Order',
    tableName: 'Orders', // 🔑 FORCES Sequelize to query lowercase "users" in Postgres
    freezeTableName: true, // 💡 Stops Sequelize from auto-pluralizing or messing with case
  });
  return Order;
};