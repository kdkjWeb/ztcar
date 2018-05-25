
$("#btn1").on("click",function(){
    window.location.href="apply.html"
})


$('#newCar').click(function(){
		$('#oldCar').removeClass('icon-danxuan').addClass('icon-danxuan2');
		$(this).removeClass('icon-danxuan2').addClass('icon-danxuan');
})

$('#oldCar').click(function(){
		$('#newCar').removeClass('icon-danxuan').addClass('icon-danxuan2');
		$(this).removeClass('icon-danxuan2').addClass('icon-danxuan');
})

$('.iconBox').click(function(){
	if($(this).attr('box') != 'true'){
		$(this).removeClass('icon-danxuan2').addClass('icon-danxuan');
		$(this).attr('box','true')
	}else{
		$(this).removeClass('icon-danxuan').addClass('icon-danxuan2');
		$(this).attr('box','false')
	}
})


$('.iconBox').each(function(){
		if($(this).attr('box') == 'true'){
//			$(this).
		}
})


//========================


$(function(){

	var data={};
	$.ajax({
		url: path + "/smDealers/list",
		data:JSON.stringify(data),
		dataType: "json",
		contentType:"application/json",
		type: "post",
		success: function(data) {
			if(data.code ==0){
				var arr =[];
				$.each(data.data,function(index,data,array){
   					var a = {title: data.dealerName,value:data.id}
			　　　arr.push(a);
			　})
				$("#distributor").select({
					  title: "选择经销商",
					  items:arr,
					  onClose:function(){
//							console.log($('#distributor').attr('data-values'))
							query($('#distributor').attr('data-values'))
					  }
					});

			}else{
					errAlert('提醒', '请求超时');
			}
		},
		error: function(xhr, type, errorThrown) {
			//异常处理；
			console.log(xhr);
			console.log(type);
		}
	});
	
	
})

function query(id){   //根据经销商ID查询产品信息
	
	var data={id:id};
	$.ajax({
		url: path + "/product/queryProductBydealersId",
		data:JSON.stringify(data),
		dataType: "json",
		contentType:"application/json",
		type: "post",
		success: function(data) {
			if(data.code ==0){
						console.log(data)
						

			}else{
					errAlert('提醒', '请求超时');
			}
		},
		error: function(xhr, type, errorThrown) {
			//异常处理；
			console.log(xhr);
			console.log(type);
		}
		})
	
	
}
