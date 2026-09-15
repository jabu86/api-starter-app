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
      // define association 
      product_colors.belongsTo(models.Colors, {
          foreignKey: "color_id",
          as: "color"
      });

      product_colors.belongsTo(models.Products, {
          foreignKey: "product_id",
          as: "product"
      });
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