'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class AssignedRol extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  AssignedRol.init({
    id_rol: DataTypes.INTEGER,
    id_user: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'AssignedRol',
    tableName: 'assigned_rol',
    timestamps: false
  });

  return AssignedRol;
};