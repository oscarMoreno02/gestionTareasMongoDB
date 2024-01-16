'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('assigned_rols', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_rol: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'rols'
          },
          key: 'id'
        }
      },
      id_user: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'users'
          },
          key: 'id'
        }
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('assigned_rols');
  }
};