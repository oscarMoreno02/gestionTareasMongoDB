'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('tasks', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      description: {
        type: Sequelize.STRING,
        allowNull: false
      },
      difficulty: {
        type: Sequelize.STRING,
        allowNull: false
      },
      time_estimated: {
        type: Sequelize.INTEGER
      },
      time_dedicated: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
        allowNull: false
      },
      progress: {
        type: Sequelize.INTEGER,
        defaultValue: false,
        allowNull: false
      },
      done: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false
      },
      assignment: {
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: {
            tableName: 'users'
          },
          key: 'id'
        },
        onDelete:'SET NULL',
        defaultValue: null,
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
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('tasks');
  }
};