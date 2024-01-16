'use strict';
const {taskFactory} = require('../factories/taskFactory')
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const tasks = await taskFactory(3);
    await queryInterface.bulkInsert('tasks', tasks, {});
  },

  async down (queryInterface, Sequelize) {
  
     await queryInterface.bulkDelete('tasks', null, {});
     
  }
};
