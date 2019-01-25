'use strict'

let router = require('express').Router();
let ViewCtrl = require('../controllers/view');

router.get('/', ViewCtrl.dashboard);
router.get('/add/cycle', ViewCtrl.add_cycle);
router.get('/cycle/:day/:ID', ViewCtrl.new_cycle);

module.exports = router;