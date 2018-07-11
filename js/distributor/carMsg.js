$(function() {
	var listJson = {};
	var importId = GetRequest().applyId;

	getList();

	$("#sure").on("click", function() {
		listJson.enNumber = $('#Engine').val(); //发动机
		listJson.viNumber = $('#Frame').val(); //车架
		if(!$('#Engine').val()){
			errLay('请填写发动机号')
		}
		if(!$('#Frame').val()){
			errLay('请填写车架号')
		}
		saveList();
	})

	function getList() { //回显
		let data = {
			id: importId
		}
		$.ajax({
			url: path + "/apply/getBorrowerCarInfo",
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
						if(listJson.borrowerName) {
							$('#userName').text(listJson.borrowerName); //用户名
						}
						if(listJson.borrowerPhone) {
							$('#userPhone').text(listJson.borrowerPhone); //电话号码
						}
						if(listJson.borrowerCardNo) {
							$('#userId').text(listJson.borrowerCardNo); //身份证号
						}
						if(listJson.carModel) {
							$('#carModel').text(listJson.carModel); //车型
						}
						if(listJson.enNumber) {
							$('#Engine').val(listJson.enNumber); //发动机
						}
						if(listJson.viNumber) {
							$('#Frame').val(listJson.viNumber); //车架
						}
					}
				} else {
					errLay(data.msg);
				}
			}
		});
	}

	function saveList() { //提交
		$.ajax({
			url: path + "/apply/updateFinancingCar",
			data: JSON.stringify(listJson),
			dataType: "json",
			contentType: "application/json",
			type: "post",
			xhrFields: {
				withCredentials: true
			},
			success: function(data) {
				if(data.code == 0) {
					window.location.href = "myOrder.html";	
				} else {
					errLay(data.msg);
				}
			}
		});
	}

})