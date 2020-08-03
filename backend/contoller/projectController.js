const ProjectModel = require('../model/projectModel');

const creationCallback = (project, type, res) => {
    if(project) {
        res.status(200).json({
            project: project,
            message: `${type} Created Successfully`
        })
    } else {
        res.status(500).json({
            message: `${type} Not Created`
        })
    }
}

const findAll = (req, res, next) => {
    
    console.log('Pull all projects');
    ProjectModel.readAllProjects().then(projects => {
        console.log(projects);
        if(projects) {
            res.status(200).json({
                message: 'Projects Found',
                project: projects
            })
        } else {
            res.status(404).json({message: 'No Projects'});
        }
    });
};

const findById = (req, res, next) => {
    const id = req.params.id;
    ProjectModel.readProjectById(id).then(project => {
        if(project) {
            res.status(200).json({
                message: 'Successfull Pull',
                project: project
            })
        }
    });
}

const postUpdatedProject = (req, res, next) => {
    /* 
        res will have data from axios containing all updated fields in the project.
        The ID will be pulled from the url
    */
   const id = req.params.id;
   const changes = req.body.project;
   console.log(req.body.project);
   ProjectModel.updateProjectInformation(id, changes).then(project => { 
           if(project) {
               res.status(200).json({
                   message: 'Update Successful',
                   project: project
               })
           }
       });
}

const postNewProject = (req, res, next) => {
    let type = 'Project';
    let newProject = req.body.project;
    ProjectModel.createNewProject(newProject).then((project) => creationCallback(project, type, res));
}

const createNewTask = (req, res, next) => {
    let projectId = req.params.projectId;
    let task = req.body.task;
    let type = 'Task'
    ProjectModel.createNewTaskForProject(projectId, task).then((project) => creationCallback(project, type, res));
}

const createNewCategory = (req, res, next) => {
    let projectId = req.params.projectId;
    let category = req.body.category;
    let type = 'Category';
    ProjectModel.createNewCategoryForProject(projectId, category).then((project) => creationCallback(project, type, res));
}

const deleteExistingTask = (req, res, next) => {
    let projectId = req.params.projectId;
    let taskId = req.params.taskId;
    ProjectModel.deleteTaskFromProject(projectId, taskId).then((project) => {
        if(project) {
            res.status(200).json({
                message: 'Task Deleted Successfully',
                project: project
            });
        } else {
            res.status(500).json({
                message: 'Unable to Delete Task'
            });
        }
    });
}

const updateTaskColumn = (req, res, next) => {
    let projectId = req.params.projectId;
    let taskId = req.params.taskId;
    let column = req.body.column;
    ProjectModel.updateTaskColumn(projectId, taskId, column).then((project) =>  {
        if(project) {
            res.status(200).json({
                message: 'Task Updated Successfully',
                project: project
            });
        } else {
            res.status(500).json({
                message: 'Unable to Update Task'
            });
        }
    })
}

module.exports ={
    findAll,
    findById,
    postUpdatedProject,
    postNewProject,
    createNewTask,
    createNewCategory,
    deleteExistingTask,
    updateTaskColumn
}
