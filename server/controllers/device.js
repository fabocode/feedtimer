'use strict'

let file = require('file-system');
let fs = require('fs');
let ejs = require('ejs');

module.exports = {
    new_cycle,
    get_config,
    set_cycle_status,
    set_cycle_duration
}

function set_cycle_status(req, res, next){
    let obj;
    let day = req.body.day;
    let cycle_ID = req.body.cycle_ID;
    let new_status = req.body.new_status;
    fs.readFile('device_config/device_config.json', 'utf8', function (err, data) {
        if (err){
            console.log(err);
            res.sendStatus(500);
            return;
        }
        if(data){
            obj = JSON.parse(data);
            
            for(let i = 0;i<obj.days_of_week.length;i++){
                if(obj.days_of_week[i].day == day){
                    for(let j = 0;j<obj.days_of_week[i].duration.length;j++){
                        if(obj.days_of_week[i].duration[j].ID == cycle_ID){
                            obj.days_of_week[i].duration[j].status = new_status;
                            save_config(JSON.stringify(obj));
                        }
                    }
                }
            }
            res.sendStatus(200);
            return;
        }else{
            res.sendStatus(400)
            return;
        }
    });
}

function set_cycle_duration(req, res, next){
    let obj;
    let day = req.body.day;
    let cycle_ID = req.body.cycle_ID;
    let new_duration = req.body.new_duration;
    fs.readFile('device_config/device_config.json', 'utf8', function (err, data) {
        if (err){
            console.log(err);
            res.sendStatus(500);
            return;
        }
        if(data){
            obj = JSON.parse(data);
            
            for(let i = 0;i<obj.days_of_week.length;i++){
                if(obj.days_of_week[i].day == day){
                    for(let j = 0;j<obj.days_of_week[i].duration.length;j++){
                        if(obj.days_of_week[i].duration[j].ID == cycle_ID){
                            obj.days_of_week[i].duration[j].duration = new_duration;
                            save_config(JSON.stringify(obj));
                        }
                    }
                }
            }
            res.sendStatus(200);
            return;
        }else{
            res.sendStatus(400)
            return;
        }
    });
}

function new_cycle(req, res, next){
    let obj;
    let day = req.body.day;
    let hour = req.body.hour;
    let duration = req.body.duration;
    let is_activated = req.body.status
    fs.readFile('device_config/device_config.json', 'utf8', function (err, data) {
        if (err){
            console.log(err);
            res.sendStatus(500);
            return;
        }
        if(data){
            obj = JSON.parse(data);
            

            for(let i = 0;i<obj.days_of_week.length;i++){
                if(obj.days_of_week[i].day == day){
                    obj.days_of_week[i].cycles.push({
                                                    ID:obj.days_of_week[i].cycles.length,
                                                    start:hour,
                                                    duration:duration,
                                                    status:is_activated,

                    })
                    save_config(obj);       
                }
            }
            res.sendStatus(200);
            return;
        }else{
            res.sendStatus(400)
            return;
        }
    });
}

function get_config(req, res, next){
    let obj;
    let days = req.query.days;
    let aux_obj = {
        days_of_week:[]
    }
    
    fs.readFile('device_config/device_config.json', 'utf8', function (err, data) {
        if (err){
            console.log(err);
            res.sendStatus(500);
            return;
        }

        obj = JSON.parse(data);
        if(typeof days !== 'undefined'){
            for(let i=0;i<obj.days_of_week.length;i++){
                for(let j=0;j<obj.days_of_week.length;j++){
                    if(obj.days_of_week[i].day == days[j]){
                        aux_obj.days_of_week.push(obj.days_of_week[i]);
                    }
                }
            }
            res.render('../views/partials/table.ejs',{config:aux_obj});
        }else{
            res.render('../views/partials/table.ejs',{config:obj});
        }
        
        return;
    });
}

function save_config(new_config){
    fs.writeFileSync('device_config/device_config.json', JSON.stringify(new_config));
    return;
}