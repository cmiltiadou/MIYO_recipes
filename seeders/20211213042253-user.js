'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('users', [{
        name: 'Rose\'s Luxury',
        email: 'roses@luxury.com',
        password: '2344hzzzRTX',
        location: 'Washington, DC',
        createdAt: new Date(),
        updatedAt: new Date()
      }], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('users', null, {});
  }
};