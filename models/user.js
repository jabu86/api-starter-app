'use strict';
const {
  Model
} = require('sequelize');
const bcrypt = require("bcrypt");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
        User.belongsToMany(models.Role, {
            through: models.User_Role,
            foreignKey: "user_id",
            otherKey: "role_id"
        });
    }
  }
  User.init({
    name: DataTypes.STRING,
    email: {type: DataTypes.STRING, allowNull: false, unique: true ,validate: {isEmail: true}},
    password: {type:DataTypes.STRING, allowNull: false},
    resetToken: {type: DataTypes.STRING},
    resetTokenExpire: {type: DataTypes.DATE},
  }, {
    sequelize,
    modelName: 'User',
  });

  User.beforeCreate( async (user) => {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(user.password, salt);
  });
  return User;
};