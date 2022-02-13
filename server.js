const express = require("express");
const server = require('express')();
const { handleCustomErrors, handleServerErrors } = require('./errors/errors');
const apiRouter = require('./modelViewController/routes/api.js');

server.use(express.json());

server.use('/api', apiRouter);

server.use(handleCustomErrors);

server.use(handleServerErrors);

module.exports = server;
