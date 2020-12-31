'use strict'

//Cargar Modulos de node para crear el servidor
var express = require('express');
var bodyParser = require('body-parser');

//Ejecutar express(http
var app = express();

//Cargar ficheros rutas
var vessels_router = require('./routes/vessel');
var user_router = require('./routes/user');

//Cargas Middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());



app.use('/api', vessels_router);
app.use('/api', user_router);

module.exports = app;