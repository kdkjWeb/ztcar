$(function(){
	var money = GetRequest().money;
	var coefficient;  //系数
	
	get();  //获取参数

	function get() {
		$('#money').text(money + '万')
		var left = accDiv(money, 150) * 100;
		$('#start').css('left', left + '%');
	}
    
    $(document).on("click","li",function(){
		var credit = $(this).attr('credit');
		getCredit(credit);
		var moneyNew = accMul(money,parseFloat(coefficient));	
		window.location.href="social.html?money=" + moneyNew;
		
    })
    
    
    $(document).on("click",".comeBack",function() {
//      window.location.href = "income.html"
		window.history.go(-1);
    })

    let arr=[
        {honor:"信用良好",credit:'one'},
        {honor:"少数逾期",credit:'two'},
        {honor:"长期多次逾期",credit:'three'},
        {honor:"无信用记录",credit:'four'},
    ]
    
    for(let i = 0;i<arr.length; i++) {
        $("ul").append('<li credit="'+arr[i].credit+'">'+
            '<i class="iconfont icon-iconset0292"></i>'+
            '<p>'+arr[i].honor+'</p>'+
    '</li>')
    }

    
    function getCredit(credit){
    	if(credit == 'one'){
    		coefficient = 1.11;
    	}
    	if(credit == 'two'){
    		coefficient = 0.9;
    	}
    	if(credit == 'three'){
    		coefficient = 0.45;
    	}
    	if(credit == 'four'){
    		coefficient = 0.88;
    	}
    }
    
    
})