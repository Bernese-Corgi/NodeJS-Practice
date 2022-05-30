const { Router } = require('express');
const apiDocs = require('./apiDocs');
const allPlaylist = require('./AllPlaylist');

const api = Router();

api.use('/apiDocs', apiDocs);
api.use('/allPlaylist', allPlaylist);

module.exports = api;
