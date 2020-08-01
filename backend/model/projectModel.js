const mongoose = require('mongoose');

const Project = mongoose.model('Project', {
    title: String,
    description: {
        type: String,
        required: false
    },
    tasks: [{
        _id: mongoose.Types.ObjectId,
        title: {
            type: String,
            required: true
        },
        description: String,
        category: String, 
        column: String,
        created: Date,
        modified: Date,
        backlogged: {
            type: Boolean,
            required: true,
        }
    }],
    columns: [String],
    categories: [{
        title: String,
        color: String,
        backlogged: Boolean
    }]
}, 'projects');

const findAllProjects = () => {
    return Project.find();
}

const findProjectById = (id) => {
    return Project.findById(id);
}

const updateProjectInformation = (id, projectChanges) => {
    /*
        Project Changes contains the keys that have been modified,
        and their new respective values.
        ie if Name changes, then name will be a key, but if tasks do
        not change, there will not be a tasks key in the map of 
        key value pairs.
    */
    let tasks = projectChanges.tasks.map(task => {
        let newTask = {};
        newTask['_id'] = task._id ? task._id : mongoose.Types.ObjectId();
        newTask['title'] = task.title;
        newTask['description'] = task.description;
        newTask['category'] = task.category;
        newTask['column'] = task.column;
        newTask['created'] = task.created ? task.created : new Date();
        newTask['modified'] = new Date();
        newTask['backlogged'] = task.backlogged;
        return newTask;
    })
    projectChanges.tasks = tasks;

    let currentProject = Project.findByIdAndUpdate({_id: id}, 
    {
        title: projectChanges.title,
        tasks: projectChanges.tasks,
        columns: projectChanges.columns,
        categories: projectChanges.categories
    });
    /*Object.keys(projectChanges).forEach((key, index) => {
        currentProject.key = projectChanges.key; 
    })*/
    return currentProject;

}
const createNewProject = (project) => {
    let newProject = new Project({
        title: project.title,
        description: project.description,
        tasks: project.tasks,
        columns: project.columns,
        category: project.category
    });
    return newProject.save();
}
module.exports = {
    Project,
    findAllProjects,
    findProjectById,
    createNewProject,
    updateProjectInformation,
}