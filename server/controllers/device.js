'use strict'

let file = require('file-system');
let fs = require('fs');
let ejs = require('ejs');

module.exports = {
    new_cycle,
    get_config,
    set_cycle_status,
    set_cycle_duration,
    delete_cycle,
    edit_cycle
}

function delete_cycle(req, res, next){
    let cycle_ID = req.body.cycle_ID;
    let day = req.body.day;
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
                            obj.days_of_week[i].cycles.splice(j,1);
                            
                            for(let k = 0;k<obj.days_of_week[i].cycles.length;k++){
                                
                                if(k != obj.days_of_week[i].cycles[j].ID){
                                    obj.days_of_week[i].cycles[j].ID = k;
                                    
                                }
                            }
                            console.log(obj.days_of_week[i].cycles[j]);
                            break;
                        }
                    }
                }
            }

            for(let i = 0;i<obj.days_of_week.length;i++){
                if(obj.days_of_week[i].day == day){
                    console.log(obj.days_of_week[i]);
                    for(let j = 0;j<obj.days_of_week[i].cycles.length;j++){
                        for(let k = 0;k<obj.days_of_week[i].cycles.length;k++){
                            
                            if(k != obj.days_of_week[i].cycles[j].ID){
                                obj.days_of_week[i].cycles[j].ID = k;
                                
                            }
                        }
                            console.log(obj.days_of_week[i].cycles[j]);
                            break;
                        }
                    }
            }
            
            save_config(obj);
            res.sendStatus(200);
            return;
        }else{
            res.sendStatus(400)
            return;
        }
    });
}

function set_cycle_status(req, res, next){
    let obj;
    let day = req.body.day;
    let cycle_ID = req.body.cycle_ID;
    let new_status = req.body.new_status;

    console.log(req.body);
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
                    for(let j = 0;j<obj.days_of_week[i].cycles.length;j++){
                        if(obj.days_of_week[i].cycles[j].ID == cycle_ID){
                            console.log(obj.days_of_week[i].cycles[j].status);
                            obj.days_of_week[i].cycles[j].status = JSON.parse(new_status);
                            console.log(obj.days_of_week[i].cycles[j].status);
                            save_config(obj);
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
                    for(let j = 0;j<obj.days_of_week[i].cycles.length;j++){
                        if(obj.days_of_week[i].cycles[j].ID == cycle_ID){
                            obj.days_of_week[i].cycles[j].duration = new_duration;
                            save_config(obj);
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

function edit_cycle(req, res, next){
    let obj;
    let day = req.body.day;
    let cycle_ID = req.body.cycle_ID;
    let new_duration = req.body.new_duration;
    let new_hour = req.body.new_hour;
    let new_status = req.body.new_status;
    if(new_status.includes("check")){
        new_status = true;
    }else{
        new_status = false;
    }
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
                    for(let j = 0;j<obj.days_of_week[i].cycles.length;j++){
                        if(obj.days_of_week[i].cycles[j].ID == cycle_ID){

                            obj.days_of_week[i].cycles[j].duration = new_duration;
                            obj.days_of_week[i].cycles[j].start = new_hour;
                            obj.days_of_week[i].cycles[j].status = JSON.parse(new_status);
                            save_config(obj);
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
    let is_activated = req.body.status;
    console.log(req.body);
    fs.readFile('device_config/device_config.json', 'utf8', function (err, data) {
        if (err){
            console.log(err);
            res.sendStatus(500);
            return;
        }
        if(data){
            obj = JSON.parse(data);
            
            if(is_activated.includes("check")){
                is_activated = true;
            }else{
                is_activated = false;
            }
            console.log(is_activated);
            for(let i = 0;i<obj.days_of_week.length;i++){
                for(let j = 0;j<obj.days_of_week.length;j++)
                if(obj.days_of_week[i].day == day[j]){
                    console.log("entered");
                    obj.days_of_week[i].cycles.push({
                                                    ID:obj.days_of_week[i].cycles.length,
                                                    start:hour,
                                                    duration:duration,
                                                    status:JSON.parse(is_activated),

                    })
                       
                }
            }
            save_config(obj);    
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
    JSON.stringify(new_config)
    fs.writeFileSync('device_config/device_config.json', JSON.stringify(new_config));
    console.log("saved");
    return;
}