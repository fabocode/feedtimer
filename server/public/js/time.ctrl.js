$( document ).ready(function() {
    timer_function();
});

function get_time(){
    $.ajax({
        method:"GET",
        url:"/time"
    }).done(function(data){
        document.getElementById("real_time").innerHTML="";
        document.getElementById("real_time").innerHTML=data;
        tt = timer_function();
    })
}

function timer_function(){
    var refresh=1000; // Refresh rate in milli seconds
    mytime = setTimeout('get_time();',refresh)
}