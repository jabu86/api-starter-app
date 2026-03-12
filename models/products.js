'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    const createSlug = (text) => {
        return text
            .toLowerCase()
            .replace(/[^\w\s]/g, "")
            .trim()
            .split(/\s+/)
            .join("-");
    };
  class Products extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Products.init({
    name: DataTypes.STRING,
    category_id: DataTypes.INTEGER,
    brand_id: DataTypes.INTEGER,
    slug: DataTypes.STRING,
    description: DataTypes.TEXT,
    price: DataTypes.STRING,
    active: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Products',
      hooks:{
          beforeCreate: (product) => {
              product.slug = createSlug(product.name);
          },
          beforeUpdate: (product) => {
              if (product.changed("name")) {
                  product.slug = createSlug(product.name);
              }
          }
      }
  });
  return Products;
};