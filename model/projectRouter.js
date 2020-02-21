const express = require('express');
const model = require('./db');

const router = express.Router();

/**
 * POST api/projects
 */
router.post('/', (req, res) => {
    const project = req.body;
    if(!project.name) {
        res.status(400).json({ error: "Project name is required" });
    }
    else {
        model.addProject(project)
            .then(created => {
                res.status(201).json(created);
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({ error: "Something went wrong creating this project" });
            });
    }
});

/**
 * GET api/projects
 */
router.get('/', (req, res) => {
    model.getProjects()
        .then(projects => {
            res.status(200).json(projects);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: "Something went wrong getting projects" });
        });
});

/**
 * POST api/projects/:id/tasks
 */
router.post('/:id/tasks', (req, res) => {
    const { id: project_id } = req.params;
    const task = req.body;
    if(!task.description) {
        res.status(400).json({ error: "Task description is required" });
    }
    else {
        model.addTask(project_id, req.body)
            .then(created => {
                res.status(201).json(created);
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({ error: "Something went wrong creating this task" });
            });
    }
});

/**
 * GET api/projects/:id/tasks
 */
router.get('/:id/tasks', (req, res) => {
    const { id: project_id } = req.params;
    model.getTasksByProjectId(project_id)
        .then(tasks => {
            res.status(200).json(tasks);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: "Something went wrong getting these tasks" });
        });
});


module.exports = router;
