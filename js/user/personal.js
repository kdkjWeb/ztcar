$(function(){
	
	
	var phone = localStorage.getItem('userPhone');
	var name = localStorage.getItem('userName');
	
	if(phone != '' && phone != undefined){
		$('#userPhone').attr('placeholder',phone);
	}
	if(name != '' && name != undefined){
		$('#userName').val(name)
	}
	
	$(".changebox").on("click",function(){
	    window.location.href="change.html"
	})

	$("#drop").on("click",function(e){
		window.location.href="login.html"
	})



})