'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ShippingAddress extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ShippingAddress.belongsTo(models.User, {
        foreignKey: "user_id",
        as: "user"
      });
    }
  }
  ShippingAddress.init({
    user_id: DataTypes.INTEGER,
    // label: DataTypes.STRING,
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    address: DataTypes.STRING,
    address_2: DataTypes.STRING,
    city: DataTypes.STRING,
    province: DataTypes.STRING,
    postal_code: DataTypes.STRING,
    country: DataTypes.STRING,
    is_default: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'ShippingAddress',
  });
  return ShippingAddress;
};