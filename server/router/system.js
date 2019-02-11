'use strict'

let router = require('express').Router();
let SystemCtrl = require('../controllers/system');

router.post('/change_time', SystemCtrl.change_hour);
router.post('/test', SystemCtrl.system_test);

module.exports = router;