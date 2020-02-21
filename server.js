const express = require('express');
const projectRouter = require('./model/projectRouter');
const resourceRouter = require('./model/resourceRouter');

const server = express();

server.use(express.json());

server.use('/api/projects', projectRouter);
server.use('/api/resources', resourceRouter);

module.exports = server;
