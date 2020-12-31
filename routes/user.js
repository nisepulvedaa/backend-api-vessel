'use strict'

var express = require('express');
var UserController = require('../controller/user');
var router = express.Router();


router.post('/user-register', UserController.save);
router.post('/user-login', UserController.login);

module.exports = router;