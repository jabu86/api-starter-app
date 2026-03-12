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
  class Sizes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Sizes.init({
    size: DataTypes.STRING,
    slug: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Sizes',
      hooks:{
          beforeCreate: (size) => {
              size.slug = createSlug(size.name);
          },
          beforeUpdate: (size) => {
              if (size.changed("name")) {
                  size.slug = createSlug(size.name);
              }
          }
      }
  });
  return Sizes;
};