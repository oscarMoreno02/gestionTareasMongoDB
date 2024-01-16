'use strict';


const {userFactory} = require('../factories/userFactory')
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const users = await userFactory(2);
    await queryInterface.bulkInsert('users', users, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
  }
};
