var shell = require('shelljs');

module.exports={
    change_hour
}

function change_hour(req, res, next){
    let date = req.body.date;
    let hour = req.body.hour;
    console.log('date -s "'+date+' '+hour+'"');
    //shell.exec('date -s "'+date+' '+hour+'"')
    res.sendStatus(200);
    return;
}