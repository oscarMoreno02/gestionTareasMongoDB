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
      this.belongsTo(models.User, {
        foreignKey: 'id_user',
        as: 'user'
      });
      this.belongsTo(models.Rol, {
        foreignKey: 'id_rol',
        as: 'rol'
      });
    }
  }
  AssignedRol.init({
    id_rol: DataTypes.INTEGER,
    id_user: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'AssignedRol',
    tableName: 'assigned_rols',
    timestamps: false
  });

  return AssignedRol;
};