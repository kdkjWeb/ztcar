$(".weui-btn").on("click",function(){
    let disName=$("#disName").val()
    let disPhone=$("#disPhone").val()
    if(isName(disName,"销售顾问")==false){
        errLay();
        return false
    }else if(isPhone(disPhone,"销售顾问")==false){
        errLay();
        return false
    }else{
    	
    	listJson.salesConsultant = disName;
    	listJson.consultantPhone = disPhone;
    	
        postList();
        return true
     }
})

var listJson ;

$(function(){
	getList()
	
})

function getList(){
	let data = {
		id:1
	}
	$.ajax({
		url: path + "/apply/perfectDealers",
		data: JSON.stringify(data),
		dataType: "json",
		contentType: "application/json",
		type: "post",
		xhrFields:{
		    withCredentials: true
		},
		success: function(data) {
			if(data.code == 0) {
				listJson = data.data;
				$('#dealersName').text(listJson.dealersName); //经销商名称
				$('#businessChannels').text(listJson.businessChannels);  //业务渠道：
				$('#agentName').text(listJson.agentName);  //SP代理名称
				$('#channelManagerName').text(listJson.channelManagerName);  //渠道经理
				
				if(listJson.salesConsultant != null){
					$("#disName").val(listJson.salesConsultant);  //销售顾问
				}
				
				if(listJson.consultantPhone!= null){
					$("#disPhone").val(listJson.consultantPhone)  //联系电话
				}
			
			}
		},
		error: function(xhr, type, errorThrown) {
			//异常处理；
			console.log(xhr);
			console.log(type);
			}
	});
}


function postList(){
	$.ajax({
		url: path + "/apply/updateSaleInfo",
		data: JSON.stringify(listJson),
		dataType: "json",
		contentType: "application/json",
		type: "post",
		xhrFields:{
		    withCredentials: true
		},
		success: function(data) {
			if(data.code == 0) {
				window.location.href="financing.html"
				console.log(data)
			}
		},
		error: function(xhr, type, errorThrown) {
			//异常处理；
			console.log(xhr);
			console.log(type);
			}
	});
}
