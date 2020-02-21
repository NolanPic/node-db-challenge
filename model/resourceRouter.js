const express = require('express');
const model = require('./db');

const router = express.Router();

/**
 * POST api/resources
 */
router.post('/', (req, res) => {
    const resource = req.body;
    if(!resource.name) {
        res.status(400).json({ error: "Resource name is required" });
    }
    else {
        model.addResource(resource)
            .then(created => {
                res.status(201).json(created);
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({ error: "Something went wrong creating this resource" });
            })
    }
});

/**
 * GET api/resources
 */
router.get('/', (req, res) => {
    model.getResources()
        .then(resources => {
            res.status(200).json(resources);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: "Something went wrong getting resources" });
        });
});

module.exports = router;
