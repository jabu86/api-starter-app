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
  class Brand extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Brand.init({
    name: DataTypes.STRING,
    slug: DataTypes.STRING,
    image: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Brand',
      hooks:{
          beforeCreate: (category) => {
              category.slug = createSlug(category.name);
          },
          beforeUpdate: (category) => {
              if (category.changed("name")) {
                  category.slug = createSlug(category.name);
              }
          }
      }
  });
  return Brand;
};