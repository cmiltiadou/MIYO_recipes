'use strict';
const {
  Model
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
    }
  };
  recipe.init({
    name: DataTypes.STRING,
    difficulty: DataTypes.STRING,
    ingredients: DataTypes.TEXT,
    method: DataTypes.TEXT,
    userId: DataTypes.INTEGER,
    collectionId: DataTypes.INTEGER,
    storyId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'recipe',
  });
  return recipe;
};