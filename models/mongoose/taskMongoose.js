const mongoose = require('mongoose');


const taskSchema = new mongoose.Schema({
    id: { type: Number},
    description: { type: String },
    difficulty: { type: String },
    time_estimated: { type: Number },
    time_dedicated: { type: Number },
    progress: { type: Number },
    done: { type: Boolean },
    assignment: { type: Number },
}, { collection: 'tasks' , versionKey: false });

const TaskModel = mongoose.model('Task', taskSchema);

module.exports = TaskModel;