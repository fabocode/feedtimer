var shell = require('shelljs');

module.exports={
    change_hour
}

function change_hour(req, res, next){
    let date = req.body.day;
    let hour = req.body.hour;
    console.log('date -s "'+date+' '+hour+'"');
    shell.exec('sudo date -s "'+date+' '+hour+'"')
    res.sendStatus(200);
    return;
}