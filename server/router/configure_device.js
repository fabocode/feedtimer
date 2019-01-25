'use strict'

let DeviceCtrl = require('../controllers/device');
let router = require('express').Router();

router.patch('/set_status', DeviceCtrl.set_cycle_status);
router.patch('/set_duration', DeviceCtrl.set_cycle_duration);
router.get('/config', DeviceCtrl.get_config);
router.post('/new_cycle', DeviceCtrl.new_cycle);

module.exports = router;