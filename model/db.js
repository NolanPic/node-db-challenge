const db = require('../data/db-config');

module.exports = {
    addProject,
    getProjects,
    addTask,
    getTasksByProjectId,
    addResource,
    getResources,
    addResourceToProject
};

function addProject(project) {
    return db('projects').insert(project);
}

function getProjects() {
    return db('projects').select('*');
}

function addTask(project_id, task) {
    const newTask = { ...task, project_id };
    return db('tasks').insert(newTask);
}

function getTasksByProjectId(project_id) {
    return db('tasks as t')
        .where({ project_id })
        .join('projects as p', 't.project_id', 'p.id')
        .select('t.*', 'p.name', 'p.description');
};

function addResource(resource) {
    return db('resources').insert(resource);
}

function getResources() {
    return db('resources').select('*');
}

// HELPERS

function addResourceToProject(task_id, project_id) {
    return db('project_resources').insert({ project_id, task_id });
}
