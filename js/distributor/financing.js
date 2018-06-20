$(function(){
	
	getCar();  //获取车辆品牌 
	
	
    $("#audi").select({
        title:"请选择车系",
        items:["宝马1系","宝马2系"]
    })
    $("#type").select({
        title:"请选择车型",
        items:["小型","中型","大型"]
    })
    $("#month").select({
        title:"请选择还款期限",
        items:["12期","24期","36期","48期"]
    })
    $("#payment").on("blur",function(){

    })
    $(".weui-btn").on("click",function(){
        window.location.href="basicMsg.html"
    })
    
    

    //====================获取汽车品牌=============
	function getCar() {
		$.ajax({
			url: path + "/ztBrand/list",
			dataType: "json",
			contentType: "application/json",
			type: "post",
			xhrFields: {
				withCredentials: true
			},
			success: function(data) {
				if(data.code == 0) {
					var arr = [];
					for(var i = 0; i < data.list.length; i++) {
						let car = {
							title: data.list[i].name,
							value: data.list[i].id
						};
						arr.push(car);
					}
					$("#Vehicle").select({
						title: "现有车辆品牌",
						items: arr
					})
				}
			},
			error: function(xhr, type, errorThrown) {
				//异常处理；
				console.log(xhr);
				console.log(type);
			}
		});
	}

    
    
})
