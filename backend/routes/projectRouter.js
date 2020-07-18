const express = require('express');

const ProjectController = require('../contoller/projectController');

const router = express.Router();

router.get('/:id', ProjectController.findById);
router.get('/', ProjectController.findAll);

router.post('/create/', ProjectController.postNewProject);
router.post('/update/:id', ProjectController.postUpdatedProject)



module.exports = router;