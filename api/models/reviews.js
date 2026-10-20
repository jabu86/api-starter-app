'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Reviews extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      Reviews.belongsTo(models.User, {
          foreignKey: "user_id",
          as: "user"
      });

      Reviews.belongsTo(models.Products, {
          foreignKey: "product_id",
          as: "products"
      });
    }
  }
  Reviews.init({
    user_id: DataTypes.INTEGER,
    product_id: DataTypes.INTEGER,
    ratings: DataTypes.STRING,
    review: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Reviews',
  });
  return Reviews;
};