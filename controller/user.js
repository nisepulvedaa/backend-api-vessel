'use strict'

var User = require('../models/user');
var jwt = require('../services/jwt');
var bcrypt = require('bcrypt-nodejs');

var controller = {
    save: (req, res) => {
        var params = req.body;
        var user = new User();

        user.email = params.email;
        user.role = params.role;

        bcrypt.hash(params.password, null, null, (err, hash) => {
            user.password = hash;
            //guardar el articulo,
            user.save((err, userStored) => {
                if (err || !userStored) {
                    return res.status(500).send({
                        status: 'error',
                        message: "Error al momento de guardar el usuario revise su request",
                        user: []
                    });
                } else {

                    res.status(200).send({
                        status: 'success',
                        message: 'working ok',
                        user: userStored
                    });

                }
            });

        });


    },
    login: (req, res) => {
        var params = req.body;

        var email = params.email;
        var password = params.password;

        User.findOne({ email: email }, (err, userData) => {
            if (err) {
                return res.status(500).send({
                    status: 'error',
                    message: 'Error en la petición'
                });
            }
            if (userData) {
                bcrypt.compare(password, userData.password, (err, check) => {

                    if (check) {
                        if (params.getToken) {
                            return res.status(200).send({
                                token: jwt.createToken(userData),
                                status: 'success'
                            });

                        } else {
                            //devolver datos del usuario
                            userData.password = undefined;
                            return res.status(200).send({
                                status: 'success',
                                userData
                            });
                        }

                    } else {

                        return res.status(500).send({
                            status: 'error',
                            message: 'El usuario no se ha podido identificar'
                        });

                    }

                });

            } else {
                return res.status(500).send({
                    status: 'error',
                    message: 'El usuario  no existe!!'
                });
            }
        });

    },
}

module.exports = controller;