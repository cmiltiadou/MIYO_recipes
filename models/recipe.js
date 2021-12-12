'use strict';
const {
  Model, INTEGER
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class recipe extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.recipe.belongsTo(models.user)
      models.recipe.hasMany(models.comment)
    }
  };
  recipe.init({
    name: DataTypes.STRING,
    story: DataTypes.TEXT,
    difficulty: DataTypes.STRING,
    cooktime: DataTypes.TEXT,
    preptime: DataTypes.TEXT,
    ingredients: DataTypes.TEXT,
    method: DataTypes.TEXT,
    userId: DataTypes.INTEGER,
    isRestaurant: DataTypes.BOOLEAN,
    restaurantName: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'recipe',
  });
  return recipe;
};