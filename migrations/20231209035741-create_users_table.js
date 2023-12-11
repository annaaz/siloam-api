'use strict';

/** @type {import('sequelize-cli').Migration} */

  module.exports = {
    up: async (queryInterface, Sequelize) => {
      await queryInterface.createTable('users', {
        user_id: {
          type: Sequelize.STRING,
          allowNull: false,
          primaryKey: true,
          unique: true,
        },
        email: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: true,
        },
        name: {
          type: Sequelize.STRING,
          defaultValue: '',
        },
        password: {
          type: Sequelize.STRING,
          defaultValue: '',
        },
        role: {
          type: Sequelize.STRING,
          defaultValue: 'regular',
        },
        createdAt: {
          type: Sequelize.DATE,
          allowNull: false,
        },
        updatedAt: {
          type: Sequelize.DATE,
          allowNull: false,
        },
      });
    },

    down: async (queryInterface, Sequelize) => {
      await queryInterface.dropTable('users');
    },
};
