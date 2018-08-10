$(function() {
	//	=================历史返回直接回到菜单页
	window.onpageshow = function(event) {　　
		if(event.persisted) {　　　　
			window.location.href = 'distributorMenu.html';
		}
	};
	
	var listJson = {};
	var importId = GetRequest().applyId;

	getList();

	$("#sure").on("click", function() {
		listJson.enNumber = $('#Engine').val(); //发动机
		listJson.viNumber = $('#Frame').val(); //车架
		if(!$('#Engine').val()){
			errLay('请填写发动机号');
			return false;
		}
		if(!$('#Frame').val()){
			errLay('请填写车架号');
			return false;
		}
		if($('#Frame').val().length != 17){
			errLay('请填写完整车架号');
			return false;
		}
		
		saveList();
	})

	function getList() { //回显
		var data = {
			id: importId
		}
		$.ajax({
			url: path + "/apply/getBorrowerCarInfo?time=" + new Date().getTime(),
			data: JSON.stringify(data),
			dataType: "json",
			contentType: "application/json",
			type: "post",
			xhrFields: {
				withCredentials: true
			},
			beforeSend: function() {
				showLoading(); //显示loading	
			},
			success: function(data) {
				hideLoading(); //隐藏load	
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
						
						if(listJson.carBrand){
							$('#carBrand').text(listJson.carBrand); //车品牌
						}
						
						if(listJson.carSer){
							$('#carSer').text(listJson.carSer); //车系
						}
						
						
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
			beforeSend: function() {
				showLoading(); //显示loading	
			},
			success: function(data) {
				hideLoading(); //隐藏load	
				if(data.code == 0) {
					window.location.href = "myOrder.html";	
				} else {
					errLay(data.msg);
				}
			},
			error: function(request, textStatus, errorThrown) {
				hideLoading(); //隐藏load	
				errLay(request.responseJSON.msg);
			}
		});
	}

})