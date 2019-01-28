$(document).ready(function(){
    $(".time_element").timepicki();
  });

  function change_status(){
    if(document.getElementById("cycle_status").getAttribute("status")){
        document.getElementById("cycle_status").setAttibute("status","false").setAttibute("class","zmdi zmdi-close zmdi-hc-3x").setAttibute("style","color:red")
    }else{
        document.getElementById("cycle_status").setAttibute("status","true").setAttibute("class","zmdi zmdi-check zmdi-hc-3x").setAttibute("style","color:green")
    }
    
}
