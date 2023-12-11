'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Insert sample data into the "products" table
    await queryInterface.bulkInsert('products', [
      { product_id: '11', name: 'Sample Product 1', price: 19.99, size: 'Medium'},
      { product_id: '12', name: 'Sample Product 2', price: 29.99, size: 'Large' },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    // Remove the inserted data if needed
    await queryInterface.bulkDelete('products', null, {});
  }
};