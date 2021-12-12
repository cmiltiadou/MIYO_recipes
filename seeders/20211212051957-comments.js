'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('comment', [{
        content: "I can finally make this at home!",
        author: "Bob",
        recipeId: 1,
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      }], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('comment', null, {});
  }
};