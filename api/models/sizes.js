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
      tableName: 'sizes', // 🔑 FORCES Sequelize to query lowercase "users" in Postgres
      freezeTableName: true, // 💡 Stops Sequelize from auto-pluralizing or messing with case
      hooks:{
          beforeCreate: (size) => {
              size.slug = createSlug(size.size);
          },
          beforeUpdate: (size) => {
              if (size.changed("size")) {
                  size.slug = createSlug(size.size);
              }
          }
      }
  });
  return Sizes;
};