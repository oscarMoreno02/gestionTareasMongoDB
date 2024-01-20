'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Task extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.User, {
        foreignKey: 'assignment',
        as: 'user'
      });
    }
  }
  Task.init({
    description: DataTypes.STRING,
    difficulty: DataTypes.STRING,
    assignment: DataTypes.INTEGER,
    time_estimated: DataTypes.INTEGER,
    time_dedicated: DataTypes.INTEGER,
    progress: DataTypes.INTEGER,
    done: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Task',
    tableName: 'tasks'
  });
  return Task;
};