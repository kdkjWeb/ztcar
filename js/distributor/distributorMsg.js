$(function() {
	var listJson = {};
	var importId = GetRequest().applyId;

	getList();

	$("#next").on("click", function() {
		let disName = $("#disName").val()
		let disPhone = $("#disPhone").val()
		if(isName(disName, "销售顾问") == false) {
			return false
		} else if(isPhone(disPhone, "销售顾问") == false) {
			return false
		} else {
			listJson.applyId = importId;
			listJson.salesConsultant = disName;
			listJson.consultantPhone = disPhone;
			postList();
			return true;
		}
	})

	function getList() {
		let data = {
			id: importId
		}
		$.ajax({
			url: path + "/apply/perfectDealers",
			data: JSON.stringify(data),
			dataType: "json",
			contentType: "application/json",
			type: "post",
			xhrFields: {
				withCredentials: true
			},
			success: function(data) {
				if(data.code == 0) {
					if(data.data) {
						listJson = data.data;

						$('#dealersName').text(listJson.dealersName); //经销商名称
						$('#businessChannels').text(listJson.businessChannels); //业务渠道：
						$('#agentName').text(listJson.agentName); //SP代理名称
						$('#channelManagerName').text(listJson.channelManagerName); //渠道经理

						if(listJson.salesConsultant) {
							$("#disName").val(listJson.salesConsultant); //销售顾问
						}

						if(listJson.consultantPhone) {
							$("#disPhone").val(listJson.consultantPhone) //联系电话
						}
					}

				} else {
					errLay(data.msg);
				}
			}
		});
	}

	function postList() {
		$.ajax({
			url: path + "/apply/updateSaleInfo",
			data: JSON.stringify(listJson),
			dataType: "json",
			contentType: "application/json",
			type: "post",
			xhrFields: {
				withCredentials: true
			},
			success: function(data) {
				if(data.code == 0) {
					window.location.href = "financing.html?applyId="+importId;
				} else {
					errLay(data.msg);
				}
			}
		});
	}
	
//	function showNode(){
//		if(){
//			
//		}
//	}
	
	
})