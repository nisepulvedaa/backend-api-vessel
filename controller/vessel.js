'use strict'

var Vessel = require('../models/vessel');


var controller = {

    save: (req, res) => {

        var params = req.body;
        var vessel = new Vessel();

        vessel.name = params.name;
        vessel.imo = params.imo;
        vessel.mmsi = params.mmsi;
        vessel.type = params.type;
        vessel.flag = params.flag;
        vessel.grossTonage = params.grossTonage;
        vessel.deadWeight = params.deadWeight;
        vessel.builtYear = params.builtYear;
        vessel.length = params.length;
        vessel.beam = params.beam;
        vessel.draft = params.draft;
        vessel.oldNames = params.oldNames;
        vessel.image = params.image;



        vessel.save((err, vesselStored) => {

            if (err || !vesselStored) {
                res.status(500).send({
                    status: 'error',
                    message: 'Ocurrio un error La nave no se ha podido guardar',
                    vessel: []
                });
            } else {

                res.status(200).send({
                    status: 'success',
                    message: 'Working ok',
                    vessel: vesselStored
                });
            }

        });

    },
    getVessels: (req, res) => {

        var query = Vessel.find({});

        query.exec((err, vesselData) => {
            if (err) {
                return res.status(500).send({
                    status: 'error',
                    message: 'Error al devolver las Naves',
                    result: []
                });

            }

            if (!vesselData || vesselData.length == 0) {
                return res.status(200).send({
                    status: 'OK',
                    message: 'No existen Naves para Mostrar',
                    result: []
                });
            }

            return res.status(200).send({
                status: 'success',
                message: 'Working ok',
                result: vesselData
            });

        });

    },
    getVessel: (req, res) => {
        var vesselId = req.params.id;

        if (!vesselId || vesselId == null) {
            return res.status(500).send({
                status: 'error',
                message: "Debe Ingresar un Id de Nave Valido",
                result: []
            });
        }

        var query = Vessel.findOne({ _id: vesselId });

        query.exec((err, vesselData) => {
            if (err) {
                return res.status(500).send({
                    status: 'error',
                    message: 'Error al devolver la Nave',
                    result: []
                });

            }

            if (!vesselData || vesselData.length == 0) {
                return res.status(200).send({
                    status: 'OK',
                    message: 'No existe Nave para Mostrar',
                    result: []
                });
            }

            return res.status(200).send({
                status: 'success',
                message: 'Working ok',
                result: vesselData
            });

        });

    },
    getVesselByImo: (req, res) => {
        var vesselImo = req.params.imo;

        if (!vesselImo || vesselImo == null) {
            return res.status(500).send({
                status: 'error',
                message: "Debe Ingresar un Id de Nave Valido",
                result: []
            });
        }

        var query = Vessel.findOne({ imo: vesselImo });
        query.exec((err, vesselData) => {

            if (err) {
                return res.status(500).send({
                    status: 'error',
                    message: 'Error al devolver la Nave',
                    result: []
                });

            }

            if (!vesselData || vesselData.length == 0) {
                return res.status(200).send({
                    status: 'OK',
                    message: 'No existe Nave para Mostrar',
                    result: []
                });
            }

            return res.status(200).send({
                status: 'success',
                message: 'Working ok',
                result: vesselData
            });

        });

    },
    update: (req, res) => {
        var vesselId = req.params.id;

        var params = req.body;

        Vessel.findOneAndUpdate({ _id: vesselId }, params, { new: true, }, (err, vesselUpdate) => {

            if (err || !vesselUpdate) {
                return res.status(500).send({
                    status: 'error',
                    message: "Error al Actualizar la nave revise su request"
                });
            }

            return res.status(200).send({
                status: 'success',
                message: "Working ok",
                result: vesselUpdate
            });

        });
    },
    delete: (req, res) => {
        var vesselId = req.params.id;

        Vessel.findByIdAndDelete({ _id: vesselId }, (err, vesselRemoved) => {
            if (err || !vesselRemoved) {
                return res.status(500).send({
                    status: 'error',
                    message: "Error al borrar la nave revise su request!",
                    result: []
                });
            }



            return res.status(200).send({
                status: 'success',
                message: "Working Ok",
                result: vesselRemoved
            });

        });
    },

}

module.exports = controller;