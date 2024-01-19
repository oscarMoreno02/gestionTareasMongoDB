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
        },
        onDelete:'CASCADE'
        
      },
      id_user: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'users'
          },
          
          key: 'id'
        },
        onDelete:'CASCADE'
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('assigned_rols');
  }
};