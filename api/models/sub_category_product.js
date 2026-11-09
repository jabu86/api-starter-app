'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class sub_category_product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  sub_category_product.init({
    product_id: DataTypes.INTEGER,
    category_id: DataTypes.INTEGER,
    sub_category_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'sub_category_product',
    tableName: 'sub_category_products', // 🔑 FORCES Sequelize to query lowercase "users" in Postgres
    freezeTableName: true, // 💡 Stops Sequelize from auto-pluralizing or messing with case
  });
  return sub_category_product;
};