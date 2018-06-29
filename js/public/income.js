$(function() {
	var money = GetRequest().money;
	var type = GetRequest().type;  //职业
	var income;   ///收入
	var coefficient;  //系数
	
	get();  //获取参数

	function get() {
		$('#money').text(money + '万')
		var left = accDiv(money, 150) * 100;
		$('#start').css('left', left + '%');
	}

	$(document).on("click", "li", function() {
		income = $(this).attr('income');
		getCoefficient(income);	
		moneyNew = accMul(money,parseFloat(coefficient));	
		window.location.href = "honor.html?money="+moneyNew;
	})

	$(document).on("click", ".comeBack", function() {
		window.history.go(-1);
	})
	let arr = [{
			price: "20000以上",
			income: 'one'
		},
		{
			price: "12000-20000",
			income: 'two'
		},
		{
			price: "8000-12000",
			income: 'three'
		},
		{
			price: "5000-8000",
			income: 'four'
		},
		{
			price: "3000-5000",
			income: 'five'
		},
		{
			price: "3000以下",
			income: 'six'
		}
	]
	for(let i = 0; i < arr.length; i++) {
		$("ul").append('<li income="'+arr[i].income+'">'+
                '<i class="iconfont icon-qianbao"></i>'+
                '<p>'+arr[i].price+'</p>'+
        '</li>')
	}

	function getCoefficient(income){
		
		if(type == 'owner'){   ///企业
			if(income == 'one'){
				coefficient = 1;
			}
			if(income == 'two'){
				coefficient = 0.8;
			}
			if(income == 'three'){
				coefficient = 0.6;
			}
			if(income == 'four'){
				coefficient = 0.4;
			}
			if(income == 'five'){
				coefficient = 0.2;
			}
			if(income == 'six'){
				coefficient = 0.1;
			}
		}
		
		if(type == 'company'){   //事业单位
			if(income == 'one'){
				coefficient = 1.2;
			}
			if(income == 'two'){
				coefficient = 1;
			}
			if(income == 'three'){
				coefficient = 0.8;
			}
			if(income == 'four'){
				coefficient = 0.6;
			}
			if(income == 'five'){
				coefficient = 0.4;
			}
			if(income == 'six'){
				coefficient = 0.2;
			}
		}
				
		if(type == 'work'){   //上班族
			if(income == 'one'){
				coefficient = 1.4;
			}
			if(income == 'two'){
				coefficient = 1.2;
			}
			if(income == 'three'){
				coefficient = 1;
			}
			if(income == 'four'){
				coefficient = 0.8;
			}
			if(income == 'five'){
				coefficient = 0.6;
			}
			if(income == 'six'){
				coefficient = 0.4;
			}
		}
		
		if(type == 'personal'){   //个体户
			if(income == 'one'){
				coefficient = 1.6;
			}
			if(income == 'two'){
				coefficient = 1.4;
			}
			if(income == 'three'){
				coefficient = 1.2;
			}
			if(income == 'four'){
				coefficient = 1;
			}
			if(income == 'five'){
				coefficient = 0.8;
			}
			if(income == 'six'){
				coefficient = 0.6;
			}
		}
		
		if(type == 'unemployed'){   //无固定工作
			if(income == 'one'){
				coefficient = 2;
			}
			if(income == 'two'){
				coefficient = 1.8;
			}
			if(income == 'three'){
				coefficient = 1.6;
			}
			if(income == 'four'){
				coefficient = 1.4;
			}
			if(income == 'five'){
				coefficient = 1.2;
			}
			if(income == 'six'){
				coefficient = 1;
			}
		}
		
		
	}

})