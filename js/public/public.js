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
		var fund = $(this).attr('fund');
		getFund(fund);
		var moneyNew = accMul(money,parseFloat(coefficient));	
		window.location.href="housing.html?money=" + moneyNew;
	})
	
	$(document).on("click", ".comeBack", function() {
		window.history.go(-1);
	})
	
	let arr = [{
			public: "有公积金",fund:'one'
		},
		{
			public: "无公积金",fund:'two'
		}
	]
	for(let i = 0; i < arr.length; i++) {
		$("ul").append('<li fund="'+arr[i].fund+'">' +
			'<i class="iconfont icon-zufang"></i>' +
			'<p>'+arr[i].public+'</p>' +
			'</li>')
	}
	
	
	function getFund(fund){
		if(fund == 'one'){
			coefficient = 1.25;
		}else{
			coefficient = 1;
		}
	}
	
	
	
	
	
	
})