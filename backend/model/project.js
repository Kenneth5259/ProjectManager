const mongoose = require('mongoose');

const Project = mongoose.model('Project', {
    name: String,
    tasks: [{
        title: String,
        description: String,
        color: String,
        status: String,
        dateCreated: Date,
        lastUpdated: Date
    }], //contains an array of object ids
    columns: [String]
});

const getAllProjectIds = () => {
    return Project.find({}, {_id: 1});
}

const postNewProject = (project) => {
    const newProject = new Project({
        name: project.name,
        task: [],
        columns: project.columns
    })
    return newProject.save();
}

module.exports ={
    Project,
    getAllProjectIds,
    postNewProject,
}


