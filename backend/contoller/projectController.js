const ProjectModel = require('../model/projectModel');
const { Project } = require('../model/projectModel');

const findAll = (req, res, next) => {
    
    console.log('Pull all projects');
    ProjectModel.findAllProjects().then(projects => {
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
    ProjectModel.findProjectById(id).then(project => {
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
    let newProject = req.body.project;
    ProjectModel.createNewProject(newProject).then((project) => {
        if(project){
            console.log('Returned Object: \n', project);
            res.status(200).json({
                message: 'Created Successfully',
                project: project
            })
        } else {
            res.status(500).json({
                message: 'Project Creation Unsucessful'
            })
        }
    });
}

const createNewTask = (req, res, next) => {
    let projectId = req.params.projectId;
    let task = req.body.task;
    console.log(task);
    ProjectModel.addNewTaskToProject(projectId, task)
    .then((project) => {
        if(project) {
            res.status(200).json({
                message: 'Task Created',
                project: project
            })
        } else {
            res.status(500).json({
                message: 'Task Not Created'
            })
        }
    })


}

const deleteExistingTask = (req, res, next) => {
    let projectId = req.params.projectId;
    let taskId = req.params.taskId;
    ProjectModel.deleteTaskFromProject(projectId, taskId).then((project) => {
        if(project) {
            res.status(200).json({
                message: 'Task Deleted Successfully',
                project: project
            })
        } else {
            res.status(500).json({
                message: 'Unable to Delete Task'
            });
        }
    });
}

module.exports ={
    findAll,
    findById,
    postUpdatedProject,
    postNewProject,
    createNewTask,
    deleteExistingTask
}
