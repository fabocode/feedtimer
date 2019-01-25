'use strict'

module.exports = {
    get_time
}

function get_time(req, res, next){
    
    res.send(String(Date()));
}