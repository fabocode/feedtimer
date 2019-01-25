'use strict'
let ejs = require('ejs');
let file = require('file-system');
let fs = require('fs');

module.exports = {
    dashboard,
    add_cycle,
    new_cycle
}

function dashboard(req, res, next){
    let obj;
    fs.readFile('device_config/device_config.json', 'utf8', function (err, data) {
        if (err){
            console.log(err);
            res.sendStatus(500);
            return;
        }
        if(data){
            obj = JSON.parse(data);
            console.log(obj)
            res.render('../views/index3.ejs',{config:obj});
            return;
        }else{
            res.sendStatus(400)
            return;
        }
    });
    
}

function add_cycle(req, res, next){
    res.render('../views/add_cycle.ejs');
}

function new_cycle(req, res, next){
    
}