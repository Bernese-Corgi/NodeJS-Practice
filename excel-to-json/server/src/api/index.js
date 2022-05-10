const { Router } = require('express');
const apiDocs = require('./apiDocs');

const api = Router();

api.use('/apiDocs', apiDocs);

module.exports = api;
