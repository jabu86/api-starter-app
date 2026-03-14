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
  class Category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
        Category.hasMany(models.SubCategory, {
            foreignKey: "category_id",
            as: 'subCategory',
        })

    }
  }
  Category.init({
    name: DataTypes.STRING,
    slug: {type: DataTypes.STRING, unique: true },
    description: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Category',
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
  return Category;
};