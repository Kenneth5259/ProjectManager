const express = require('express');

const ProjectController = require('../contoller/projectController');

const router = express.Router();

router.get('/:id', ProjectController.findById);
router.get('/', ProjectController.findAll);

router.post('/create/', ProjectController.postNewProject);
router.post('/update/:id', ProjectController.postUpdatedProject);
router.post('/:projectId/create/task/', ProjectController.createNewTask);
router.post('/:projectId/delete/task/:taskId', ProjectController.deleteExistingTask);



module.exports = router;