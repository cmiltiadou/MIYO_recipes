'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('recipes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      story: {
        type: Sequelize.TEXT
      },
      difficulty: {
        type: Sequelize.STRING
      },
      cooktime: {
        type: Sequelize.TEXT
      },
      preptime: {
        type: Sequelize.TEXT
      },
      ingredients: {
        type: Sequelize.TEXT
      },
      method: {
        type: Sequelize.TEXT
      },
      isRestaurant: {
        type: Sequelize.BOOLEAN
      },
      restaurantName: {
        type: Sequelize.STRING
      },
      userId: {
        type: Sequelize.INTEGER
      },
      commentId: {
        type: Sequelize.INTEGER
      },
      collectionId: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('recipes');
  }
};