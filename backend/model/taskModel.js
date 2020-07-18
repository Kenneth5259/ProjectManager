const mongoose = require('mongoose');

const Task = mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    title: {
        type: String,
        required: true
    },
    description: String,
    category: String, 
    column: String
});

module.exports = {
    Task
}