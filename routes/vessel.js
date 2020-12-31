'use strict'

var express = require('express');
var VesselController = require('../controller/vessel');
var router = express.Router();
var md_auth = require('../middlewares/authenticate');

router.get('/get-vessels', md_auth.ensureAuth, VesselController.getVessels);
router.get('/get-vessel/:id', md_auth.ensureAuth, VesselController.getVessel);
router.get('/get-vessel-by-imo/:imo', md_auth.ensureAuth, VesselController.getVesselByImo);
router.post('/save-vessel', md_auth.ensureAuth, VesselController.save);
router.put('/update-vessel/:id', md_auth.ensureAuth, VesselController.update);
router.delete('/delete-vessel/:id', md_auth.ensureAuth, VesselController.delete);

module.exports = router;