'use strict';
const{rolFactory}=require('../factories/rolFactory')
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const rols = await rolFactory(1);
    await queryInterface.bulkInsert('rols', rols, {});
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.bulkDelete('rols', null, {});
     
  }
};
