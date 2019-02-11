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
    var d = new Date(),
        month = '' + (d.getMonth() + 1),
        hours = d.getHours(),
        minutes = d.getMinutes(),
        seconds = d.getSeconds(),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    res.render('../views/change_system_hour.ejs',{
        day:day,
        month:month,
        year:year,
        hour:hours,
        minute:minutes,
        second:seconds
    });
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
            
                for(let i=0;i<obj.days_of_week.length;i++){
                        
                        for(let k=0;k<obj.days_of_week[i].cycles.length;k++){
                            let aux_hour = obj.days_of_week[i].cycles[k].start.split(":");
                            if(aux_hour[0] == 12){
                                obj.days_of_week[i].cycles[k].start = aux_hour[0] +":"+ aux_hour[1] +":"+ aux_hour[2] + " PM";
                            }else{
                                if(aux_hour[0] > 12){
                                    aux_hour[0] = parseInt(aux_hour[0]) - 12;
                                    obj.days_of_week[i].cycles[k].start = aux_hour[0] +":"+ aux_hour[1] +":"+ aux_hour[2] + " PM";
                                }else{
                                    if(aux_hour[0] == 0){
                                    aux_hour[0] = 12;
                                    obj.days_of_week[i].cycles[k].start = aux_hour[0] +":"+ aux_hour[1] +":"+ aux_hour[2] + " AM";
                                    }else{
                                    obj.days_of_week[i].cycles[k].start = obj.days_of_week[i].cycles[k].start + " AM";   
                                    }
                                }
                            }
                        }
                        
                        
                }
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
                            console.log("finished");
                            return;
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