'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var VesselSchema = Schema({
    name: String,
    imo: Number,
    mmsi: Number,
    type: String,
    flag: String,
    grossTonage: Number,
    deadWeight: Number,
    builtYear: Number,
    length: Number,
    beam: Number,
    draft: Number,
    oldNames: [{ name: String, lastReport: String, lastFlag: String }],
    image: String,
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('vessel', VesselSchema)