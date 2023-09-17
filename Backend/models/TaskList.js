const mongoose = require('mongoose');
// Voters or students models
const taskSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    voterName: {
        type: String,
        required: true
    },
    voterId: {
        type: String,
        // required: true,
    },
    electionName:{
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
