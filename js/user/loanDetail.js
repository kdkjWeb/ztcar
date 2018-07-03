$(function() {

	var appId = GetRequest().applyId;
	
	getList();
	
	function getList() {
		$.ajax({
			url: path + "/smBorrower/getSmFinancingByApplyId",
			data: {
				applyId:appId
			},
			dataType: "json",
			contentType: "application/json",
			type: "get",
			success: function(data) {
				if(data.code == 0 || data.code == 200) {
					var listJson = data.data;
					
					if(listJson.orderNum){   //订单号
						$('#orderNum').text(listJson.orderNum);  
					}
					
					
					
				} else {
					errLay('请求失败')
				}
			}
		});
	}

})