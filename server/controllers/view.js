'use strict'
let ejs = require('ejs');
let file = require('file-system');
let fs = require('fs');

module.exports = {
    dashboard,
    add_cycle,
    edit_cycle,
    change_system_hour
}

function change_system_hour(req, res, next){
    res.render('../views/change_system_hour.ejs');
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

function edit_cycle(req, res, next){
    let day = req.params.day;
    let cycle_ID = req.params.ID;
    let obj;
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
                    console.log(obj.days_of_week[i]);
                    for(let j = 0;j<obj.days_of_week[i].cycles.length;j++){
                        if(obj.days_of_week[i].cycles[j].ID == cycle_ID){
                            console.log(obj.days_of_week[i].cycles[j]);
                            let hour_format = obj.days_of_week[i].cycles[j].start.split(":");
                            console.log(hour_format)
                            res.render('../views/edit_cycle.ejs',{
                                day:obj.days_of_week[i].day,
                                hour:hour_format[0],
                                minutes:hour_format[1],
                                seconds:hour_format[2],
                                duration:obj.days_of_week[i].cycles[j].duration,
                                status:obj.days_of_week[i].cycles[j].status,
                                ID:obj.days_of_week[i].cycles[j].ID
                            });
                            break;
                        }
                    }
                }
            }
            return;
        }else{
            res.sendStatus(400)
            return;
        }
    });
}