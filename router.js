const express = require('express');
const AuthenticationController = require('./user/AuthenticationController');
const UserController = require('./user/UserController');

const router = express.Router();

AuthenticationController(router);
UserController(router);


module.exports = router;