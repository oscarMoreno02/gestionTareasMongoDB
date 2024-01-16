'use strict';
const{assignedRolFactory}=require('../factories/assignedRolFactory')
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const rols = await assignedRolFactory(1);
    await queryInterface.bulkInsert('assigned_rols', rols, {});
  },

  async down (queryInterface, Sequelize) {
   
     await queryInterface.bulkDelete('assigned_rols', null, {});
     
  }
};
