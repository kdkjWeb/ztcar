$(function(){
	var money = GetRequest().money;
	
    $(".comeBack").on("click",function(){
        window.location.href="begin.html"
    })
    
    $('#social').text(keepTwo(money)+'万元');
    
    
     $('#loan').text(keepTwo(accDiv(money,2))+'万元');

})