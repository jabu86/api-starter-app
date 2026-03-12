'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class product_colors extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  product_colors.init({
    product_id: DataTypes.INTEGER,
    color_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'product_colors',
  });
  return product_colors;
};