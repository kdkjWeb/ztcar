$(function() {
	var importId = GetRequest().applyId;
	
	$.ajax({
		url: path + "/smAuditing/getFlowHistoryByApplyId?applyId="+importId,
		dataType: "json",
		contentType: "application/json",
		type: "get",
		processData: false, // 不处理数据
		contentType: false, // 不设置内容类型
		xhrFields: {
			withCredentials: true
		},
		beforeSend: function() {
			showLoading(); //显示loading	
		},
		success: function(data) {
			hideLoading(); //隐藏load	
			if(data.code == 0) {
				var listJson = data.data;
				var num = listJson.length+1;
				
				for(var i=0;i<listJson.length;i++){
					num--;
					var myHtml = '<div class="contList">'+
						'<div class="Opinion">节点'+num+': '+listJson[i].nodeName+'</div>'+
						'<div class="listOne">处理人: '+listJson[i].auditUser+'</div>'+
						'<div class="listOne">处理结果: '+listJson[i].auditResult+'</div>';
						
						if(listJson[i].auditTime){
							myHtml+='<div class="Opinion">处理时间: '+listJson[i].auditTime+'</div>';
						}else{
							myHtml+='<div class="Opinion">处理时间: 无</div>';
						}
						
						if(listJson[i].auditRemark){
							myHtml+='<div class="Opinion">处理意见: '+listJson[i].auditRemark+'</div>';
						}else{
							myHtml+='<div class="Opinion">处理意见: 无</div>';
						}
						
					myHtml+='</div>';			
					$('#content').append(myHtml);
				}
				
			} else {
				errLay(data.msg);
			}
		},
		error: function(request, textStatus, errorThrown) {
			hideLoading(); //隐藏load	
			errLay(request.responseJSON.msg);
		}
	});
	
})