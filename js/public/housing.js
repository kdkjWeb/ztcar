$(function(){
	var money = GetRequest().money;
	var coefficient; //系数

	get(); //获取参数

	function get() {
		$('#money').text(keepTwo(money) + '万')
		var left = accDiv(money, 150) * 100;
		$('#start').css('left', left + '%');
	}
	
	
    $(document).on("click","li",function(){
		var home = $(this).attr('home')
		getHome(home);
		var moneyNew = accMul(money,parseFloat(coefficient));	
		window.location.href="measureResult.html?money=" + moneyNew;

    })
    
    $(document).on("click",".comeBack",function() {
        window.history.go(-1);
    })
    
    let arr=[
        {housing:"自有全款",home:'one'},
        {housing:"自有贷款",home:'two'},
        {housing:"租房",home:'three'}
    ]
    for(let i = 0;i<arr.length; i++) {
        $("ul").append('<li home="'+arr[i].home+'">'+
            '<i class="iconfont icon-fangzi"></i>'+
            '<p>'+arr[i].housing+'</p>'+
    '</li>')
    }
    
    function getHome(home){
    	if(home == 'one'){
    		coefficient = 1.3;
    	}else if(home == 'two'){
    		coefficient = 1.1;
    	}else{
    		coefficient = 0.75;
    	}
    }
    
    
    
    
})