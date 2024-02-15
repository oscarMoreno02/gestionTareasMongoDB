const mongoose = require('mongoose');

const rolSchema = new mongoose.Schema({
    id: { type: Number},
    description: { type: String }
}, { collection: 'rols' , versionKey: false });

const RolModel = mongoose.model('Rol', rolSchema);

module.exports = RolModel;