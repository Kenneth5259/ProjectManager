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
    let tasks = [];
    let categories = [];
    let columns = [];
    console.log(projectChanges.tasks);
    for(const [index, task] of Object.entries(projectChanges.tasks)) {
        console.log(`Index ${index} task inserted`);
        task['_id'] = task._id ? task._id : mongoose.Types.ObjectId();
        tasks.push(task);
    }
    for(const [index, category] of Object.entries(projectChanges.categories)) {
        console.log(`Index ${index} category inserted`);
        categories.push(category);
    }
    for(const [index, column] of Object.entries(projectChanges.columns)) {
        console.log(`Index ${index} column inserted`);
        columns.push(column);
    }
    /*let tasks = projectChanges.tasks ? projectChanges.tasks.products.map(task => {
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
    }) : [];
    projectChanges.tasks = tasks;*/

    let currentProject = Project.findByIdAndUpdate({_id: id}, 
    {
        title: projectChanges.title,
        tasks: tasks,
        columns: columns,
        categories: categories
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