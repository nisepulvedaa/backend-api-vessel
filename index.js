'use strict'

var mongoose = require('mongoose');
var app = require('./app');
var port = 3900;

mongoose.set('useFindAndModify', false);
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/api_rest_vessel', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Conectado Correctamente a la base de datos");

        //Crea Servidor web que escucha peticiones http
        app.listen(port, () => {
            console.log("Servidor Corriendo en http://localhost:" + port);
        });
    });