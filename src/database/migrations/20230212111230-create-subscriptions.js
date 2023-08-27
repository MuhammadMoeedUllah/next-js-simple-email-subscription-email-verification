'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.createTable('subscriptions', {
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        unique: true,
        primaryKey: true,
      },

      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },

      active: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },

      frequency: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },

      emailVerified: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },

      country: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      createdAt: {
        field: 'createdAt',
        type: Sequelize.DATE,
      },

      updatedAt: {
        field: 'updatedAt',
        type: Sequelize.DATE,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.dropTable('subscriptions');
  },
};
