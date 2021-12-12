'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('recipes', [{
        name: 'Pork & Lychee Salad',
        story: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum',
        difficulty: 'intermediate',
        cooktime: '1 hour',
        preptime: '20 minutes',
        ingredients: '2 cans Lychees in syrup, 1 lb loose Pork Sausage (the saltier the better), 1 Red Onion, 1 bunch Cilantro, 1 bunch Thai Basil, 1 bunch Mint, 32oz Coconut Milk, 3 Pickled Habaneros, 1 cup Pickle brine from Habaneros, 3 tbs Salt, 1.5 cups Sugar, 1/2 cup Fried Garlic Chips (store-bought is fine)',
        method: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum',
        isRestaurant: 'true',
        restaurantName: 'Rose\'s Luxury',
        userId: '1',
        createdAt: new Date(),
        updatedAt: new Date()
      }], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('recipes', null, {});
  }
};