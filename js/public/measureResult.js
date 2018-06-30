$(function(){
	var money = GetRequest().money;
	
    $(".comeBack").on("click",function(){
        window.location.href="begin.html"
    })
    
    $('#social').text(keepTwo(money)+'万元');
   
    $('#loan').text(keepTwo(accDiv(money,2))+'万元');
    
    
    getCar()
    function getCar(){
    	var carMoney = keepTwo(money) + '万';
    	$.ajax({
			url: path + "/smdrive/getDriveByMoneny",
			data: {
				moneny:carMoney
			},
			dataType: "json",
			contentType: "application/json",
			type: "get",
			xhrFields: {
				withCredentials: true
			},
			success: function(data) {
				if(data.code == 0) {
					
					if(data.data){
						$('#modle').text(data.data.brandName + data.data.carSeries + data.data.model)
					}else{
						$('#modle').text('此价格未查询到相关车辆信息')
					}
					
				} else {
					errLay('请求出错');
				}
			}
		});
    }

})