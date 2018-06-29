$(function() {
	var money = GetRequest().money;
	var coefficient; //系数

	get(); //获取参数

	function get() {
		$('#money').text(keepTwo(money) + '万')
		var left = accDiv(money, 150) * 100;
		$('#start').css('left', left + '%');
	}

	$(document).on("click", "li", function() {
		var security = $(this).attr('security')
		getSecurity(security);
		var moneyNew = accMul(money,parseFloat(coefficient));	
		window.location.href="public.html?money=" + moneyNew;
	})
	
	
	
	$(document).on("click", ".comeBack", function() {
		window.history.go(-1);
	})
	let arr = [{
			social: "本地社保",
			security: 'one'
		},
		{
			social: "非本地社保",
			security: 'two'
		}
	]
	for(let i = 0; i < arr.length; i++) {
		$("ul").append('<li security="'+arr[i].security+'">' +
			'<i class="iconfont icon-bao3"></i>' +
			'<p>'+arr[i].social+'</p>' +
			'</li>')
	}
	
	function getSecurity(security){
		if(money > 5){
			if(security == 'one'){
				coefficient = 1.1;
			}else{
				coefficient = 0.75;
			}
		}else{
			if(security == 'one'){
				coefficient = 0.7;
			}else{
				coefficient = 1.1;
			}
		}
	}


})