const mongoose = require('mongoose');

const assignedRolSchema = new mongoose.Schema({
    id_user: { type: Number},
    id_rol: { type: Number}
}, { collection: 'assignedRols' , versionKey: false });

const AssignedRolModel = mongoose.model('AssignedRol', assignedRolSchema);

module.exports = AssignedRolModel;