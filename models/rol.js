'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Rol extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.AssignedRol, {
        foreignKey: 'id_rol',
        as: 'assigned_rols'
      });
    }
  }
  Rol.init({
    description: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Rol',
    tableName: 'rols'
  });
  return Rol;
};