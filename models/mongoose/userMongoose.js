const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    id: { type: Number},
    first_name: { type: String },
    last_name: { type: String },
    email: { type: String },
    password: { type: String },
}, { collection: 'usuarios' , versionKey: false });

const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;