const mongoose = require('mongoose');

const Task = mongoose.model('Task', {
    title: String,
    description: String,
    color: String
});

module.exports = {
    Task
}