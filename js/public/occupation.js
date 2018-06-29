$(function(){
    $(".occupation li").on("click",function(){
		var money =	$(this).attr('money');
		var type = $(this).attr('type');
		window.location.href="income.html?money="+money+'&type='+type;
    })

    
})