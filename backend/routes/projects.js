const express = require('express');

const Project = require('../model/project');

const router = express.Router();

router.get('/', (req, res, next) => {
    console.log('Pull all project IDs');
    Project.find().then(projects => {
        if(projects) {
            
        } else {
            res.status(404).json({message: 'No Projects'})
        }
    });
});